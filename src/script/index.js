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


const popupAddPlace = new PopupWithForm(".popup_add-place", addFormSubmit);
const popupEditProfile = new PopupWithForm(".popup_edit-profile", editFormSubmit);
const popupImageClass = new PopupWithImage(".popup_image");
const userInfo = new UserInfo({
    nameProfileSelector: ".profile__title",
    infoProfileSelector: ".profile__subtitle",
});

const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);
popupAddValidation.enableValidation();
popupEditValidation.enableValidation();

const addCard = (items) => {
    const newCard = new Section(
        {
            items,
            renderer: (item) => {
                const card = new Card(item, "#element-card", () =>
                    popupImageClass.open(item)
                );
                const cardElement = card.generateCard();
                newCard.addItem(cardElement);
            },
        },
        cardsGrid
    );
    newCard.renderCard();
};

function addFormSubmit(evt, items) {
    evt.preventDefault();
    addCard([{name: items[0], link: items[1]}]);
    popupAddValidation.enableValidation();
    popupAddPlace.close();
}

function editFormSubmit(evt, items) {
    evt.preventDefault();
    userInfo.setUserInfo(items);
    popupEditProfile.close();
}

cardAddButton.addEventListener("click", () => {
    popupAddPlace.open();
    popupAddValidation.enableValidation();
});

profileEditButton.addEventListener("click", () => {
    popupEditProfile.open(userInfo.getUserInfo());
    popupEditValidation.enableValidation();
});

addCard(cards);