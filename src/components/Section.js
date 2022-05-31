export default class Section {
  constructor({ renderItems }, containerSelector) {
    this._renderer = renderItems;
    this._containerSelector = containerSelector;
    //this._items = items;
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }
}