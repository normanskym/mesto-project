export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Проверка результата запроса, обработка ошибки
  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Загрузка изначальных карточек
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._checkResult(res));
  }

  //Получение информации о пользователе
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._checkResult(res));
  }

  //Изменение данных профиля
  updateUserProfile (name, job) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      })
    }).then((res) => this._checkResult(res));
  }

  //Обновление аватара
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => this._checkResult(res));
  }

  //Добавление карточки
  addNewCard = (data) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.placeName,
        link: data.placeLink,
      }),
    }).then((res) => this._checkResult(res));
  }

  //Лайк карточки
  like(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data}`, {
      method: "PUT",
      headers: this._headers
    }).then((res) => this._checkResult(res));
  }

  //Удаление лайка карточки
  unlike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._checkResult(res));
  }

  //Удаление карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._checkResult(res));
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '610e06c9-39c0-4d40-8bb2-d76533a4e398',
    'Content-Type': 'application/json'
  }
});