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
    this.trendingLength = 0;
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
    let step = this.trendingSlider.scrollWidth / this.trendingLength;
    this.trendingSlider.scrollLeft += step;
  };

  backwardSlider = () => {
    let step = this.trendingSlider.scrollWidth / this.trendingLength;
    this.trendingSlider.scrollLeft -= step;
  };

  setSlider = (
    giphyArr,
    htmlContainerId,
    classType,
    backwardBttnId,
    forwardBttnId
  ) => {
    this.trendingSlider = document.getElementById(htmlContainerId);
    this.backwardBttn = document.getElementById(backwardBttnId);
    this.forwardBttn = document.getElementById(forwardBttnId);

    this.backwardBttn.addEventListener("click", this.backwardSlider);
    this.forwardBttn.addEventListener("click", this.forwardSlider);

    let gifosSlides = this.appendSlides(giphyArr, classType);
    this.trendingSlider.innerHTML = gifosSlides.content;
    this.trendingLength = gifosSlides.length;
  };
}

export { GifosCommons, GifosSlides };
