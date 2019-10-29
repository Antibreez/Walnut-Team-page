'use strict';

(function (
    DomUtil,
    CallOrder
) {
  var menuWrapper = document.querySelector('.page-header__wrapper1');
  var closeButton = document.querySelector('.page-header__menu-close');
  var callbackButton = menuWrapper.querySelector('.page-header__advantage-item--callback button');

  var Menu = function () {
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onCallbackClick = this._onCallbackClick.bind(this);
    this._callOrder = new CallOrder();

    callbackButton.addEventListener('click', this._onCallbackClick);
  };

  Menu.prototype.open = function () {
    DomUtil.show(menuWrapper);
    this._addEventListeners();
  };

  Menu.prototype.show = function () {
    DomUtil.isHidden(menuWrapper)
      ? DomUtil.show(menuWrapper)
      : this._removeEventListeners();
  };

  Menu.prototype.hide = function () {
    DomUtil.hide(menuWrapper);
  };

  Menu.prototype._close = function () {
    DomUtil.hide(menuWrapper);
  };

  Menu.prototype._onCloseClick = function () {
    this._close();
    this._removeEventListeners();
  };

  Menu.prototype._onCallbackClick = function () {
    this._callOrder.addEventListeners();
  };

  Menu.prototype._addEventListeners = function () {
    closeButton.addEventListener('click', this._onCloseClick);
  };

  Menu.prototype._removeEventListeners = function () {
    closeButton.removeEventListener('click', this._onCloseClick);
  };

  window.Menu = Menu;
})(
    window.DomUtil,
    window.CallOrder
);
