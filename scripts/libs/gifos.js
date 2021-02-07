class GifosCommons {
  constructor() {
    // navbar menu
    this.navbarMenu = document.getElementById("navbar-menu");
    this.navbarButtonsHamburguer = document.getElementById(
      "navbar-buttons__hamburguer"
    );
    this.navbarButtonsHamburguer.addEventListener(
      "click",
      this.toggleHamburger
    );

    // theme switcher
    this.currentTheme = localStorage.getItem("theme");
    this.navbarMenuThemeSwitch = document.getElementById(
      "navbar-menu__theme-switch"
    );
    this.navbarMenuThemeSwitch.addEventListener("click", this.switchTheme);

    // check current theme
    if (this.currentTheme) {
      document.documentElement.setAttribute("data-theme", this.currentTheme);
      if (this.currentTheme === "dark") {
        this.navbarMenuThemeSwitch.innerHTML = "Modo Diurno";
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
    if (this.navbarMenuThemeSwitch.innerHTML === "Modo Nocturno") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      this.navbarMenuThemeSwitch.innerHTML = "Modo Diurno";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      this.navbarMenuThemeSwitch.innerHTML = "Modo Nocturno";
    }
  };
}

export { GifosCommons };
