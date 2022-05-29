import './pages/index.css';

import { api } from './components/Api';
import UserInfo from './components/UserInfo';
import Section from './components/Section';
import Card from './components/Card';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import FormValidator from './components/FormValidator';

import {
  profileEditButton,
  profileAddCardButton,
  formEditProfile,
  formAddCard,
  popupEditProfile,
  popupAddCard,
  profileAvatarButton,
  popupEditAvatar,
  formEditAvatar,
  settings
} from './components/constants';

let user;

const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileJob: '.profile__job',
  profileAvatar: '.profile__avatar'
});

//создание экземпляра класса Section
const cardList = new Section({
  renderer: (item) => renderCard(item)
  },
  '.elements__list'
  );

//создание экземпляра класса popupWithImage
const popupWithImage = new PopupWithImage(popupImage);

//валидация
const formValidators = {}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(settings);

//попап редактирования профиля
const popupFormEditProfile = new PopupWithForm(popupEditProfile, formEditProfile,
  function handleFormSubmit(data) {
    popupFormEditProfile.renderLoading(true);
    api.updateUserProfile(data.name, data.about)
      .then((user) => {
        userInfo.setUserInfo(user);
        popupFormEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupFormEditProfile.renderLoading(false);
      })
  }
)

//попап редактирования аватара
const popupFormEditAvatar = new PopupWithForm(popupEditAvatar, formEditAvatar,
  function handleFormSubmit(data) {
    popupFormEditAvatar.renderLoading(true);
    api.updateUserAvatar(data.link)
      .then((user) => {
        userInfo.setUserInfo(user);
        popupFormEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupFormEditAvatar.renderLoading(false);
      })
  }
)

//попап добавления карточки
const popupFormAddCard = new PopupWithForm(popupAddCard, formAddCard,
  function handleFormSubmit(data) {
    popupFormAddCard.renderLoading(true);
    api.addNewCard(data)
      .then((card) => {
        cardList.addItem(card); 
        popupFormAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupFormAddCard.renderLoading(false);
      })
  }
)

//получение профиля и карточек с API
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user = userData;
    userInfo.setUserInfo(user);
    cardList.renderItems(cards); 
  })
  .catch((err) => {
    console.log(err);
  });

//создание карточек
function renderCard(item) {
  const newCard = new Card({ selector: '.card-template' }, item, api, user, handleCardClick).createCard();
  return newCard;
} 

function handleCardClick(name, link) {
  popupWithImage.open(link, name);
}

//обработчики событий кнопок
profileAvatarButton.addEventListener('click', () => {
  popupFormEditAvatar.open();
  formValidators['editAvatar'].resetFormValidation();
})

profileEditButton.addEventListener('click', () => {
  popupFormEditProfile.open();
  popupFormEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['editProfile'].resetFormValidation();
})

profileAddCardButton.addEventListener('click', () => {
  popupFormAddCard.open();
  formValidators['newCard'].resetFormValidation();
})

//обработчики событий попапов
popupFormEditProfile.setEventListeners();
popupFormEditAvatar.setEventListeners();
popupFormAddCard.setEventListeners();
popupWithImage.setEventListeners();