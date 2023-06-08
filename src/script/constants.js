export const cards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

export const popupEdit = document.querySelector(".popup_edit-profile");
export const popupAdd = document.querySelector(".popup_add-place");

const profile = document.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__symbol-edit");
export const cardAddButton = profile.querySelector(".profile__add-button");

export const cardsGrid = document.querySelector(".elements__list");