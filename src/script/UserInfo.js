export default class UserInfo {
    constructor({ nameProfileSelector, infoProfileSelector }) {
        this._userName = document.querySelector(nameProfileSelector);
        this._userInfo = document.querySelector(infoProfileSelector);
    }

    getUserInfo() {
        return { "name": this._userName.textContent, "info": this._userInfo.textContent };
    }

    setUserInfo(inputValues) {
        this._userName.textContent = inputValues.profile_name;
        this._userInfo.textContent = inputValues.profile_info;
    }
}