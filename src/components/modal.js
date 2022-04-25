import {
    profileName, 
    profileJob,
    nameInput,
    jobInput,
    popupEditProfile,
    placeNameInput,
    placeLinkInput,
    elementsList            
} from "./utils.js";
import { newCards } from './../index.js';

//Открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
  
    document.addEventListener('keydown', function closePopupToEsc (evt) {
      if (evt.key === 'Escape') {
        popup.classList.remove('popup_opened');
      }
    });
  
    const popupOverlay = popup.querySelector('.popup__overlay');
    popupOverlay.addEventListener('click', function closePopupToClickOverlay () {
      popup.classList.remove('popup_opened');
    })
}

//Закрытие попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//Сабмит попапа редактирования профиля
export function editProfileSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

//Сабмит попапа добавления карточки
export function addCardSubmitHandler(evt) {
    evt.preventDefault();
    newCards.unshift(createCard(placeNameInput.value, placeLinkInput.value));
    elementsList.append(...newCards);
    placeNameInput.value = '';
    placeLinkInput.value = '';
    closePopup(evt.target.closest('.popup_opened'));
}