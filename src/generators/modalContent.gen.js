import Loader from '../API/loader';

const rowGen = (label, value) => {
  const row = document.createElement('tr');
  const labelCell = document.createElement('td');
  labelCell.textContent = label;
  const valueCell = document.createElement('td');
  valueCell.textContent = value;

  row.append(labelCell, valueCell);

  return row;
};

const modalContentGen = (data) => {
  const content = document.createElement('div');
  content.classList.add('pet__content');

  const loader = new Loader().element;

  const pet__left = document.createElement('div');
  pet__left.classList.add('pet__left');

  const pet__right = document.createElement('div');
  pet__right.classList.add('pet__right');

  const pet__image = document.createElement('img');
  pet__image.src = data.image;
  pet__image.alt = data.name;
  pet__image.addEventListener('load', () => {
    loader.style.display = 'none';
    pet__image.style.display = 'block';
  });

  const pet__name = document.createElement('h2');
  pet__name.textContent = data.name;

  pet__left.append(pet__image, loader, pet__name);

  const pet__profile = document.createElement('h4');
  pet__profile.textContent = 'Pet Profile Card';

  const pet__details = document.createElement('table');
  pet__details.classList.add('pet__details');

  for (const key in data) {
    if (key !== 'image' && key !== 'name') {
      const row = rowGen(key, data[key]);
      pet__details.append(row);
    }
  }

  pet__right.append(pet__profile, pet__details);

  content.append(pet__left, pet__right);

  return content;
};

export default modalContentGen;
