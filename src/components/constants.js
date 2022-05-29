//Данные на странице
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

//Формы
export const formEditProfile = document.querySelector('.popup__form_editProfile');
export const formAddCard = document.querySelector('.popup__form_addCard');
export const formEditAvatar = document.querySelector('.popup__form_editAvatar');

//Кнопки
export const profileAvatarButton = document.querySelector('.profile__avatar-edit-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddCardButton = document.querySelector('.profile__addCard-button');

export const formAddCardButton = document.querySelector('.popup__addCardSubmit-button');

export const popupEditAvatarCloseButton = document.querySelector('.popup_editAvatar__close-button');
export const popupEditProfileCloseButton = document.querySelector('.popup_editProfile__close-button');
export const popupAddCardCloseButton = document.querySelector('.popup_addCard__close-button');
export const popupOpenImageCloseButton = document.querySelector('.popup_OpenImage__close-button');

//Попапы
export const popups = document.querySelectorAll(".popup");
export const popupEditAvatar = document.querySelector('.popup_editAvatar');
export const popupEditProfile = document.querySelector('.popup_editProfile');
export const popupAddCard = document.querySelector('.popup_addCard');
export const popupImage = document.querySelector('.popup_openImage');

export const popupImagePic = document.querySelector('.popup__image');
export const popupImageText = document.querySelector('.popup__image-text');

//Инпуты
export const avatarInput = document.querySelector('.popup__avatarLink-input');
export const nameInput = document.querySelector('.popup__name-input');
export const jobInput = document.querySelector('.popup__job-input');

export const placeNameInput = document.querySelector('.popup__placeName-input');
export const placeLinkInput = document.querySelector('.popup__placeLink-input');

//Карточки
export const elementsList = document.querySelector('.elements__list');
export const cardTemplate = document.querySelector('.card-template').content;
export const removeCardBtn = document.querySelector('#removeCardBtn');

export const settings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
})