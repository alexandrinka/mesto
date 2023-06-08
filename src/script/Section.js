export default class Section {
    constructor({items, renderer}, selector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = selector;
    }

    renderCard() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._container.prepend(element);
    }
}