import '../pages/index.css';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Api from './Api.js';
import PopupWithImage from "./PopupWithImage.js";
import PopupDeleteElement from "./PopupDeleteElement.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
    validationConfig,
    popupEdit,
    popupAdd,
    popupUpdateProfile,
    profileEditButton,
    cardAddButton,
    avatarImage,
    cardsGrid,
    address,
    token
} from "./constants.js";

const api = new Api({
    address,
    token,
});

const popupAddPlace = new PopupWithForm(".popup_add-place", addFormSubmit);
popupAddPlace.setEventListeners();

const popupEditProfile = new PopupWithForm(".popup_edit-profile", editFormSubmit);
popupEditProfile.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(".popup_update-avatar", updateAvatarForm);
popupUpdateAvatar.setEventListeners();

const popupDeleteCard = new PopupDeleteElement(".popup_delete-card", deleteCard);
popupDeleteCard.setEventListeners();

const popupImageClass = new PopupWithImage(".popup_image");
popupImageClass.setEventListeners();

const userInfo = new UserInfo({
    nameProfileSelector: ".profile__title",
    infoProfileSelector: ".profile__subtitle",
    avatarProfileSelector: ".profile__avatar",
});

const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);
const popupUpdateProfileValidation = new FormValidator(validationConfig, popupUpdateProfile);
popupAddValidation.enableValidation();
popupEditValidation.enableValidation();
popupUpdateProfileValidation.enableValidation();

const cardsContainer = new Section(
    { renderer: (item) => createCard(item) },
    cardsGrid
);

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        cardsContainer.renderItem(cards.reverse());
    })
    .catch((err) =>
        console.log(`Получение данных карточек и пользователя: ${err}`)
    );

function createCard(item) {
    const card = new Card(
        item,
        "#element-card",
        () => popupImageClass.open(item),
        (cardId, card) => popupDeleteCard.open(cardId, card),
        userInfo.getUserInfo().userId,
        likeCard
    );
    return card.generateCard();
}

function addFormSubmit(evt, items) {
    evt.preventDefault();
    popupAddPlace.renderLoading(true);
    api.createCard(items)
        .then((data) => {
            cardsContainer.addItem(data);
            popupAddPlace.close();
        })
        .catch((err) => console.log(`Добавление карточки: ${err}`))
        .finally(() => {
            popupAddPlace.renderLoading(false, "Сохранить");
        });
}

function editFormSubmit(evt, items) {
    evt.preventDefault();
    popupEditProfile.renderLoading(true);
    api.updateInfoUser(items)
        .then((data) => {
            popupEditProfile.close();
            userInfo.setUserInfo(data);
        })
        .catch((err) => console.log(`Изменение данных пользователя: ${err}`))
        .finally(() => {
            popupEditProfile.renderLoading(false, "Сохранить");
        });
}

function deleteCard(evt, { itemId, item }) {
    evt.preventDefault();
    api
        .deleteCard(itemId)
        .then(() => {
            item.deleteCard();
            popupDeleteCard.close();
        })
        .catch((err) => {
            console.log(`Ошибка при удалении карточки: ${err}`);
        });
}

function likeCard(card) {
    console.log(card);
    api
        .likeCard(card.getCardInfo())
        .then((res) => card.updateLike(res))
        .catch((err) => console.log(`Ошибка обновления лайка: ${err}`));
}

function updateAvatarForm(evt, { link }) {
    evt.preventDefault();
    popupUpdateAvatar.renderLoading(true);
    api.updateAvatar(link)
        .then((data) => {
            userInfo.setUserInfo(data);
            popupUpdateAvatar.close();
        })
        .catch((err) => console.log(`Изменение изображения пользователя: ${err}`))
        .finally(() => {
            popupUpdateAvatar.renderLoading(false, "Сохранить");
        });
}

cardAddButton.addEventListener("click", () => {
    popupAddPlace.open();
});

profileEditButton.addEventListener("click", () => {
    popupEditProfile.open();
    popupEditProfile.setInputValues(userInfo.getUserInfo());
});

avatarImage.addEventListener("click", () => {
    popupUpdateAvatar.open();
});