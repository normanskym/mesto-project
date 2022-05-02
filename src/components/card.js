import { popupImage, popupImagePic, popupImageText, cardTemplate } from "./constants.js";
import { openPopup } from "./modal.js";
import { like, unlike, deleteCard, checkResult } from "./api.js";

function removeCard(evt) {
  evt.target.closest('.element').remove();
}
  
//Создание карточки
export function createCard(
  link,
  name,
  numberOfLikes,
  currentUserId,
  ownerId,
  cardId,
  cardLikes = []
  ) {
    const createdCard = cardTemplate.querySelector('.element').cloneNode(true);
    const removeCardBtn = createdCard.querySelector('.element__trash-button');
    const likeBtn = createdCard.querySelector('.element__like-button');
    const cardName = createdCard.querySelector('.element__text');
    const cardImg = createdCard.querySelector('.element__picture');
    const likeCounter = createdCard.querySelector('.element__like-counter');

    if (currentUserId === ownerId) {
      removeCardBtn.style.display = 'block';
    }

    removeCardBtn.addEventListener("click", (evt) => {
      deleteCard(cardId)
      .then(checkResult)
      .then(
        () => removeCard(evt),
        evt.target.closest('.element').remove()
        )
      .catch((err) => console.log(err));
    });
    
    likeCounter.textContent = numberOfLikes;
    cardName.textContent = name;
    cardImg.setAttribute("src", link);
    cardImg.setAttribute("alt", name);
    
    likeBtn.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("element__like-button_active")) {
        unlike(cardId)
          .then((data) => {
            likeBtn.classList.remove("element__like-button_active");
            likeCounter.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        like(cardId)
          .then((data) => {
            likeBtn.classList.add("element__like-button_active");
            likeCounter.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    const isCurrentUser = cardLikes.some(function (userWhoLike) {
      return userWhoLike._id === currentUserId;
    });
    if (isCurrentUser) {
      likeBtn.classList.add("element__like-button_active");
    }
    cardImg.addEventListener("click", function (evt) {
      evt.stopPropagation();
      openPopup(popupImage);
      popupImagePic.setAttribute("src", link);
      popupImagePic.setAttribute("alt", name);
      popupImageText.textContent = name;
    });
  
    return createdCard;
}