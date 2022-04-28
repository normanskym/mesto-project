export const settings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
})

//Проверка наличия невалидных инпутов для деактивации кнопки сабмита
function checkInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}
  
//Деактивация кнопки сабмита
function toggleButtonState (inputList, buttonElement, settings) {
    if (checkInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
}
  
//Отбор форм, отмена перезагрузки по сабмиту, установка обработчиков событий формам
export function enableValidation (settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

      });
      setEventListeners(formElement, settings);
    });
}
  
//Отображение ошибки
function showInputError (formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};
  
//Скрытие ошибки
function hideInputError (formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};
  
//Проверка инпута на валидность
function checkInputValidity (formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
};
  
//Установка обработчиков событий на валидацию инпутам
function setEventListeners (formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, settings);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
  
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
};