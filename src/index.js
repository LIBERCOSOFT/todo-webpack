import Action from './modules/tasks.js';
import './style.css';

// Display list of todo items in localstorage
Action.displaySavedItems();

const enterInput = document.querySelector('#user__input__btn');

enterInput.addEventListener('click', () => {
  const inputField = document.querySelector('#user__input__field');
  const { value } = inputField;
  if (value) {
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    const itemObj = {
      description: value,
      completed: false,
      index: allTodos.length + 1,
    };

    Action.addItemToDom(itemObj);
    const updatedTodos = [...allTodos, itemObj];
    localStorage.setItem('allTodos', JSON.stringify(updatedTodos));

    inputField.value = '';
  }
});
