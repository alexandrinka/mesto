export default class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._popupCloseBtn = this._popup.querySelector(".popup__close");
        this._boundHandlerEscClose = this._handleEscClose.bind(this);
        this._boundHandlerCloseByOverlay = this._handleCloseByOverlay.bind(this);
        this._boundHandlerClose = this.close.bind(this);
    }

    _handleEscClose = (evt) => {
        evt.key === "Escape" && this.close();
      };
    
      _handleCloseByOverlay = (evt) => {
        evt.target.classList.contains("popup") && this.close();
      };
    
      setEventListeners() {
        document.addEventListener("keydown", this._handleEscClose);
        this._popup.addEventListener("click", this._handleCloseByOverlay);
        this._popupCloseBtn.addEventListener("click", this.close);
      }
    
      open() {
        this._popup.classList.add("popup_opened");
        this.setEventListeners();
      }
    
      close = () => {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
      };
}