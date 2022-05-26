import Popup from './Popup';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, form, handleFormSubmit) {
      super(popupSelector);
      this._form = form;
      this._handleFormSubmit = handleFormSubmit;
      this._popupSubmit = this._form.querySelector('.popup__submit-button');
      this._inputs = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
      this._formValues = {};
      this._inputs.forEach((input) => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setInputValues(data) {
      this._inputs.forEach((input) => {
        input.value = data[input.name];
      });
    }

    close() {
      super.close();
      this._form.reset();
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._popupSubmit.textContent = 'Сохранение...';
      } else {
        this._popupSubmit.textContent = 'Сохранить';
      };
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
}