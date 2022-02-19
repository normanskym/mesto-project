const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_editProfile');
const popupAddCard = document.querySelector('.popup_addCard');
const popupAddCardCloseButton = document.querySelector('.popup_addCard__close-button');
const popupOpenImageCloseButton = document.querySelector('.popup_OpenImage__close-button');
const popupEditProfileCloseButton = document.querySelector('.popup_editProfile__close-button');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');
const popupEditProfileSubmit = document.querySelector('.popup__form_editProfile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const placeNameInput = document.querySelector('.popup__placeName-input');
const placeLinkInput = document.querySelector('.popup__placeLink-input');
const popupAddCardSubmit = document.querySelector('.popup__form_addCard');
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template').content;
const popupImage = document.querySelector('.popup_openImage');
const popupImagePic = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-text');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function createCard(name, link) {
  const createdCard = cardTemplate.querySelector('.element').cloneNode(true);
  const removeCardBtn = createdCard.querySelector('.element__trash-button');
  const likeBtn = createdCard.querySelector('.element__like-button');
  const cardName = createdCard.querySelector('.element__text');
  const cardImg = createdCard.querySelector('.element__picture');

  cardName.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;

  likeBtn.addEventListener('click', likeCard);
  removeCardBtn.addEventListener('click', removeCard);
  cardImg.addEventListener('click', () => {
    openPopup(popupImage);
    popupImagePic.setAttribute('src', link);
    popupImageText.textContent = name;
  })

  return createdCard;
}

function likeCard(event) {
  event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

function removeCard(event) {
  event.target.closest('.element').remove();
}

const newCards = initialCards.map((place) => {
  return createCard(place.name, place.link);
});
elementsList.append(...newCards);//РАЗОБРАТЬ

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  newCards.unshift(createCard(placeNameInput.value, placeLinkInput.value));
  elementsList.append(...newCards);
  placeNameInput.value = '';
  placeLinkInput.value = '';
  closePopup(evt.target.closest('.popup_opened'));
}

profileEditButton.addEventListener('click', () => openPopup(popupEditProfile));
popupEditProfileSubmit.addEventListener('submit', editProfileSubmitHandler);
profileAddButton.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardSubmit.addEventListener('submit', addCardSubmitHandler);

popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupOpenImageCloseButton.addEventListener('click', () => closePopup(popupImage));