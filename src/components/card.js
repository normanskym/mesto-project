export default class Card {
  constructor(
    {selector},
    card,
    api,
    user,
    handleCardClick,
  ) {
    this._selector = selector;
    this._image = card.link;
    this._name = card.name;
    this._likes = card.likes;
    this._api = api;
    this._id = card._id;
    this._userID = user._id;
    this._owner = card.owner._id;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  
  createCard() {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.element__picture');
    this.likeButton = this._element.querySelector('.element__like-button');

    image.src = this._image;
    image.alt = this._name;

    this._element.querySelector('.element__text').textContent = this._name;
    this._likeCounter = this._element.querySelector('.element__like-counter');

    if (this._likes.length > 0) {
      this._likeCounter.textContent = this._likes.length;
    } else {
      this._likeCounter.textContent = '0';
    }

    this._checkMyLike(this.likes);
    this._setEventListeners();

    if (this._owner !== this._userID) {
      this._element.querySelector('.element__trash-button').style.display = 'none';
    }

    return this._element;
  }
  
  _setEventListeners() {
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    });
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeToggler();
    });
    this._element.querySelector('.element__trash-button').addEventListener("click", () => {
      this._api.deleteCard(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => console.log(err));
    });
  }

  _likeToggler() {
    if (this.likeButton.classList.contains("element__like-button_active")) {
      this._api.unlike(this._id)
      .then((data) => {
        this._likeCounter.textContent = data.likes.length;
        this.likeButton.classList.remove('element__like-button_active');
      })
      .catch((err) => console.log(err));
    } else {
      this._api.like(this._id)
      .then((data) => {
        this._likeCounter.textContent = data.likes.length;
        this.likeButton.classList.add('element__like-button_active');
      })
      .catch((err) => console.log(err));
    }
  }

  _checkMyLike(likes) {
    const myLike = (element) => element._id === this._userID;
    if (likes.some(myLike)) { this.likeButton.classList.add('element__like-button_active') }
  }
}