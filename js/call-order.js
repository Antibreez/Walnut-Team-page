'use strict';

(function () {
  var ERROR_TEXT = 'Вы не заполнили необходимые поля. Заполните недостающие данные для отправки заявки';

  var form = document.querySelector('.callback__form');
  var name = form.querySelector('.input--name');
  var phone = form.querySelector('.input--phone');
  var agreement = form.querySelector('.callback__checkbox');
  var submitButton = form.querySelector('.callback__button');
  var closeButton = document.querySelector('.callback__close');
  var error = document.querySelector('.callback__error');
  var successLink = form.querySelector('.callback__link');


  agreement.setCustomValidity('Данное поле должно быть отмечено');

  var createErrorText = function () {
    var fragment = document.createDocumentFragment();

    var d = document.createElement('br');
    var splitedText = ERROR_TEXT.split('.');
    var s1 = document.createElement('span');
    var s2 = document.createElement('span');
    s1.textContent = splitedText[0] + '.';
    s2.textContent = splitedText[1];

    fragment.appendChild(s1);
    fragment.appendChild(d);
    fragment.appendChild(s2);

    return fragment;
  };

  var CallOrder = function () {
    this._onInput = this._onInput.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onClose = this._onClose.bind(this);
  };

  CallOrder.prototype.addEventListeners = function () {
    submitButton.addEventListener('click', this._onClick);
    form.addEventListener('submit', this._onSubmit);
    agreement.addEventListener('change', this._onChange);
    name.addEventListener('input', this._onInput);
    phone.addEventListener('input', this._onInput);
    closeButton.addEventListener('click', this._onClose);
  };

  CallOrder.prototype._removeEventListeners = function () {
    submitButton.removeEventListener('click', this._onClick);
    form.removeEventListener('submit', this._onSubmit);
    agreement.removeEventListener('change', this._onChange);
    name.removeEventListener('input', this._onInput);
    phone.removeEventListener('input', this._onInput);
  };

  CallOrder.prototype._isValid = function (input) {
    return input.value !== '';
  };

  CallOrder.prototype._clear = function () {
    name.value = '';
    phone.value = '';
    agreement.checked = false;
    this._removeError(name);
    this._removeError(phone);
  };

  CallOrder.prototype._addError = function (input) {
    if (!input.classList.contains('input--error')) {
      input.classList.add('input--error');
    }
  };

  CallOrder.prototype._removeError = function (input) {
    if (input.classList.contains('input--error')) {
      input.classList.remove('input--error');
    }
  };

  CallOrder.prototype._setError = function (input) {
    input.setCustomValidity('');
    this._addError(input);
  };

  CallOrder.prototype._onInput = function (evt) {
    var input = evt.target;
    this._removeError(input);
    this._removeErrorText();
  };

  CallOrder.prototype._onClick = function (evt) {
    var isValid = true;

    if (!this._isValid(name)) {
      this._setError(name);
      isValid = false;
    }

    if (!this._isValid(phone)) {
      this._setError(phone);
      isValid = false;
    }

    if (!agreement.checked) {
      isValid = false;
    }

    if (!isValid) {
      this._renderErrorText();
    }
  };

  CallOrder.prototype._onChange = function () {
    agreement.checked
      ? agreement.setCustomValidity('')
      : agreement.setCustomValidity('Данное поле должно быть отмечено');

    this._removeErrorText();
  };

  CallOrder.prototype._renderErrorText = function () {
    if (error.textContent === '') {
      error.appendChild(createErrorText());
    }
  };

  CallOrder.prototype._removeErrorText = function () {
    if (error.textContent !== '') {
      error.textContent = '';
    }
  };

  CallOrder.prototype._onSubmit = function (evt) {
    evt.preventDefault();

    agreement.reportValidity();

    if (this._isValid(name) && this._isValid(phone) && agreement.checked) {
      closeButton.click();
      successLink.click();
      this._clear();
      this._removeErrorText();
      this._removeEventListeners();
    }
  };

  CallOrder.prototype._onClose = function () {
    this._clear();
    this._removeErrorText();
    this._removeEventListeners();
  };

  window.CallOrder = CallOrder;
})();
