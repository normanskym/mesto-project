//import { data } from "autoprefixer";

export default class UserInfo {
    constructor({ profileName, profileJob, profileAvatar }) {
      this._name = document.querySelector(profileName);
      this._job = document.querySelector(profileJob);
      this._avatar = document.querySelector(profileAvatar);
    }
  
    getUserInfo() {
      const userInfo = {
        name: this._name.textContent,
        job: this._job.textContent,
        avatar: this._avatar.src
      };
      return userInfo;
    }
  
    setUserInfo(data) {
      this._name.textContent = data.name;
      this._job.textContent = data.about;
      this._avatar.src = data.avatar;
    }
  }