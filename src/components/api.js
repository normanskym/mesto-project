const config = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
    headers: {
      authorization: "610e06c9-39c0-4d40-8bb2-d76533a4e398",
      "Content-Type": "application/json",
    }
};
  
export function checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers,
    }).then(checkResult);
};
  
export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers,
    }).then(checkResult);
};
  
export const updateUserProfile = (profileData) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(profileData),
    }).then(checkResult);
};

export const updateUserAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(avatar),
    }).then(checkResult);
};
  
export const addNewCard = (cardAttribute) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(cardAttribute),
    }).then(checkResult);
};
  
export const like = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then(checkResult);
};
  
export const unlike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResult);
};
  
export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(checkResult);
};