const popup = document.querySelector('.popup_image');
const popupImage = document.querySelector('.popup__image');
const popupSignature = document.querySelector('.popup__signature');
import {openPopup} from './index.js';

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

    _setEventListeners() {
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._element.remove();
        });

        this._element.querySelector('.elements__heart').addEventListener('click', function (evt) {
            evt.target.classList.toggle('elements__heart_active');
        });

        this._cardImage.addEventListener('click', (evt) => {
            openPopup(popup);
            popupImage.src = this._link;
            popupImage.alt = this._name;
            popupSignature.textContent = this._name;            
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__img');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.elements__name').textContent = this._name;

        this._setEventListeners()  ;

        return this._element;
    }
}