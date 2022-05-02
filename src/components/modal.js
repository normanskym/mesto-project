import {
  profileName, 
  profileJob,
  nameInput,
  jobInput,
  popupEditProfile,
  placeNameInput,
  placeLinkInput,
  elementsList,
  formAddCard,            
  avatarInput,
  profileAvatar,
  popupAddCard,
  popupEditAvatar,
} from "./constants.js";
import { createCard } from './card.js';
import { updateUserProfile, addNewCard, updateUserAvatar } from "./api.js";

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

//Сабмит попапа редактирования аватара
export function handleAvatarSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  updateUserAvatar({
    avatar: avatarInput.value,
  })
    .then((data) => {
      profileAvatar.setAttribute("src", data.avatar);
      closePopup(popupEditAvatar);
      avatarInput.value = "";
      evt.submitter.setAttribute("disabled", true);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (evt.submitter.textContent = "Сохранить"));
}

//Сабмит попапа редактирования профиля
export function handleProfileSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  updateUserProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (evt.submitter.textContent = "Сохранить"));
}

//Сабмит попапа добавления карточки
export function handleCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  addNewCard({
    name: placeNameInput.value,
    link: placeLinkInput.value,
  })
    .then((data) => {
      console.log(data);
      const card = createCard(
        data.link,
        data.name,
        data.likes.length,
        data.owner._id,
        data.owner._id,
        data._id
      );
      closePopup(popupAddCard);
      elementsList.prepend(card);
      formAddCard.reset();
      evt.submitter.setAttribute("disabled", true);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (evt.submitter.textContent = "Сохранить"));
}