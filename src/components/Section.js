export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
    this._items = items.reverse();
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }
}