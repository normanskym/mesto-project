import { popupImage, popupImagePic, popupImageText, cardTemplate } from "./utils.js";
import { openPopup } from "./modal.js";

//Карточки "в коробке"
export const initialCards = [
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
  
//Создание карточки
export function createCard(name, link) {
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
    });
  
    return createdCard;
}

//Лайк карточки
function likeCard(event) {
    event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
}

//Удаление карточки
function removeCard(event) {
    event.target.closest('.element').remove();
}