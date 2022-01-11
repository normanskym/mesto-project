const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.getElementById('editProfile');
const popupAddCard = document.getElementById('addCard');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const nameInput = document.getElementById('popup__name-input');
const jobInput = document.getElementById('popup__job-input');
const editSubmitButton = document.getElementById('popup__editProfileSubmit-button')
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const placeNameInput = document.getElementById('popup__placeName-input');
const placeLinkInput = document.getElementById('popup__placeLink-input');
const addSubmitButton = document.getElementById('popup__addCardSubmit-button');
const elementsList = document.querySelector('.elements__list'); // Контейнер карточек
const cardTemplate = document.querySelector('.card-template').content; // Шаблон карточки
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
  const createdCard = cardTemplate.querySelector('.element').cloneNode(true); // Карточка, склонированная из шаблона
  const removeCardBtn = createdCard.querySelector('.element__trash-button'); // Кнопка удаления карточки
  const likeBtn = createdCard.querySelector('.element__like-button');
  const cardName = createdCard.querySelector('.element__text');
  const cardImg = createdCard.querySelector('.element__picture');

  cardName.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;

  likeBtn.addEventListener('click', likeCard);
  removeCardBtn.addEventListener('click', removeCard);

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
elementsList.append(...newCards);

function PopupOpen(popup) {
  popup.classList.add('popup_opened');
}

popupCloseButtons.forEach(function(btn){
  btn.addEventListener('click', function popupClose(e){
    e.target.closest('.popup_opened').classList.remove('popup_opened');
  })
})

nameInput.setAttribute('value', profileName.textContent);
jobInput.setAttribute('value', profileJob.textContent);

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function EditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupEditProfile.classList.remove('popup_opened');
}

function AddCardSubmitHandler(evt) {
  evt.preventDefault();
  newCards.unshift(createCard(placeNameInput.value, placeLinkInput.value));
  elementsList.append(...newCards);
  placeNameInput.value = '';
  placeLinkInput.value = '';
  evt.target.closest('.popup_opened').classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', () => PopupOpen(popupEditProfile));
editSubmitButton.addEventListener('click', EditProfileSubmitHandler);
profileAddButton.addEventListener('click', () => PopupOpen(popupAddCard));
addSubmitButton.addEventListener('click', AddCardSubmitHandler);