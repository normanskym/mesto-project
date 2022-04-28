import {
    profileName, 
    profileJob,
    nameInput,
    jobInput,
    popupEditProfile,
    placeNameInput,
    placeLinkInput,
    elementsList,
    popupAddCardSubmitButton            
} from "./constants.js";
import { newCards } from './../index.js';
import { createCard } from './card.js';

//Закрытие попапа на overlay
function closePopupToClickOverlay () {
  closePopup(document.querySelector('.popup_opened'));
}

//Закрытие попапа на escape
function closePopupToEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
  
    document.addEventListener('keydown', closePopupToEsc);
  
    const popupOverlay = popup.querySelector('.popup__overlay');
    popupOverlay.addEventListener('click', closePopupToClickOverlay);
}

//Закрытие попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closePopupToEsc);
    const popupOverlay = popup.querySelector('.popup__overlay');
    popupOverlay.removeEventListener('click', closePopupToClickOverlay);
}

//Сабмит попапа редактирования профиля
export function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

//Сабмит попапа добавления карточки
export function handleCardSubmit(evt) {
    evt.preventDefault();
    const card = createCard(placeNameInput.value, placeLinkInput.value)
    elementsList.prepend(card);
    evt.target.reset();
    popupAddCardSubmitButton.classList.add('popup__submit-button_inactive');
    popupAddCardSubmitButton.setAttribute('disabled', '');
    closePopup(evt.target.closest('.popup_opened'));
}