//ДОБАВЛЕНИЕ КАРТОЧЕК НА СТРАНИЦУ

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

const placeTemplate = document.querySelector('#element-card').content;

function createCard(item) {
    const placeElement = placeTemplate.querySelector('.elements__list-item').cloneNode(true);
    const cardImage = placeElement.querySelector('.elements__img');
    cardImage.src = item['link'];
    cardImage.alt = item['name'];
    placeElement.querySelector('.elements__name').textContent = item['name'];

    const popupOpenImage = document.querySelector('.popup_image');
    const popupImage = document.querySelector('.popup__image');
    const popupSignature = document.querySelector('.popup__signature');

    placeElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__heart_active');
    });
    placeElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
        placeElement.remove();
    });
    cardImage.addEventListener('click', function (evt) {
        openPopup(popupOpenImage);
        popupImage.src = item['link'];
        popupImage.alt = item['name'];
        popupSignature.textContent = item['name'];
    });
    return placeElement;
}

for (let i = 0; i < cards.length; i++) {
    const placeElement = createCard(cards[i]);
    list.append(placeElement);
}

//ОТКРЫТИЕ POPUP

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//ЗАКРЫТИЕ POPUP

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//POPUP-РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const btnOpenPopupProfile = document.querySelector('.profile__symbol-edit');
const popupProfile = document.querySelector('.popup_edit-profile');
const fieldProfileName = document.querySelector('.popup__field_type_name');
const fieldProfileAboutMe = document.querySelector('.popup__field_type_about-me');
const profileForm = document.forms['popup__form_edit-profile'];
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
const fiekdPlaceName = document.querySelector('.popup__field_type_name-place');
const fieldplaceLink = document.querySelector('.popup__field_type_link');
const placeForm = document.querySelector('.popup__form_add-place');
const btnHeart = document.querySelector('.elements__heart');

const openPopupPlace = () => {
    openPopup(popupPlace);
};

const savePlace = (event) => {
    event.preventDefault();

    const cardForCreate = {
        name: fiekdPlaceName.value,
        link: fieldplaceLink.value
    };

    fiekdPlaceName.value = "";
    fieldplaceLink.value = "";

    const placeElement = createCard(cardForCreate);
    list.prepend(placeElement);

    closePopup(popupPlace);
};

btnOpenPopupPlace.addEventListener('click', openPopupPlace);

placeForm.addEventListener('submit', savePlace);