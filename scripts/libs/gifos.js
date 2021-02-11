class GifosCommons {
  constructor() {
    // mobile hamburguer menu
    this.navbarMenu = document.getElementById("navbar-menu");
    this.navbarButtonsHamburguer = document.getElementById(
      "navbar-buttons__hamburguer"
    );
    this.navbarButtonsHamburguer.addEventListener(
      "click",
      this.toggleHamburger
    );

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
      this.navbarButtonsHamburguer.classList.replace(
        "navbar-buttons__hamburguer-icon--open-menu",
        "navbar-buttons__hamburguer-icon--close-menu"
      );
      this.navbarMenu.classList.replace(
        "navbar-menu--close",
        "navbar-menu--show"
      );
    } else {
      this.navbarButtonsHamburguer.classList.replace(
        "navbar-buttons__hamburguer-icon--close-menu",
        "navbar-buttons__hamburguer-icon--open-menu"
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

export { GifosCommons };
