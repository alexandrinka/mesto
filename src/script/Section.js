export default class Section {
    constructor({renderer}, itemsGrid) {
        this._renderer = renderer;
        this._container = itemsGrid;
    }

    renderItem(items) {
        items.forEach(item => {
            this.addItem(item);
        })
    }

    addItem(element) {
        const item = this._renderer(element);
        this._container.prepend(item);
    }
}