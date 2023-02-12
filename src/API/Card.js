import Loader from './loader.js';

class Card {
  constructor({ name, type, gender, age, description, fee, image, color, onClick }) {
    this.id = Math.floor(Math.random() * 1000000);
    this.name = name;
    this.type = type;
    this.age = age;
    this.gender = gender;
    this.description = description;
    this.fee = fee;
    this.image = image;
    this.onClick = onClick;
    this.color = color;
  }

  get element() {
    const card = document.createElement('div');
    const name = document.createElement('h2');
    const price = document.createElement('p');
    const imageDiv = document.createElement('div');
    const image = document.createElement('img');

    const loader = new Loader().element

    imageDiv.append(image);
    imageDiv.append(loader);
    imageDiv.classList.add('image');

    card.id = this.id;
    card.classList.add('card');

    card.style.transform = `rotate(${Math.floor(Math.random() * 20 - 10)}deg)`;

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.1) rotate(0deg)';
      image.style.transform = 'scale(1.3)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `scale(1) rotate(${Math.floor(Math.random() * 20 - 10)}deg)`;
      image.style.transform = 'scale(1)';
    });

    card.addEventListener('click', () => {
      this.onClick({ ...this });
    });

    name.textContent = this.name;
    price.textContent = this.fee;
    image.src = this.image;
    image.alt = this.name;

    image.addEventListener('load', () => {
      loader.style.display = 'none';
      image.style.display = 'block';
    });

    card.append(name, imageDiv, price);

    return card;
  }
}

export default Card;
