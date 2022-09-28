import Action from './modules/tasks.js';
import './style.css';

// Display list of todo items in localstorage
Action.displaySavedItems();

const enterInput = document.querySelector('#user__input__btn');
enterInput.addEventListener('click', () => {
  const inputFieldValue = document.querySelector('#user__input__field').value;
  if (inputFieldValue) {
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    const itemObj = {
      description: inputFieldValue,
      completed: false,
      index: allTodos.length + 1,
    };

    Action.addItemToDom(itemObj);
    const updatedTodos = [...allTodos, itemObj];
    localStorage.setItem('allTodos', JSON.stringify(updatedTodos));
  }
});