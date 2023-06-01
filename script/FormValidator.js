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

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(buttonElement);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _disableButton(submitButton) {
        submitButton.classList.add(this._inactiveButtonClass);
        submitButton.disabled = true;
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);

        this._formElement.addEventListener('reset', () => {
            this._disableButton(buttonElement)
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (e) => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
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