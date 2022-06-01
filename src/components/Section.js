export default class Section {
  constructor({ renderItems }, container) {
    this._renderer = renderItems;
    this._container = container;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }
}