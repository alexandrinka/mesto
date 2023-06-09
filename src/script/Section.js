export default class Section {
    constructor({cards, renderer}, cardsGrid) {
        this._renderedItems = cards;
        this._renderer = renderer;
        this._container = cardsGrid;
    }

    renderCard() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._container.prepend(element);
    }
}