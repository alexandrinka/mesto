import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector, onSubmit) {
    super(selector);
    this._onSubmit = onSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  _onSubmitHandler = (evt) => {
    this._onSubmit(evt, { cardId: this._cardId, card: this._card });
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._onSubmitHandler);
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
}
