export default class Section {
    constructor({renderer}, cardsGrid) {
        this._renderer = renderer;
        this._container = cardsGrid;
    }

    renderCard(items) {
        items.forEach(item => {
            this.addItem(item);
        })
    }

    addItem(element) {
        const item = this._renderer(element);
        this._container.prepend(item);
    }
}