export class Card {
    constructor(cards, templateSelector) {
        this._name = cards.name;
        this._link = cards.link;
        this._templateSelector = templateSelector;
        this._cardImage = '.elements__img';
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__list-item')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners(cardImage) {
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._element.remove();
        });

        this._element.querySelector('.elements__heart').addEventListener('click', function (evt) {
            evt.target.classList.toggle('elements__heart_active');
        });

        cardImage.addEventListener('click', (evt) => {
            const popup = document.querySelector('.popup_image');
            popup.classList.add('popup_opened');
            document.addEventListener('keydown', () => {
                if (evt.key === 'Escape') {
                    const openedPopup = document.querySelector('.popup_opened');
                    closePopup(openedPopup);
                }
            });
            document.querySelector('.popup__image').src = this._link;
            document.querySelector('.popup__image').alt = this._name;
            document.querySelector('.popup__signature').textContent = this._name;
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector(this._cardImage);

        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.elements__name').textContent = this._name;

        this._setEventListeners(cardImage);

        return this._element;
    }
}