export default class UserInfo {
    constructor({ nameProfileSelector, infoProfileSelector, avatarProfileSelector }) {
        this._userName = document.querySelector(nameProfileSelector);
        this._userInfo = document.querySelector(infoProfileSelector);
        this._userAvatar = document.querySelector(avatarProfileSelector);
        this._userId = "";
    }

    getUserInfo() {
        return { 
        "name": this._userName.textContent, 
        "about": this._userInfo.textContent, 
        "userId": this._userId,};
    }

    setUserInfo(inputValues) {
        this._userName.textContent = inputValues.name;
        this._userInfo.textContent = inputValues.about;
        this._userAvatar.src = inputValues.avatar;
        this._userId = inputValues._id;
    }
}