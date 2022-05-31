/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Api\": () => (/* binding */ Api),\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\nclass Api {\n  constructor({\n    baseUrl,\n    headers\n  }) {\n    this._baseUrl = baseUrl;\n    this._headers = headers;\n  } //Проверка результата запроса, обработка ошибки\n\n\n  _checkResult(res) {\n    if (res.ok) {\n      return res.json();\n    }\n\n    return Promise.reject(`Ошибка: ${res.status}`);\n  } //Загрузка изначальных карточек\n\n\n  getInitialCards = () => {\n    return fetch(`${this._baseUrl}/cards`, {\n      method: \"GET\",\n      headers: this._headers\n    }).then(res => this._checkResult(res));\n  }; //Получение информации о пользователе\n\n  getUser() {\n    return fetch(`${this._baseUrl}/users/me`, {\n      method: \"GET\",\n      headers: this._headers\n    }).then(res => this._checkResult(res));\n  } //Изменение данных профиля\n\n\n  updateUserProfile(name, job) {\n    return fetch(`${this._baseUrl}/users/me`, {\n      method: \"PATCH\",\n      headers: this._headers,\n      body: JSON.stringify({\n        name: name,\n        about: job\n      })\n    }).then(res => this._checkResult(res));\n  } //Обновление аватара\n\n\n  updateUserAvatar(data) {\n    return fetch(`${this._baseUrl}/users/me/avatar`, {\n      method: \"PATCH\",\n      headers: this._headers,\n      body: JSON.stringify({\n        avatar: data\n      })\n    }).then(res => this._checkResult(res));\n  } //Добавление карточки\n\n\n  addNewCard = data => {\n    return fetch(`${this._baseUrl}/cards`, {\n      method: \"POST\",\n      headers: this._headers,\n      body: JSON.stringify({\n        name: data.placeName,\n        link: data.placeLink\n      })\n    }).then(res => this._checkResult(res));\n  }; //Лайк карточки\n\n  like(data) {\n    return fetch(`${this._baseUrl}/cards/likes/${data}`, {\n      method: \"PUT\",\n      headers: this._headers\n    }).then(res => this._checkResult(res));\n  } //Удаление лайка карточки\n\n\n  unlike(data) {\n    return fetch(`${this._baseUrl}/cards/likes/${data}`, {\n      method: \"DELETE\",\n      headers: this._headers\n    }).then(res => this._checkResult(res));\n  } //Удаление карточки\n\n\n  deleteCard(data) {\n    return fetch(`${this._baseUrl}/cards/${data}`, {\n      method: \"DELETE\",\n      headers: this._headers\n    }).then(res => this._checkResult(res));\n  }\n\n}\nconst api = new Api({\n  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',\n  headers: {\n    authorization: '610e06c9-39c0-4d40-8bb2-d76533a4e398',\n    'Content-Type': 'application/json'\n  }\n});\n\n//# sourceURL=webpack://mesto-project/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n  constructor({\n    selector\n  }, card, api, user, handleCardClick) {\n    this._selector = selector;\n    this._image = card.link;\n    this._name = card.name;\n    this._likes = card.likes;\n    this._api = api;\n    this._id = card._id;\n    this._userID = user._id;\n    this._owner = card.owner._id;\n    this._handleCardClick = handleCardClick;\n  }\n\n  _getTemplate() {\n    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);\n    return cardElement;\n  }\n\n  createCard() {\n    this._element = this._getTemplate();\n\n    const image = this._element.querySelector('.element__picture');\n\n    this.likeButton = this._element.querySelector('.element__like-button');\n    image.src = this._image;\n    image.alt = this._name;\n    this._element.querySelector('.element__text').textContent = this._name;\n    this._likeCounter = this._element.querySelector('.element__like-counter');\n\n    if (this._likes.length > 0) {\n      this._likeCounter.textContent = this._likes.length;\n    } else {\n      this._likeCounter.textContent = '0';\n    }\n\n    this._checkMyLike(this._likes);\n\n    this._setEventListeners();\n\n    if (this._owner !== this._userID) {\n      this._element.querySelector('.element__trash-button').style.display = 'none';\n    }\n\n    return this._element;\n  }\n\n  _setEventListeners() {\n    this._element.querySelector('.element__picture').addEventListener('click', () => {\n      this._handleCardClick(this._name, this._image);\n    });\n\n    this._element.querySelector('.element__like-button').addEventListener('click', () => {\n      this._likeToggler();\n    });\n\n    this._element.querySelector('.element__trash-button').addEventListener(\"click\", () => {\n      this._api.deleteCard(this._id).then(() => {\n        this._element.remove();\n      }).catch(err => console.log(err));\n    });\n  }\n\n  _likeToggler() {\n    if (this.likeButton.classList.contains(\"element__like-button_active\")) {\n      this._api.unlike(this._id).then(data => {\n        this._likeCounter.textContent = data.likes.length;\n        this.likeButton.classList.remove('element__like-button_active');\n      }).catch(err => console.log(err));\n    } else {\n      this._api.like(this._id).then(data => {\n        this._likeCounter.textContent = data.likes.length;\n        this.likeButton.classList.add('element__like-button_active');\n      }).catch(err => console.log(err));\n    }\n  }\n\n  _checkMyLike(likes) {\n    const myLike = element => element._id === this._userID;\n\n    if (likes.some(myLike)) {\n      this.likeButton.classList.add('element__like-button_active');\n    }\n  }\n\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormValidator)\n/* harmony export */ });\nclass FormValidator {\n  constructor(settings, formElement) {\n    this._formElement = formElement;\n    this._formSelector = settings.formSelector;\n    this._inputSelector = settings.inputSelector;\n    this._submitButtonSelector = settings.submitButtonSelector;\n    this._inactiveButtonClass = settings.inactiveButtonClass;\n    this._inputErrorClass = settings.inputErrorClass;\n    this._errorClass = settings.errorClass;\n    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);\n    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));\n  }\n\n  _checkInvalidInput() {\n    return this._inputList.some(inputElement => {\n      return !inputElement.validity.valid;\n    });\n  }\n\n  _toggleButtonState() {\n    if (this._checkInvalidInput(this._inputList)) {\n      this._buttonElement.classList.add(this._inactiveButtonClass);\n\n      this._buttonElement.setAttribute('disabled', '');\n    } else {\n      this._buttonElement.classList.remove(this._inactiveButtonClass);\n\n      this._buttonElement.removeAttribute('disabled');\n    }\n  }\n\n  _showInputError(inputElement, errorMessage) {\n    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);\n\n    inputElement.classList.add(this._inputErrorClass);\n    errorElement.textContent = errorMessage;\n    errorElement.classList.add(this._errorClass);\n  }\n\n  _hideInputError(inputElement) {\n    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);\n\n    inputElement.classList.remove(this._inputErrorClass);\n    errorElement.classList.remove(this._errorClass);\n    errorElement.textContent = '';\n  }\n\n  _checkInputValidity(inputElement) {\n    if (!inputElement.validity.valid) {\n      this._showInputError(inputElement, inputElement.validationMessage);\n    } else {\n      this._hideInputError(inputElement);\n    }\n  }\n\n  _setEventListeners() {\n    this._toggleButtonState();\n\n    this._inputList.forEach(inputElement => {\n      inputElement.addEventListener('keyup', () => {\n        this._checkInputValidity(inputElement);\n\n        this._toggleButtonState();\n      });\n    });\n  }\n\n  resetFormValidation() {\n    this._toggleButtonState();\n\n    this._inputList.forEach(input => {\n      this._hideInputError(input);\n    });\n  }\n\n  enableValidation() {\n    this._formElement.addEventListener('submit', evt => {\n      evt.preventDefault();\n    });\n\n    this._setEventListeners();\n  }\n\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\n  constructor(popupSelector) {\n    this._popupSelector = popupSelector;\n  }\n\n  open() {\n    this._popupSelector.classList.add('popup_opened');\n\n    document.addEventListener('keydown', this._handleEscClose);\n  }\n\n  close() {\n    this._popupSelector.classList.remove('popup_opened');\n\n    document.removeEventListener('keydown', this._handleEscClose);\n  }\n\n  _handleEscClose = evt => {\n    if (evt.key === 'Escape') {\n      this.close();\n    }\n  };\n\n  setEventListeners() {\n    this._popupSelector.addEventListener('click', evt => {\n      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {\n        this.close();\n      }\n\n      ;\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithForm)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithForm extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(popupSelector, form, handleFormSubmit) {\n    super(popupSelector);\n    this._form = form;\n    this._handleFormSubmit = handleFormSubmit;\n    this._popupSubmit = this._form.querySelector('.popup__submit-button');\n    this._inputs = this._form.querySelectorAll('.popup__input');\n  }\n\n  _getInputValues() {\n    this._formValues = {};\n\n    this._inputs.forEach(input => {\n      this._formValues[input.name] = input.value;\n    });\n\n    return this._formValues;\n  }\n\n  setInputValues(data) {\n    this._inputs.forEach(input => {\n      input.value = data[input.name];\n    });\n  }\n\n  close() {\n    super.close();\n\n    this._form.reset();\n  }\n\n  renderLoading(isLoading) {\n    if (isLoading) {\n      this._popupSubmit.textContent = 'Сохранение...';\n    } else {\n      this._popupSubmit.textContent = 'Сохранить';\n    }\n\n    ;\n  }\n\n  setEventListeners() {\n    super.setEventListeners();\n\n    this._form.addEventListener('submit', evt => {\n      evt.preventDefault();\n\n      this._handleFormSubmit(this._getInputValues());\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithImage extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(popupSelector) {\n    super(popupSelector);\n    this._popupImg = document.querySelector('.popup__image');\n    this._popupImgName = document.querySelector('.popup__image-text');\n  }\n\n  open(link, name) {\n    this._popupImg.src = link;\n    this._popupImg.alt = name;\n    this._popupImgName.textContent = name;\n    super.open();\n  }\n\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\n  constructor({\n    renderItems\n  }, containerSelector) {\n    this._renderer = renderItems;\n    this._containerSelector = containerSelector; //this._items = items;\n  }\n\n  addItem(element) {\n    this._containerSelector.prepend(element);\n  }\n\n  renderItems(items) {\n    items.forEach(item => {\n      this._renderer(item);\n    });\n  }\n\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UserInfo)\n/* harmony export */ });\n//import { data } from \"autoprefixer\";\nclass UserInfo {\n  constructor({\n    profileName,\n    profileJob,\n    profileAvatar\n  }) {\n    this._name = document.querySelector(profileName);\n    this._job = document.querySelector(profileJob);\n    this._avatar = document.querySelector(profileAvatar);\n  }\n\n  getUserInfo() {\n    const userInfo = {\n      name: this._name.textContent,\n      job: this._job.textContent,\n      avatar: this._avatar.src\n    };\n    return userInfo;\n  }\n\n  setUserInfo(data) {\n    this._name.textContent = data.name;\n    this._job.textContent = data.about;\n    this._avatar.src = data.avatar;\n  }\n\n}\n\n//# sourceURL=webpack://mesto-project/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/components/constants.js":
/*!*************************************!*\
  !*** ./src/components/constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"avatarInput\": () => (/* binding */ avatarInput),\n/* harmony export */   \"cardTemplate\": () => (/* binding */ cardTemplate),\n/* harmony export */   \"elementsList\": () => (/* binding */ elementsList),\n/* harmony export */   \"formAddCard\": () => (/* binding */ formAddCard),\n/* harmony export */   \"formAddCardButton\": () => (/* binding */ formAddCardButton),\n/* harmony export */   \"formEditAvatar\": () => (/* binding */ formEditAvatar),\n/* harmony export */   \"formEditProfile\": () => (/* binding */ formEditProfile),\n/* harmony export */   \"jobInput\": () => (/* binding */ jobInput),\n/* harmony export */   \"nameInput\": () => (/* binding */ nameInput),\n/* harmony export */   \"placeLinkInput\": () => (/* binding */ placeLinkInput),\n/* harmony export */   \"placeNameInput\": () => (/* binding */ placeNameInput),\n/* harmony export */   \"popupAddCard\": () => (/* binding */ popupAddCard),\n/* harmony export */   \"popupAddCardCloseButton\": () => (/* binding */ popupAddCardCloseButton),\n/* harmony export */   \"popupEditAvatar\": () => (/* binding */ popupEditAvatar),\n/* harmony export */   \"popupEditAvatarCloseButton\": () => (/* binding */ popupEditAvatarCloseButton),\n/* harmony export */   \"popupEditProfile\": () => (/* binding */ popupEditProfile),\n/* harmony export */   \"popupEditProfileCloseButton\": () => (/* binding */ popupEditProfileCloseButton),\n/* harmony export */   \"popupImage\": () => (/* binding */ popupImage),\n/* harmony export */   \"popupImagePic\": () => (/* binding */ popupImagePic),\n/* harmony export */   \"popupImageText\": () => (/* binding */ popupImageText),\n/* harmony export */   \"popupOpenImageCloseButton\": () => (/* binding */ popupOpenImageCloseButton),\n/* harmony export */   \"popups\": () => (/* binding */ popups),\n/* harmony export */   \"profileAddCardButton\": () => (/* binding */ profileAddCardButton),\n/* harmony export */   \"profileAvatar\": () => (/* binding */ profileAvatar),\n/* harmony export */   \"profileAvatarButton\": () => (/* binding */ profileAvatarButton),\n/* harmony export */   \"profileEditButton\": () => (/* binding */ profileEditButton),\n/* harmony export */   \"profileJob\": () => (/* binding */ profileJob),\n/* harmony export */   \"profileName\": () => (/* binding */ profileName),\n/* harmony export */   \"removeCardBtn\": () => (/* binding */ removeCardBtn),\n/* harmony export */   \"settings\": () => (/* binding */ settings)\n/* harmony export */ });\n//Данные на странице\nconst profileAvatar = document.querySelector('.profile__avatar');\nconst profileName = document.querySelector('.profile__name');\nconst profileJob = document.querySelector('.profile__job'); //Формы\n\nconst formEditProfile = document.querySelector('.popup__form_editProfile');\nconst formAddCard = document.querySelector('.popup__form_addCard');\nconst formEditAvatar = document.querySelector('.popup__form_editAvatar'); //Кнопки\n\nconst profileAvatarButton = document.querySelector('.profile__avatar-edit-button');\nconst profileEditButton = document.querySelector('.profile__edit-button');\nconst profileAddCardButton = document.querySelector('.profile__addCard-button');\nconst formAddCardButton = document.querySelector('.popup__addCardSubmit-button');\nconst popupEditAvatarCloseButton = document.querySelector('.popup_editAvatar__close-button');\nconst popupEditProfileCloseButton = document.querySelector('.popup_editProfile__close-button');\nconst popupAddCardCloseButton = document.querySelector('.popup_addCard__close-button');\nconst popupOpenImageCloseButton = document.querySelector('.popup_OpenImage__close-button'); //Попапы\n\nconst popups = document.querySelectorAll(\".popup\");\nconst popupEditAvatar = document.querySelector('.popup_editAvatar');\nconst popupEditProfile = document.querySelector('.popup_editProfile');\nconst popupAddCard = document.querySelector('.popup_addCard');\nconst popupImage = document.querySelector('.popup_openImage');\nconst popupImagePic = document.querySelector('.popup__image');\nconst popupImageText = document.querySelector('.popup__image-text'); //Инпуты\n\nconst avatarInput = document.querySelector('.popup__avatarLink-input');\nconst nameInput = document.querySelector('.popup__name-input');\nconst jobInput = document.querySelector('.popup__job-input');\nconst placeNameInput = document.querySelector('.popup__placeName-input');\nconst placeLinkInput = document.querySelector('.popup__placeLink-input'); //Карточки\n\nconst elementsList = document.querySelector('.elements__list');\nconst cardTemplate = document.querySelector('.card-template').content;\nconst removeCardBtn = document.querySelector('#removeCardBtn');\nconst settings = {\n  formSelector: '.popup__form',\n  inputSelector: '.popup__input',\n  submitButtonSelector: '.popup__submit-button',\n  inactiveButtonClass: 'popup__submit-button_inactive',\n  inputErrorClass: 'popup__input_invalid',\n  errorClass: 'popup__input-error_active'\n};\n\n//# sourceURL=webpack://mesto-project/./src/components/constants.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Api.js */ \"./src/components/Api.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _components_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/constants */ \"./src/components/constants.js\");\n\n\n\n\n\n\n\n\n\n\nlet user;\nconst userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  profileName: '.profile__name',\n  profileJob: '.profile__job',\n  profileAvatar: '.profile__avatar'\n}); //создание экземпляра класса Section\n\n/*const cardList = new Section({\r\n  renderer: (item) => renderCard(item)\r\n  },\r\n  '.elements__list'\r\n  );*/\n\nconst cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  renderItems: data => {\n    cardList.addItem(renderCard(data));\n  }\n}, _components_constants__WEBPACK_IMPORTED_MODULE_8__.elementsList); //создание экземпляра класса popupWithImage\n\nconst popupWithImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"](_components_constants__WEBPACK_IMPORTED_MODULE_8__.popupImage); //валидация\n\nconst formValidators = {};\n\nconst enableValidation = settings => {\n  const formList = Array.from(document.querySelectorAll(settings.formSelector));\n  formList.forEach(formElement => {\n    const validator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"](settings, formElement);\n    const formName = formElement.getAttribute('name');\n    formValidators[formName] = validator;\n    validator.enableValidation();\n  });\n};\n\nenableValidation(_components_constants__WEBPACK_IMPORTED_MODULE_8__.settings); //попап редактирования профиля\n\nconst popupFormEditProfile = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_components_constants__WEBPACK_IMPORTED_MODULE_8__.popupEditProfile, _components_constants__WEBPACK_IMPORTED_MODULE_8__.formEditProfile, function handleFormSubmit(data) {\n  popupFormEditProfile.renderLoading(true);\n  _components_Api_js__WEBPACK_IMPORTED_MODULE_1__.api.updateUserProfile(data.name, data.job).then(user => {\n    userInfo.setUserInfo(user);\n    popupFormEditProfile.close();\n  }).catch(err => console.log(err)).finally(() => {\n    popupFormEditProfile.renderLoading(false);\n  });\n}); //попап редактирования аватара\n\nconst popupFormEditAvatar = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_components_constants__WEBPACK_IMPORTED_MODULE_8__.popupEditAvatar, _components_constants__WEBPACK_IMPORTED_MODULE_8__.formEditAvatar, function handleFormSubmit(data) {\n  popupFormEditAvatar.renderLoading(true);\n  _components_Api_js__WEBPACK_IMPORTED_MODULE_1__.api.updateUserAvatar(data.link).then(user => {\n    userInfo.setUserInfo(user);\n    popupFormEditAvatar.close();\n  }).catch(err => console.log(err)).finally(() => {\n    popupFormEditAvatar.renderLoading(false);\n  });\n}); //попап добавления карточки\n\nconst popupFormAddCard = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](_components_constants__WEBPACK_IMPORTED_MODULE_8__.popupAddCard, _components_constants__WEBPACK_IMPORTED_MODULE_8__.formAddCard, function handleFormSubmit(data) {\n  popupFormAddCard.renderLoading(true);\n  _components_Api_js__WEBPACK_IMPORTED_MODULE_1__.api.addNewCard(data).then(res => {\n    cardList.addItem(renderCard(res), true);\n    popupFormAddCard.close();\n  }).catch(err => console.log(err)).finally(() => {\n    popupFormAddCard.renderLoading(false);\n  });\n}); //получение профиля и карточек с API\n\nPromise.all([_components_Api_js__WEBPACK_IMPORTED_MODULE_1__.api.getUser(), _components_Api_js__WEBPACK_IMPORTED_MODULE_1__.api.getInitialCards()]).then(([userData, cards]) => {\n  user = userData;\n  userInfo.setUserInfo(user);\n  cardList.renderItems(cards);\n}).catch(err => {\n  console.log(err);\n}); //создание карточек\n\nfunction renderCard(item) {\n  const newCard = new _components_Card_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n    selector: '.card-template'\n  }, item, _components_Api_js__WEBPACK_IMPORTED_MODULE_1__.api, user, handleCardClick).createCard();\n  return newCard;\n}\n\nfunction handleCardClick(name, link) {\n  popupWithImage.open(link, name);\n} //обработчики событий кнопок\n\n\n_components_constants__WEBPACK_IMPORTED_MODULE_8__.profileAvatarButton.addEventListener('click', () => {\n  popupFormEditAvatar.open();\n  formValidators['editAvatar'].resetFormValidation();\n});\n_components_constants__WEBPACK_IMPORTED_MODULE_8__.profileEditButton.addEventListener('click', () => {\n  popupFormEditProfile.open();\n  popupFormEditProfile.setInputValues(userInfo.getUserInfo());\n  formValidators['editProfile'].resetFormValidation();\n});\n_components_constants__WEBPACK_IMPORTED_MODULE_8__.profileAddCardButton.addEventListener('click', () => {\n  popupFormAddCard.open();\n  formValidators['newCard'].resetFormValidation();\n}); //обработчики событий попапов\n\npopupFormEditProfile.setEventListeners();\npopupFormEditAvatar.setEventListeners();\npopupFormAddCard.setEventListeners();\npopupWithImage.setEventListeners();\n\n//# sourceURL=webpack://mesto-project/./src/index.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto-project/./src/pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;