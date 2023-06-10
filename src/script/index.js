import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
    cards,
    validationConfig,
    popupEdit,
    popupAdd,
    profileEditButton,
    cardAddButton,
    cardsGrid
} from "./constants.js";

import '../pages/index.css';

const newSection = new Section(
    {
        cards,
        renderer: (item) => {
            newSection.addItem(createCard(item));
        },
    },
    cardsGrid
);


const popupAddPlace = new PopupWithForm(".popup_add-place", addFormSubmit);
popupAddPlace.setEventListeners();
const popupEditProfile = new PopupWithForm(".popup_edit-profile", editFormSubmit);
popupEditProfile.setEventListeners();
const popupImageClass = new PopupWithImage(".popup_image");
popupImageClass.setEventListeners();
const userInfo = new UserInfo({
    nameProfileSelector: ".profile__title",
    infoProfileSelector: ".profile__subtitle",
});

const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);
popupAddValidation.enableValidation();
popupEditValidation.enableValidation();

const addCard = () => {
    newSection.renderCard();
};

function createCard(item) {
    const card = new Card(item, "#element-card", () =>
        popupImageClass.open(item)
    );
    return card.generateCard();
}

function addFormSubmit(evt, items) {
    evt.preventDefault();
    newSection.addItem(createCard({ name: items.place_name, link: items.place_link }));
    popupAddPlace.close();
}

function editFormSubmit(evt, items) {
    evt.preventDefault();
    userInfo.setUserInfo(items);
    popupEditProfile.close();
}

cardAddButton.addEventListener("click", () => {
    popupAddPlace.open();
});

profileEditButton.addEventListener("click", () => {
    popupEditProfile.open();
    popupEditProfile.setInputValues(userInfo.getUserInfo());
});

addCard();