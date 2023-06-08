export class Card {
    constructor(cards, templateSelector, handleCardClick) {
        this._name = cards.name;
        this._link = cards.link;
        this._templateSelector = templateSelector;
        this._cardImage = '.elements__img';
        this._onOpenPopup = handleCardClick;
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

        this._cardImage.addEventListener('click', () => {
            this._onOpenPopup({ name: this._name, link: this._link });
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__img');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.elements__name').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}