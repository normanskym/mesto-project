export default class UserInfo {
    constructor({ profileName, profileJob, profileId, profileAvatar }) {
      this._profileId = profileId;
      this._profileAvatar = profileAvatar;
      this._name = profileName;
      this._job = profileJob;
    }
  
    getUserInfo() {
      const userInfo = {
        name: this._name.textContent,
        job: this._job.textContent,
      };
      return userInfo;
    }
  
    setUserInfo(userInfo) {
      this._name.textContent = userInfo.name;
      this._job.textContent = userInfo.job;
    }
  
    setUserAvatar(data) {
      this._profileAvatar.src = data.avatar;
    }
  }