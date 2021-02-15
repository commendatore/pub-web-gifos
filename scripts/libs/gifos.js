class GifosCommons {
  constructor() {
    // mobile hamburger menu
    this.navbarMenu = document.getElementById("navbar-menu");
    this.navbarButtonsHamburger = document.getElementById(
      "navbar-buttons__hamburger"
    );
    this.navbarButtonsHamburger.addEventListener("click", this.toggleHamburger);

    // theme switcher button
    this.lightMode = document.getElementById("theme-light");
    this.nightMode = document.getElementById("theme-night");

    this.navbarMenuThemeSwitch = document.getElementById(
      "navbar-menu__theme-switch"
    );
    this.navbarMenuThemeSwitch.addEventListener("click", this.switchTheme);

    // check current theme
    this.currentTheme = localStorage.getItem("theme");
    if (this.currentTheme) {
      if (this.currentTheme === "dark") {
        this.setNightMode();
      } else {
        this.setLightMode();
      }
    }
  }

  toggleHamburger = () => {
    let isClosed = this.navbarMenu.classList.contains("navbar-menu--close");
    if (isClosed === true) {
      this.navbarButtonsHamburger.classList.replace(
        "navbar-buttons__hamburger-icon--open-menu",
        "navbar-buttons__hamburger-icon--close-menu"
      );
      this.navbarMenu.classList.replace(
        "navbar-menu--close",
        "navbar-menu--show"
      );
    } else {
      this.navbarButtonsHamburger.classList.replace(
        "navbar-buttons__hamburger-icon--close-menu",
        "navbar-buttons__hamburger-icon--open-menu"
      );
      this.navbarMenu.classList.replace(
        "navbar-menu--show",
        "navbar-menu--close"
      );
    }
  };

  switchTheme = () => {
    if (this.currentTheme === "dark") {
      this.setLightMode();
    } else {
      this.setNightMode();
    }
  };

  setNightMode = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    this.nightMode.media = "";
    this.lightMode.media = "none";

    localStorage.setItem("theme", "dark");
    this.currentTheme = "dark";

    this.navbarMenuThemeSwitch.innerHTML = "Modo Diurno";
  };

  setLightMode = () => {
    document.documentElement.setAttribute("data-theme", "light");
    this.lightMode.media = "";
    this.nightMode.media = "none";

    localStorage.setItem("theme", "light");
    this.currentTheme = "light";

    this.navbarMenuThemeSwitch.innerHTML = "Modo Nocturno";
  };
}

class GifosSlide {}

export { GifosCommons, GifosSlide };
