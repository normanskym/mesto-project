//Проверка наличия невалидных инпутов для деактивации кнопки сабмита
function checkInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}
  
//Деактивация кнопки сабмита
function toggleButtonState (inputList, buttonElement) {
    if (checkInvalidInput(inputList)) {
      buttonElement.classList.add('popup__submit-button_inactive');
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove('popup__submit-button_inactive');
      buttonElement.removeAttribute('disabled');
    }
}
  
//Отбор форм, отмена перезагрузки по сабмиту, установка обработчиков событий формам
export function enableValidation () {
    const formList = Array.from(document.querySelectorAll('form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      
      const fieldsetList = Array.from(formElement.querySelectorAll('fieldset'));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      });
    });
}
  
//Отображение ошибки
function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_invalid');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};
  
//Скрытие ошибки
function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_invalid');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};
  
//Проверка инпута на валидность
function checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};
  
//Установка обработчиков событий на валидацию инпутам
function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll('input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
  
        toggleButtonState(inputList, buttonElement);
      });
    });
};