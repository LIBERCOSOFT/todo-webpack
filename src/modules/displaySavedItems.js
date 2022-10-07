import addItemToDom from './addItemToDom.js';

const displaySavedItems = () => {
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  if (allTodos) {
    allTodos.forEach((item) => addItemToDom(item));
  }
};

export default displaySavedItems;