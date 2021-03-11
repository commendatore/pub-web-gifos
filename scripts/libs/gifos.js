class GifosCommons {
  constructor(hamburgerBttnId, hamburgerMenuId, themeBttnId) {
    // hamburger menu and theme switcher
    this.hamburgerBttn = document.getElementById(hamburgerBttnId);
    this.hamburgerMenu = document.getElementById(hamburgerMenuId);
    this.themeBttn = document.getElementById(themeBttnId);

    this.hamburgerBttn.addEventListener("click", this.toggleHamburger);
    this.themeBttn.addEventListener("click", this.toggleTheme);

    // theme environment
    this.iconsLight = document.getElementById("theme-light");
    this.iconsNight = document.getElementById("theme-night");
    this.currentTheme = localStorage.getItem("theme");
    if (this.isNightMode()) this.themeBttn.innerHTML = "Modo Diurno";
  }

  toggleHamburger = () => {
    let isClosed = this.hamburgerMenu.classList.contains("navbar-menu--close");

    if (isClosed) {
      this.hamburgerBttn.classList.replace(
        "navbar-buttons__hamburger-icon--open-menu",
        "navbar-buttons__hamburger-icon--close-menu"
      );
      this.hamburgerMenu.classList.replace(
        "navbar-menu--close",
        "navbar-menu--show"
      );
    } else {
      this.hamburgerBttn.classList.replace(
        "navbar-buttons__hamburger-icon--close-menu",
        "navbar-buttons__hamburger-icon--open-menu"
      );
      this.hamburgerMenu.classList.replace(
        "navbar-menu--show",
        "navbar-menu--close"
      );
    }
  };

  toggleTheme = () => {
    if (this.isNightMode()) {
      this.setLightMode();
      this.themeBttn.innerHTML = "Modo Nocturno";
    } else {
      this.setNightMode();
      this.themeBttn.innerHTML = "Modo Diurno";
    }
  };

  isNightMode = () => {
    // check current theme
    if (this.currentTheme) {
      if (this.currentTheme === "night") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  setNightMode = () => {
    // change theme css color variables
    document.documentElement.setAttribute("data-theme", "night");
    // change theme css assets
    this.iconsNight.media = "";
    this.iconsLight.media = "none";
    // save current theme preference
    localStorage.setItem("theme", "night");
    this.currentTheme = "night";
  };

  setLightMode = () => {
    // change theme css color variables
    document.documentElement.setAttribute("data-theme", "light");
    // change theme css assets
    this.iconsLight.media = "";
    this.iconsNight.media = "none";
    // save current theme preference
    localStorage.setItem("theme", "light");
    this.currentTheme = "light";
  };

  getPage = () => {
    return document.documentElement.dataset.page;
  };
}

class GifosSlides {
  constructor() {
    this.trendingSlider = undefined;
    this.backwardBttn = undefined;
    this.forwardBttn = undefined;
    this.apiTrending = undefined;
    this.trendingSliderLength = 0;
  }

  setSlider = async (
    carouselId,
    carouselClass,
    backwardBttnId,
    forwardBttnId,
    trendingGifsCallback
  ) => {
    this.trendingSlider = document.getElementById(carouselId);
    this.backwardBttn = document.getElementById(backwardBttnId);
    this.forwardBttn = document.getElementById(forwardBttnId);
    this.apiTrending = trendingGifsCallback;

    this.backwardBttn.addEventListener("click", this.backwardSlides);
    this.forwardBttn.addEventListener("click", this.forwardSlides);

    let giphyArr = await this.apiTrending({ rating: "r" });
    let gifosSlides = this.appendSlides(giphyArr, carouselClass);
    this.trendingSlider.innerHTML = gifosSlides.content;
    this.trendingSliderLength = gifosSlides.length;
  };

  appendSlides = (giphyArr, classType) => {
    let slides = [];
    let length = 0;

    giphyArr.forEach((giphy, i) => {
      let slide = `
<div class="${classType}">
<img src="${giphy.url}" alt="${giphy.title}">
</div>`;

      length = i + 1;
      slides.push(slide);
    });

    return {
      length: length,
      content: slides.join("\n"),
    };
  };

  forwardSlides = () => {
    let step = this.trendingSlider.scrollWidth / this.trendingSliderLength;
    this.trendingSlider.scrollLeft += step;
  };

  backwardSlides = () => {
    let step = this.trendingSlider.scrollWidth / this.trendingSliderLength;
    this.trendingSlider.scrollLeft -= step;
  };
}

class GifosSearch {
  constructor() {
    this.apiSearch = undefined;
    this.searchBox = undefined;
    this.suggestionsBox = undefined;
    this.submitBttn = undefined;
    this.clearBttn = undefined;
    this.apiSuggestions = undefined;
    this.results = undefined;
    this.resultsGrid = undefined;
    this.resultsSlideClass = undefined;
    this.trendingTerms = undefined;
    this.apiTrendingTerms = undefined;
  }

  setSearchBox = async (
    searchCallback,
    suggestionsCallback,
    searchBoxId,
    suggestionsBoxId,
    submitBttnId,
    clearBttnId,
    resultsId,
    resultsGridId,
    resultsSlideClass,
    trendingTermsCallback = undefined,
    trendingTermsBoxId = undefined
  ) => {
    this.apiSearch = searchCallback;
    this.searchBox = document.getElementById(searchBoxId);
    this.suggestionsBox = document.getElementById(suggestionsBoxId);
    this.submitBttn = document.getElementById(submitBttnId);
    this.clearBttn = document.getElementById(clearBttnId);
    this.apiSuggestions = suggestionsCallback;
    this.results = document.getElementById(resultsId);
    this.resultsGrid = document.getElementById(resultsGridId);
    this.resultsSlideClass = resultsSlideClass;

    this.clearBttn.addEventListener("click", this.focusSearchBox);
    this.submitBttn.addEventListener("click", this.searchGifos);
    this.searchBox.addEventListener("input", this.validateSuggestions);
    this.searchBox.addEventListener("keyup", ({ key }) => {
      if (key === "Enter" && this.searchBox.checkValidity()) this.searchGifos();
    });

    // link trending terms content if needed
    if (
      typeof trendingTermsBoxId !== "undefined" &&
      typeof trendingTermsCallback !== "undefined"
    ) {
      this.trendingTerms = document.getElementById(trendingTermsBoxId);
      this.apiTrendingTerms = trendingTermsCallback;

      let content = await this.trendingSearch();
      this.trendingTerms.innerHTML = content;
      this.linkSuggestions(this.trendingTerms);
    }
  };

  focusSearchBox = () => {
    this.searchBox.value = "";
    this.searchBox.focus();
    this.validateSuggestions();
    this.closeResults();
  };

  closeSuggestions = () => {
    this.submitBttn.classList.replace(
      "search-bttn__submit--show",
      "search-bttn__submit--hide"
    );
    if (this.searchBox.value === "") {
      this.clearBttn.classList.replace(
        "search-bttn__clear",
        "search-bttn__focus"
      );
    } else {
      this.clearBttn.classList.replace(
        "search-bttn__focus",
        "search-bttn__clear"
      );
    }
    this.suggestionsBox.classList.replace(
      "search-suggestions--show",
      "search-suggestions--hide"
    );
  };

  openSuggestions = () => {
    this.submitBttn.classList.replace(
      "search-bttn__submit--hide",
      "search-bttn__submit--show"
    );
    this.clearBttn.classList.replace(
      "search-bttn__focus",
      "search-bttn__clear"
    );

    this.suggestionsBox.classList.replace(
      "search-suggestions--hide",
      "search-suggestions--show"
    );
  };

  openResults = () => {
    this.results.classList.replace("results--hide", "results--show");
  };

  closeResults = () => {
    this.results.classList.replace("results--show", "results--hide");
  };

  linkSuggestions = (contentBox) => {
    let terms = contentBox.querySelectorAll("a");
    terms.forEach((term) => {
      term.addEventListener("click", (event) => {
        this.searchBox.value = event.target.innerHTML;
        this.searchGifos();
      });
    });
  };

  validateSuggestions = async () => {
    if (this.searchBox.checkValidity()) {
      let content = await this.autocomplete();

      if (content) {
        this.suggestionsBox.innerHTML = content;
        this.linkSuggestions(this.suggestionsBox);
        this.openSuggestions();
      } else {
        this.closeSuggestions();
      }
    } else {
      this.closeSuggestions();
    }
  };

  autocomplete = async () => {
    let suggestions = [];
    let giphyArr = await this.apiSuggestions({ term: this.searchBox.value });

    if (typeof giphyArr === "undefined") return false;
    if (!giphyArr.length) return false;

    giphyArr.forEach((term) => {
      let suggestion = `<li><a href="#">${term.name}</a></li>`;
      suggestions.push(suggestion);
    });

    return suggestions.join("\n");
  };

  trendingSearch = async () => {
    let terms = [];
    let limit = 5;
    let giphyArr = await this.apiTrendingTerms();

    giphyArr.some((tag, i) => {
      if (limit && i === limit) return terms.join("\n");
      let term = `<li><a href="#">${tag}</a></li>`;
      terms.push(term);
    });

    return terms.join("\n");
  };

  searchGifos = async () => {
    this.closeSuggestions();
    this.openResults();
    this.results.getElementsByTagName("h2")[0].innerHTML = this.searchBox.value;
    let query = {
      term: this.searchBox.value,
      limit: 12,
      offset: 0,
      rating: "r",
    };

    let giphyArr = await this.apiSearch(query);
    this.resultsGrid.innerHTML = this.appendSlides(
      giphyArr,
      this.resultsSlideClass
    );
  };

  appendSlides = (giphyArr, classType) => {
    let slides = [];

    giphyArr.forEach((giphy) => {
      let slide = `
<div class="${classType}">
<img src="${giphy.url}" alt="${giphy.title}">
</div>`;

      slides.push(slide);
    });

    return slides.join("\n");
  };
}

export { GifosCommons, GifosSlides, GifosSearch };
