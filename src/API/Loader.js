class Loader {
  constructor() {
    this.loader = document.createElement('div');
    this.loader.innerHTML = `<div class="spinner"></div>`;

    this.loader.classList.add('loader');

    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
  }

  _show = () => {
    this.loader.style.display = 'block';
  };

  _hide = () => {
    this.loader.style.display = 'none';
  };

  get element() {
    return this.loader;
  }
}

export default Loader;
