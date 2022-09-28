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

toDoItems.forEach((val) => {
  const itemsContainer = document.querySelector('#items__container');
  const liElement = document.createElement('li');
  liElement.id = val.index;
  liElement.className = 'space__between';
  liElement.innerHTML = `
  <div class="items__desc">
  <input type="checkbox" />
  <span>${val.description}</span>
  </div>
  <i class="fa-solid fa-ellipsis-vertical" </i>
  `;

  itemsContainer.appendChild(liElement);
});