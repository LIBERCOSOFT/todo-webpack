import './style.css';

const toDoItems = [
  {
    description: 'first item description',
    completed: true,
    index: 1,
  },
  {
    description: 'second item description',
    completed: false,
    index: 2,
  },
  {
    description: 'third item description',
    completed: true,
    index: 3,
  },
  {
    description: 'fouth item description',
    completed: false,
    index: 4,
  },
  {
    description: 'fifth item description',
    completed: true,
    index: 5,
  },
];

toDoItems.map (val => {
  const itemsContainer = document.querySelector ('#items__container');
  let liElement = document.createElement ('li');
  liElement.id = val.index;
  liElement.innerHTML = `
  <input type="checkbox" />
  ${val.description}
  `;

  itemsContainer.appendChild (liElement);
});
