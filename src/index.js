import './pages/index.css';
import {
  profileName,
  profileJob,
  profileEditButton,
  profileAddButton,
  popupEditProfileSubmit,
  popupAddCardSubmit,
  popupEditProfileCloseButton,
  popupAddCardCloseButton,
  popupOpenImageCloseButton,
  popupEditProfile,
  popupAddCard,
  popupImage,
  nameInput,
  jobInput,
  elementsList
} from './components/constants.js';

import { initialCards, createCard } from './components/card.js';
import { openPopup, closePopup, handleProfileSubmit, handleCardSubmit } from './components/modal.js';
import { enableValidation, settings } from './components/validate.js';

//Инициализация карточек
export const newCards = initialCards.map((place) => {
  return createCard(place.name, place.link);
});
elementsList.append(...newCards);

//Обработчики событий
profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
popupEditProfileSubmit.addEventListener('submit', handleProfileSubmit);
profileAddButton.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardSubmit.addEventListener('submit', handleCardSubmit);
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupOpenImageCloseButton.addEventListener('click', () => closePopup(popupImage));

//Активация валидации
enableValidation(settings);