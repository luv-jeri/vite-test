export default () => {
  const pets = [];

  const names = [
    'Max',
    'Charlie',
    'Buddy',
    'Rocky',
    'Luna',
    'Daisy',
    'Sadie',
    'Molly',
    'Maggie',
    'Bailey',
  ];
  const types = ['dog', 'cat', 'hamster', 'rabbit', 'bird', 'fish', 'ferret', 'turtle'];
  const genders = ['male', 'female'];
  const colors = [
    'black',
    'white',
    'brown',
    'gray',
    'gold',
    'silver',
    'orange',
    'yellow',
  ];
  const descriptions = [
    'Friendly and playful',
    'Quiet and well-behaved',
    'Likes to play and cuddle',
    'Active and energetic',
    'Independent and curious',
    'Loyal and affectionate',
    'Gentle and relaxed',
    'Friendly and outgoing',
    'Playful and silly',
  ];

  for (let i = 0; i < 20; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const age = Math.floor(Math.random() * 10 + 1);
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const fee = Math.floor(Math.random() * 1000 + 100);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const image = `https://placedog.net/500/500?random=${Math.floor(
      Math.random() * 10 + 1
    )}`;

    pets.push({
      name,
      type,
      gender,
      age,
      description,
      fee,
      image,
      color,
    });
  }


  return new Promise((res) => {
    res(pets);
  });
};
