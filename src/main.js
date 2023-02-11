import '../styles/index.css';
import '../styles/media/mobile.css';
import Card from './API/Card';
import genData from './constants/dummy.data';
import List from './API/List';

// add preloader
for (let i = 0; i < 100; i++) {
  var link = document.createElement('link');
  const linkPreconnect = document.createElement('link');
  linkPreconnect.rel = 'preconnect';
  link.rel = 'preload';
  link.href = `https://placedog.net/500/500?random=${i})}`;
  link.as = 'image';
  linkPreconnect.href = 'https://placedog.net';
  document.head.appendChild(link);
}

new List({
  target: document.querySelector('#list'),
  onLoad: async () => {
    const data = await genData();
    return data;
  },
  element: Card,
  onEnd: async () => {
    const data = await genData();
    return data;
  },
});
