import {
  handleKebab, handleDelete, handleBlur, handleCheckbox,
} from './eventListeners.js';

const addItemToDom = (item) => {
  const itemsContainer = document.querySelector('#items__container');
  const liElement = document.createElement('li');
  liElement.id = item.index;
  liElement.className = 'space__between';
  const descDiv = document.createElement('div');
  descDiv.className = 'items__desc';
  const inputElement = document.createElement('input');
  inputElement.type = 'checkbox';
  inputElement.id = `checkbox-${item.index}`;
  inputElement.addEventListener('change', handleCheckbox);
  const spanElement = document.createElement('span');
  if (item.completed) {
    spanElement.classList = 'completed';
    inputElement.checked = true;
  }
  spanElement.id = `desc-${item.index}`;
  spanElement.innerText = item.description;
  spanElement.addEventListener('blur', handleBlur);
  descDiv.appendChild(inputElement);
  descDiv.appendChild(spanElement);
  const kebab = document.createElement('i');
  kebab.className = 'fa-solid fa-ellipsis-vertical';
  kebab.id = `kebab-${item.index}`;
  kebab.addEventListener('click', handleKebab);
  const trash = document.createElement('i');
  trash.className = 'fa-solid fa-trash hide';
  trash.id = `trash-${item.index}`;
  // Used mousedown instead of click because it fires before blur event listner
  trash.addEventListener('mousedown', handleDelete);
  liElement.appendChild(descDiv);
  liElement.appendChild(kebab);
  liElement.appendChild(trash);

  itemsContainer.appendChild(liElement);
};

export default addItemToDom;