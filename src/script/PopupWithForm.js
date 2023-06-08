import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, onSubmit) {
        super(selector);
        this._onSubmit = onSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._fieldList = Array.from(
            this._popupForm.querySelectorAll(".popup__field")
        );
    }

    _getInputValues() {
        return this._fieldList.map((input) => input.value);
    }

    _onSubmitHandler = (evt) => {
        this._onSubmit(evt, this._getInputValues(evt))
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", this._onSubmitHandler);
    }

    open(fieldValues) {
        super.open();
        console.log(fieldValues);
        if (fieldValues != null) {
            this._fieldList.forEach((input, index) => {
                input.value = fieldValues[index];
            });
        }
        else {
            this._fieldList.forEach((input) => {
                input.value = "";
            });
        }
    }

    close() {
        super.close();
        console.log(123);
        this._popupForm.reset();
    }
}