'use strict';

(function (
    DomUtil,
    Menu
) {
  var menuButton = document.querySelector('.page-header__humburger');

  var isDesktop = function () {
    return window.matchMedia('(min-width: 1390px)').matches;
  };

  var isNotDesktop = !isDesktop();

  var onWindowResize = function () {
    if (!isDesktop() && !isNotDesktop) {
      menuButton.addEventListener('click', onMenuButtonClick);
      menu.hide();
      DomUtil.show(menuButton);
      isNotDesktop = true;
    }

    if (isDesktop() && isNotDesktop) {
      menuButton.removeEventListener('click', onMenuButtonClick);
      menu.show();
      DomUtil.hide(menuButton);
      isNotDesktop = false;
    }
  };

  var onMenuButtonClick = function () {
    menu.open();
  };

  var menu = new Menu();

  if (!isDesktop()) {
    menuButton.addEventListener('click', onMenuButtonClick);
  } else {
    menu.show();
    DomUtil.hide(menuButton);
  }

  window.addEventListener('resize', onWindowResize);
})(
    window.DomUtil,
    window.Menu
);
