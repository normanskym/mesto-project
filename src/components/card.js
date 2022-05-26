export class Card {
  constructor(
    data,
    cardTemplate,
    userId,
    imagePopup,
    deleteCard,
    addCardLike,
    deleteCardLike
  ) {
    this._data = data;
    this._cardTemplate = cardTemplate;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._imagePopup = imagePopup;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__trash-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._addCardLike = addCardLike;
    this._deleteCardLike = deleteCardLike;
    this._deleteCard = deleteCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  
  createCardElement() {
    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__picture');
    cardImage.alt = `${this._data.name}`;
    cardImage.src = this._data.link;
    this._element.querySelector('.element__text').textContent = this._data.name;
    this._element.querySelector('.element__like-counter').textContent = this._data.likes.length;
    this._setIsLiked();
    return this._element;
  }
  
  _setEventListeners() {
    if (this._cardOwnerId === this._userId) {
      this._deleteButton.style.display = 'block';
      this._deleteButton.addEventListener("click", () =>
        this._deleteButtonClick()
      );
    }
    this._likeButton.addEventListener("click", () => this._likeToggler());
    this._element.querySelector(".element__picture").addEventListener("click", this._imagePopup);
  }

  _likeToggler() {
    if (!this._likeButton.classList.contains("element__like-button_active")) {
      this._addCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._likeButton.classList.add("element__like-button_active");
        })
        .catch((err) => console.log(err));
    } else {
      this._deleteCardLike(this._cardId)
        .then((res) => {
          this._data = res;
          this._likeCounter.textContent = res.likes.length;
          this._likeButton.classList.remove("element__like-button_active");
        })
        .catch((err) => console.log(err));
    }
  }

  _setIsLiked() {
    if (this._data.likes.some(elem => elem._id === this._userId)) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }

  _deleteButtonClick() {
    const data = {
      card: this._element,
      cardId: this._cardId,
    };
    this._deleteCard(data);
  }
}