export class Card {
    constructor(cards, templateSelector) {
        this._name = cards.name;
        this._link = cards.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__list-item')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._element.remove();
        });

        this._element.querySelector('.elements__heart').addEventListener('click', function (evt) {
            evt.target.classList.toggle('elements__heart_active');
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__img').src = this._link;
        this._element.querySelector('.elements__img').alt = this._name;
        this._element.querySelector('.elements__name').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}