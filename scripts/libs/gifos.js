class GifosCommons {
  constructor(hamburgerBttnId, hamburgerMenuId, themeBttnId) {
    // hamburger menu and theme switcher
    this.hamburgerBttn = document.getElementById(hamburgerBttnId);
    this.hamburgerMenu = document.getElementById(hamburgerMenuId);
    this.themeBttn = document.getElementById(themeBttnId);
    this.hamburgerBttn.addEventListener("click", this.toggleHamburger);
    this.themeBttn.addEventListener("click", this.switchTheme);

    // themes environment
    this.lightMode = document.getElementById("theme-light");
    this.nightMode = document.getElementById("theme-night");
    this.currentTheme = localStorage.getItem("theme");
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

  isNightMode = () => {
    // check current theme
    if (this.currentTheme) {
      if (this.currentTheme === "dark") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  switchTheme = () => {
    if (this.isNightMode()) {
      this.setLightMode();
      this.themeBttn.innerHTML = "Modo Nocturno";
    } else {
      this.setNightMode();
      this.themeBttn.innerHTML = "Modo Diurno";
    }
  };

  setNightMode = () => {
    // change css root colors variables
    document.documentElement.setAttribute("data-theme", "dark");
    // change css assets
    this.nightMode.media = "";
    this.lightMode.media = "none";

    localStorage.setItem("theme", "dark");
    this.currentTheme = "dark";
  };

  setLightMode = () => {
    // change css root colors variables
    document.documentElement.setAttribute("data-theme", "light");
    // change css assets
    this.lightMode.media = "";
    this.nightMode.media = "none";

    localStorage.setItem("theme", "light");
    this.currentTheme = "light";
  };

  getPage = () => {
    let path = window.location.pathname;
    if (path === "/") return "index";
    let page = path.split("/").pop();
    let name = page.split(".").slice(0, -1).join(".");
    return name;
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

  forwardSlider = () => {
    let step = this.trendingSlider.scrollWidth / this.trendingSliderLength;
    this.trendingSlider.scrollLeft += step;
  };

  backwardSlider = () => {
    let step = this.trendingSlider.scrollWidth / this.trendingSliderLength;
    this.trendingSlider.scrollLeft -= step;
  };

  setSlider = async (
    htmlContainerId,
    classType,
    backwardBttnId,
    forwardBttnId,
    trendingGifsCallback
  ) => {
    this.trendingSlider = document.getElementById(htmlContainerId);
    this.backwardBttn = document.getElementById(backwardBttnId);
    this.forwardBttn = document.getElementById(forwardBttnId);
    this.apiTrending = trendingGifsCallback;

    this.backwardBttn.addEventListener("click", this.backwardSlider);
    this.forwardBttn.addEventListener("click", this.forwardSlider);

    let giphyArr = await this.apiTrending({ rating: "r" });
    let gifosSlides = this.appendSlides(giphyArr, classType);
    this.trendingSlider.innerHTML = gifosSlides.content;
    this.trendingSliderLength = gifosSlides.length;
  };
}

class GifosSearch {
  constructor() {
    this.searchBox = undefined;
    this.suggestionsBox = undefined;
    this.submitBttn = undefined;
    this.clearBttn = undefined;
    this.apiSuggestions = undefined;
  }

  setSearchBox = (
    searchBoxId,
    suggestionsBoxId,
    submitBttnId,
    clearBttnId,
    suggestionsCallback
  ) => {
    this.searchBox = document.getElementById(searchBoxId);
    this.suggestionsBox = document.getElementById(suggestionsBoxId);
    this.submitBttn = document.getElementById(submitBttnId);
    this.clearBttn = document.getElementById(clearBttnId);
    this.apiSuggestions = suggestionsCallback;

    this.clearBttn.addEventListener("click", this.focusSearchBox);
    this.submitBttn.addEventListener("click", this.searchGifos);
    this.searchBox.addEventListener("input", this.validateSearch);
  };

  focusSearchBox = () => {
    this.searchBox.value = "";
    this.searchBox.focus();
    this.validateSearch();
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
    }
    this.suggestionsBox.classList.replace(
      "search-suggestions--show",
      "search-suggestions--hide"
    );
  };

  validateSearch = async () => {
    if (this.searchBox.validity.valid) {
      let content = await this.autocomplete();

      if (content) {
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

        this.suggestionsBox.innerHTML = content;
        let terms = this.suggestionsBox.querySelectorAll("a");
        terms.forEach((term) => {
          term.addEventListener("click", (event) => {
            this.searchBox.value = event.target.innerHTML;
            this.searchGifos();
          });
        });
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
    if (!giphyArr.length) return false;

    giphyArr.forEach((term) => {
      let suggestion = `<li><a href="#">${term.name}</a></li>`;
      suggestions.push(suggestion);
    });

    return suggestions.join("\n");
  };

  searchGifos = () => {
    this.closeSuggestions();
    console.log("search gifo: " + this.searchBox.value);
  };
}

export { GifosCommons, GifosSlides, GifosSearch };
