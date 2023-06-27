export class Card {
    constructor({ name, link, likes, _id, owner }, templateSelector, handleCardClick, handleTrashClick, userId, handleLike) {
        this._name = name;
        this._link = link;
        this._cardId = _id;
        this._likes = likes.length;
        this._templateSelector = templateSelector;
        this._cardImage = '.elements__img';
        this._onOpenPopup = handleCardClick;
        this._isUserCard = owner._id === userId;
        this._onOpenPopupDeleteCard = handleTrashClick;
        this._handleLike = handleLike;
        this._isLiked = likes.some((like) => userId === like._id);
    }

    getCardInfo() {
        return { cardId: this._cardId, isLiked: this._isLiked };
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__list-item')
            .cloneNode(true);

        return cardElement;
    }

    _handleDeleteCard = () => {
        this._onOpenPopupDeleteCard(this._cardId, this._element);
    };

    updateLike(data) {
        if (this._isLiked) {
            this._removeLike(data);
        } else {
            this._addLike(data);
        }
    }

    _removeLike(data) {
        this._like.classList.remove("elements__heart_active");
        this._cardCountLike.textContent = data.likes.length;
        this._isLiked = false;
    }

    _addLike(data) {
        this._like.classList.add("elements__heart_active");
        this._cardCountLike.textContent = data.likes.length;
        this._isLiked = true;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._onOpenPopup({ name: this._name, link: this._link });
        });

        this._likeButton = this._element.querySelector('.elements__heart');
        this._likeButton.addEventListener("click", () => this._handleLike(this));

        if (this._isUserCard) {
            this._deleteButton.addEventListener("click", this._handleDeleteCard);
        } else {
            this._deleteButton.remove();
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__img');
        this._cardCountLike = this._element.querySelector('.elements__count-like');
        this._deleteButton = this._element.querySelector(".elements__trash");
        this._cardCountLike.textContent = this._likes;
        this._like = this._element.querySelector('.elements__heart');

        if (this._isLiked) {
            this._element.querySelector(".elements__heart").classList.add("elements__heart_active");
        }

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.elements__name').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}