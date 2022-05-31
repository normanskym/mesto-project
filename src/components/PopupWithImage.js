import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = document.querySelector('.popup__image');
    this._popupImgName = document.querySelector('.popup__image-text');
  }
  open(link, name) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupImgName.textContent = name;

    super.open();
  }
} 