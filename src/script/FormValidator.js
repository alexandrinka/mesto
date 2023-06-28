export class FormValidator {
    constructor(selectorsForm, formElement) {
        this._formSelector = selectorsForm.formSelector;
        this._inputSelector = selectorsForm.inputSelector;
        this._submitButtonSelector = selectorsForm.submitButtonSelector;
        this._inactiveButtonClass = selectorsForm.inactiveButtonClass;
        this._inputErrorClass = selectorsForm.inputErrorClass;
        this._errorClass = selectorsForm.errorClass;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableButton(this._submitButton);
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _disableButton(submitButton) {
        submitButton.classList.add(this._inactiveButtonClass);
        submitButton.disabled = true;
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(this._inputList, this._submitButton);

        this._formElement.addEventListener('reset', () => {
            this._disableButton(this._submitButton)
        });

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (e) => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._submitButton);
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}