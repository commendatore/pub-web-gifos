class GifosCommons {
  constructor() {
    // navbar menu button
    this.navbarMenu = document.getElementById("navbar-menu");
    this.navbarButtonsHamburguer = document.getElementById(
      "navbar-buttons__hamburguer"
    );
    this.navbarButtonsHamburguer.addEventListener(
      "click",
      this.toggleHamburger
    );

    // theme switcher button
    this.navbarMenuThemeSwitch = document.getElementById(
      "navbar-menu__theme-switch"
    );
    this.navbarMenuThemeSwitch.addEventListener("click", this.switchTheme);

    // check current theme
    this.currentTheme = localStorage.getItem("theme");
    if (this.currentTheme) {
      document.documentElement.setAttribute("data-theme", this.currentTheme);
      if (this.currentTheme === "dark") {
        this.setDarkMode();
      } else {
        this.setLightMode();
      }
    }
  }

  toggleHamburger = () => {
    let isClosed = this.navbarMenu.classList.contains("navbar-menu--close");
    if (isClosed === true) {
      this.navbarButtonsHamburguer.classList.replace(
        "navbar-buttons__hamburguer--show",
        "navbar-buttons__hamburguer--close"
      );
      this.navbarMenu.classList.replace(
        "navbar-menu--close",
        "navbar-menu--show"
      );
    } else {
      this.navbarButtonsHamburguer.classList.replace(
        "navbar-buttons__hamburguer--close",
        "navbar-buttons__hamburguer--show"
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
      this.setDarkMode();
    }
  };

  setDarkMode = () => {
    let buttonCreateGif = document.querySelector(".navbar-buttons__create-gif");
    let logoGifOS = document.querySelector(".navbar-logo__link");

    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    this.currentTheme = "dark";
    this.navbarMenuThemeSwitch.innerHTML = "Modo Diurno";
    buttonCreateGif.classList.replace(
      "navbar-buttons__create-gif--light-theme",
      "navbar-buttons__create-gif--dark-theme"
    );
    logoGifOS.classList.replace(
      "navbar-logo__link--light-theme",
      "navbar-logo__link--dark-theme"
    );
  };

  setLightMode = () => {
    let buttonCreateGif = document.querySelector(".navbar-buttons__create-gif");
    let logoGifOS = document.querySelector(".navbar-logo__link");

    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    this.currentTheme = "light";
    this.navbarMenuThemeSwitch.innerHTML = "Modo Nocturno";
    buttonCreateGif.classList.replace(
      "navbar-buttons__create-gif--dark-theme",
      "navbar-buttons__create-gif--light-theme"
    );
    logoGifOS.classList.replace(
      "navbar-logo__link--dark-theme",
      "navbar-logo__link--light-theme"
    );
  };
}

export { GifosCommons };
