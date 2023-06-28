import Popup from './Popup.js';

export default class PopupDeleteElement extends Popup {
  constructor(selector, onSubmit) {
    super(selector);
    this._onSubmit = onSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  _onSubmitHandler = (evt) => {
    this._onSubmit(evt, { itemId: this._id, item: this._item });
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._onSubmitHandler);
  }

  open(itemId, item) {
    super.open();
    this._id = itemId;
    this._item = item;
  }
}
