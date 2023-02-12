import Loader from './loader.js';

class List {
  constructor({ element, target, init, onLoad, onEnd, onScroll }) {
    //? check if target is a DOM element
    if (!(target instanceof HTMLElement)) {
      throw new Error('Target is not a DOM element');
    }

    this.element = element;
    this.target = target;
    this.target.classList.add('listEl');

    this.onEnd = onEnd;
    this.onScroll = onScroll;
    this.observers = [this.render.bind(this)];
    this.data = init ? this.initialize(init) : [];

    this._appendLoader(this.target);

    if (onEnd) {
      this.onEnd = onEnd;
      this._onEnd();
    }

    if (onLoad) {
      this.onLoad = onLoad;
      return this._onLoad();
    }

    this.render();
  }

  _appendLoader = (el) => {
    const loader = new Loader().element;
    el.append(loader);
    // document.getElementById("logo").insertAdjacentElement('afterend', loader);
  };

  async _callFunction(fn, cb) {
    if (typeof fn !== 'function') {
      throw new Error('Is not a function');
    }

    let data = fn();

    if (data instanceof Promise) {
      data = await data;
    }

    if (data) {
      if (!Array.isArray(data)) {
        throw new Error('onLoad does not return an array');
      }
      cb && cb(data);
      return (this.data = data);
    }
  }

  _appendElements = (data) => {
    const _data = data || this.data;
    _data.forEach((item) => {
      if (!item) return;

      if (item instanceof HTMLElement) {
        return this.target.prepend(item);
      }

      if (typeof this.element === 'function') {
        const element = this.element(item);
        return this.target.prepend(element);
      }
    });
  };

  initialize = (init) => {
    if (!Array.isArray(init)) {
      throw new Error('Init is not an array');
    }

    return init;
  };

  subcribe = (observer) => {
    if (typeof observer !== 'function') {
      throw new Error('Observer is not a function');
    }

    this.observers.push(observer);
  };

  unsubcribe = (observer) => {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  };

  _fire = () => {
    this.observers.forEach((observer) => observer(this.data));
  };

  _onLoad = async () => {
    const data = await this._callFunction(this.onLoad);
    this.render(data);
  };

  _onEnd = async () => {
    this.target.addEventListener('scroll', async (event) => {
      const { scrollTop, scrollHeight, clientHeight } = this.target;

      const isAtEnd = scrollTop + clientHeight >= scrollHeight - 1000;

      if (isAtEnd) {
        const data = await this._callFunction(this.onEnd);
        console.log('data', data);
        this.data = [...this.data, ...data];
        this._appendElements(data);
      }
    });
  };

  set list_data(data) {
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
    this._data = data;
    this._fire();
  }

  fire() {
    this.observers.forEach((observer) => observer(this.data));
  }

  render(_data, _target) {
    console.log('rendering list', this.target, _target);
    const data = _data || this.data;
    const target = _target || this.target;

    // target.innerHTML = '';
    console.log('rendering list');

    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }

    if (data.length === 0) {
      return (target.innerHTML += `
             <h1>Opps, Nothing to show 🥲</h1>
        `);
    }

    this._appendElements();
  }
}

export default List;
