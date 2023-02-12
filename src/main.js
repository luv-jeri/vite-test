import '../styles/index.css';
import '../styles/media/mobile.css';
import '../styles/pet_card.css';

import Card from './API/Card';
import genData from './constants/dummy.data';
import List from './API/List';
import Modal from './API/Modal';
import modalContentGen from './generators/modalContent.gen';

const modal = new Modal({
  title: 'Pet me.',
});

new List({
  target: document.querySelector('#list'),
  onLoad: async () => {
    const data = await genData();
    return data;
  },
  element: (props) => {
    const card = new Card({
      ...props,
      onClick: () => {
        modal.content = modalContentGen(props);
        modal._open();
      },
    });
    return card.element;
  },
  onEnd: async () => {
    const data = await genData();
    return data;
  },
});
