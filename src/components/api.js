export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._token = data.token;
  }

  //Проверка результата запроса, обработка ошибки
  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Загрузка изначальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      }
    }).then((res) => this._checkResult(res));
  }

  //Получение информации о пользователе
  getUser() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this.headers
    }).then((res) => this._checkResult(res));
  }

  //Изменение данных профиля
  updateUserProfile (data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      })
    }).then((res) => this._checkResult(res));
  }

  //Обновление аватара
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
    }).then((res) => this._checkResult(res));
  }

  //Добавление карточки
  addNewCard (data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResult(res));
  }

  //Лайк карточки
  like(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "PUT",
      headers: this.headers
    }).then((res) => this._checkResult(res));
  }

  //Удаление лайка карточки
  unlike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "DELETE",
      headers: this.headers
    }).then((res) => this._checkResult(res));
  }

  //Удаление карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: "DELETE",
      headers: this.headers
    }).then((res) => this._checkResult(res));
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '610e06c9-39c0-4d40-8bb2-d76533a4e398',
    'Content-Type': 'application/json'
  }
});