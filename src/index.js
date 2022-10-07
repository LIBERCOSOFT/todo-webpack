import addItemToDom from './modules/addItemToDom.js';
import displaySavedItems from './modules/displaySavedItems.js';
import { deleteAllCompleted } from './modules/eventListeners.js';
import './style.css';

const enterInput = document.querySelector('#user__input__btn');
const enterField = document.querySelector('#user__input__field');
const clearAll = document.querySelector('#clear__all');

// Display list of todo items in localstorage
displaySavedItems();

const addItemToDomOnEnter = () => {
  const inputField = document.querySelector('#user__input__field');
  const allTodos = JSON.parse(localStorage.getItem('allTodos')) || [];
  const { value } = inputField;
  if (value) {
    const itemObj = {
      description: value,
      completed: false,
      index: allTodos.length + 1,
    };

    addItemToDom(itemObj);
    const updatedTodos = [...allTodos, itemObj];
    localStorage.setItem('allTodos', JSON.stringify(updatedTodos));

    inputField.value = '';
  }
};

enterInput.addEventListener('click', addItemToDomOnEnter);

enterField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addItemToDomOnEnter();
    event.preventDefault();
  }
});

clearAll.addEventListener('click', deleteAllCompleted);