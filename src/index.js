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
} from './components/utils.js';

import { initialCards, createCard } from './components/card.js';
import { openPopup, closePopup, editProfileSubmitHandler, addCardSubmitHandler } from './components/modal.js';
import { enableValidation } from './components/validate.js';

//Инициализация карточек
export const newCards = initialCards.map((place) => {
  return createCard(place.name, place.link);
});
elementsList.append(...newCards);

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

//Обработчики событий
profileEditButton.addEventListener('click', () => openPopup(popupEditProfile));
popupEditProfileSubmit.addEventListener('submit', editProfileSubmitHandler);
profileAddButton.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardSubmit.addEventListener('submit', addCardSubmitHandler);
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupOpenImageCloseButton.addEventListener('click', () => closePopup(popupImage));

//Активация валидации
enableValidation();