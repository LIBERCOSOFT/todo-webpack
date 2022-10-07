import removeItemFromStorage from './removeItemFromStorage.js';

const handleKebab = (e) => {
  const { parentElement } = e.target;
  const kebabIndex = document.querySelector(`#kebab-${parentElement.id}`);
  const trashIndex = document.querySelector(`#trash-${parentElement.id}`);
  kebabIndex.classList.toggle('hide');
  trashIndex.classList.toggle('hide');
  parentElement.style.backgroundColor = '#e1e0ad';
  const spanElement = document.querySelector(`#desc-${parentElement.id}`);
  spanElement.setAttribute('contenteditable', true);
  setTimeout(() => {
    spanElement.focus();
  }, 0);
};

const handleDelete = (e) => {
  const { id } = e.target.parentElement;
  const liElement = document.getElementById(`${id}`);
  liElement.remove();

  removeItemFromStorage(Number(id));
};

const handleEdit = (e) => {
  const { parentElement } = e.target.parentElement;
  const spanElement = document.querySelector(`#desc-${parentElement.id}`);
  spanElement.innerText = e.target.innerText;

  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  if (allTodos) {
    allTodos.forEach((todo) => {
      if (Number(parentElement.id) === todo.index) {
        if (todo.description !== e.target.innerText)todo.description = e.target.innerText;
      }
    });
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
  }
};

const handleBlur = (e) => {
  const { parentElement } = e.target.parentElement;
  const kebabIndex = document.querySelector(`#kebab-${parentElement.id}`);
  const trashIndex = document.querySelector(`#trash-${parentElement.id}`);
  const spanElement = document.querySelector(`#desc-${parentElement.id}`);
  kebabIndex.classList.toggle('hide');
  trashIndex.classList.toggle('hide');
  spanElement.setAttribute('contenteditable', false);
  parentElement.style.backgroundColor = '#fff';
};

const handleCheckbox = (e) => {
  const { id } = e.target.parentElement.parentElement;
  const spanElement = document.querySelector(`#desc-${id}`);
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  spanElement.classList.toggle('completed');

  if (e.target.checked) {
    if (allTodos) {
      allTodos.forEach((todo) => {
        if (Number(id) === todo.index) todo.completed = true;
      });
    }
  } else if (allTodos) {
    allTodos.forEach((todo) => {
      if (Number(id) === todo.index) todo.completed = false;
    });
  }
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
};

const deleteAllCompleted = () => {
  const completedItem = document.querySelectorAll('.completed');
  completedItem.forEach((val) => val.parentElement.parentElement.remove());

  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  if (allTodos) {
    const filteredTodos = allTodos.filter((val) => val.completed === false);
    filteredTodos.forEach((val, i) => {
      val.index = i + 1;
    });
    if (filteredTodos.length > 0) {
      window.location.reload();
    }
    localStorage.setItem('allTodos', JSON.stringify(filteredTodos));
  }
};

export {
  handleBlur, handleDelete, handleKebab, handleCheckbox, handleEdit, deleteAllCompleted,
};