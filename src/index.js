import './pages/index.css';
import {
  profileAvatar,
  profileName,
  profileJob,
  profileEditButton,
  profileAddCardButton,
  formEditProfile,
  formAddCard,
  popupEditProfile,
  popupAddCard,
  nameInput,
  jobInput,
  elementsList,
  profileAvatarButton,
  popupEditAvatar,
  formEditAvatar,
  popups
} from './components/constants.js';

import { createCard } from './components/card.js';
import { openPopup, closePopup, handleProfileSubmit, handleCardSubmit, handleAvatarSubmit } from './components/modal.js';
import { enableValidation, settings } from './components/validate.js';
import { getUser, getCards } from "./components/api.js";

//Активация валидации
enableValidation(settings);

//Загрузка карточек с сервера
getUser()
  .then((user) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.setAttribute("src", user.avatar);
    getCards()
      .then((cards) => {
        cards.forEach(function (card) {
          const newCards = createCard(
            card.link,
            card.name,
            card.likes.length,
            user._id,
            card.owner._id,
            card._id,
            card.likes
          );
          elementsList.append(newCards);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

  //Обработчики закрытия попапов
popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

//Обработчики сабмитов форм
formEditProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleCardSubmit);
formEditAvatar.addEventListener('submit', handleAvatarSubmit);

//Обработчики кнопок
profileEditButton.addEventListener('click', function (evt) {
  evt.stopPropagation();
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

profileAvatarButton.addEventListener('click', function (evt) {
  evt.stopPropagation();
  openPopup(popupEditAvatar);
});

profileAddCardButton.addEventListener('click', function (evt) {
  evt.stopPropagation();
  openPopup(popupAddCard);
});