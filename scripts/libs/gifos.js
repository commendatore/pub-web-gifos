class GifosCommons {
  constructor() {
    this._navbarMenu = document.getElementById("navbar-menu");
    this._navbarButtonsHamburguer = document.getElementById(
      "navbar-buttons__hamburguer"
    );

    this._navbarButtonsHamburguer.addEventListener(
      "click",
      this.toggleHamburger
    );
  }

  toggleHamburger = () => {
    let isClosed = this._navbarMenu.classList.contains("navbar-menu--close");
    if (isClosed === true) {
      this._navbarMenu.classList.replace(
        "navbar-menu--close",
        "navbar-menu--show"
      );
      this._navbarButtonsHamburguer.classList.replace(
        "navbar-buttons__hamburguer--show",
        "navbar-buttons__hamburguer--close"
      );
    } else {
      this._navbarMenu.classList.replace(
        "navbar-menu--show",
        "navbar-menu--close"
      );
      this._navbarButtonsHamburguer.classList.replace(
        "navbar-buttons__hamburguer--close",
        "navbar-buttons__hamburguer--show"
      );
    }
  };
}

export { GifosCommons };
