'use strict';

(function () {
  var form = document.querySelector('.request__form');
  var name = form.querySelector('.input--name');
  var phone = form.querySelector('.input--phone');
  var agreement = form.querySelector('.request__checkbox');
  var submitButton = form.querySelector('.request__button');
  var successLink = form.querySelector('.request__link');

  var im = new Inputmask('+7( 999 ) 999 - 99 - 99');

  im.mask(phone);

  var isValid = function (input) {
    return input.value !== '';
  };

  var clear = function () {
    name.value = '';
    phone.value = '';
    agreement.checked = false;
  }

  var addError = function (input) {
    if (!input.classList.contains('input--error')) {
      input.classList.add('input--error');
    }
  };

  var removeError = function (input) {
    if (input.classList.contains('input--error')) {
      input.classList.remove('input--error');
    }
  };

  var setError = function (input) {
    input.setCustomValidity('');
    addError(input);
  };

  var onInput = function (evt) {
    var input = evt.target;
    removeError(input);
  };

  var onClick = function (evt) {
    if (!isValid(name)) {
      setError(name);
    }

    if (!isValid(phone)) {
      setError(phone);
    }
  };

  var onChange = function () {
    agreement.checked
      ? agreement.setCustomValidity('')
      : agreement.setCustomValidity('Данное поле должно быть отмечено');
  };

  var onSubmit = function (evt) {
    evt.preventDefault();

    agreement.reportValidity();

    if (isValid(name) && isValid(phone) && agreement.checked) {
      successLink.click();
      clear();
    }
  };

  submitButton.addEventListener('click', onClick);
  agreement.setCustomValidity('Данное поле должно быть отмечено');
  form.addEventListener('submit', onSubmit);
  agreement.addEventListener('change', onChange);
  name.addEventListener('input', onInput);
  phone.addEventListener('input', onInput);
})();
