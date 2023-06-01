import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const cards = [
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

const list = document.querySelector('.elements__list');
const popups = document.querySelectorAll('.popup');

const selectorsForm =
{
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

//ГЕНЕРАЦИЯ КАРТОЧЕК

function createCard(item) {
    const card = new Card(item, '#element-card');
    const cardElement = card.generateCard();
    return cardElement;
}

cards.forEach((cardItem) => {
    const cardElement = createCard(cardItem);
    list.append(cardElement);
});

//ОТКРЫТИЕ POPUP

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

//ЗАКРЫТИЕ POPUP

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
})

//POPUP-РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const btnOpenPopupProfile = document.querySelector('.profile__symbol-edit');
const popupProfile = document.querySelector('.popup_edit-profile');
const fieldProfileName = document.querySelector('.popup__field_type_name');
const fieldProfileAboutMe = document.querySelector('.popup__field_type_about-me');
const profileForm = document.forms["popup__form_edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const openPopupProfile = () => {
    openPopup(popupProfile);
    fieldProfileName.value = profileTitle.textContent;
    fieldProfileAboutMe.value = profileSubtitle.textContent;
};

const handleProfileFormSubmit = (event) => {
    event.preventDefault();

    profileTitle.textContent = fieldProfileName.value;
    profileSubtitle.textContent = fieldProfileAboutMe.value;

    closePopup(popupProfile);
};

btnOpenPopupProfile.addEventListener('click', openPopupProfile);

profileForm.addEventListener('submit', handleProfileFormSubmit);


//POPUP-ДОБАВЛЕНИЕ МЕСТА

const btnOpenPopupPlace = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_add-place');
const fieldPlaceName = document.querySelector('.popup__field_type_name-place');
const fieldplaceLink = document.querySelector('.popup__field_type_link');
const placeForm = document.forms["popup__form_add-place"];

const openPopupPlace = () => {
    openPopup(popupPlace);
};

const savePlace = (event) => {
    event.preventDefault();

    const cardForCreate = {
        name: fieldPlaceName.value,
        link: fieldplaceLink.value
    };

    event.target.reset();

    const cardElement = createCard(cardForCreate);
    list.prepend(cardElement);

    closePopup(popupPlace);

};

btnOpenPopupPlace.addEventListener('click', openPopupPlace);

placeForm.addEventListener('submit', savePlace);


//ВАЛИДАЦИЯ

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
    const validation = new FormValidator(selectorsForm, formElement);
    validation.enableValidation();
});