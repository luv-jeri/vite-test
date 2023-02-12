import '../../styles/modal.css';

class Modal {
  constructor({ title }) {
    this.content = '';
    this.title = title;

    this._open = this._open.bind(this);
    this._close = this._close.bind(this);

    this.render();
  }

  _open = () => {
    console.log('hello', this.modal);
    this.modalContent.replaceChildren(this.content);
    this.modal.style.display = 'flex';
  };

  _close = () => {
    this.modal.style.display = 'none';
  };

  render = () => {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.style.display = 'none';

    const modalInner = document.createElement('div');
    modalInner.classList.add('modal__inner');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal__header');

    const modalClose = document.createElement('button');
    modalClose.classList.add('close__modal');
    modalClose.addEventListener('click', this._close);
    modalClose.textContent = 'X';

    const modalTitle = document.createElement('h4');
    modalTitle.classList.add('modal__title');
    modalTitle.textContent = this.title || 'Hey!';
    modalHeader.append(modalTitle, modalClose);

    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal__content');

    modalInner.append(modalHeader, this.modalContent);

    this.modal.append(modalInner);

    document.getElementById('main').append(this.modal);
  };
}

export default Modal;
