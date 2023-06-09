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
        const formValues = {};
        this._fieldList.forEach(input => formValues[input.name] = input.value);
        return formValues;
    }

    _onSubmitHandler = (evt) => {
        this._onSubmit(evt, this._getInputValues(evt))
    };

    setInputValues(fieldValues) {
        if (fieldValues != null) {
            this._fieldList.forEach((input) => { 
                if(input.name == "profile_name")  input.value = fieldValues.name;
                if(input.name == "profile_info")  input.value = fieldValues.info;
            });
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", this._onSubmitHandler);
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}