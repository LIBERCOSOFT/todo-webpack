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

  window.location.reload();
  removeItemFromStorage(Number(id));
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

  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  allTodos.forEach((todo) => {
    if (Number(parentElement.id) === todo.index) {
      if (todo.description !== e.target.innerText)todo.description = e.target.innerText;
    }
  });
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
};

const handleCheckbox = (e) => {
  const { parentElement } = e.target;
  const spanElement = parentElement.children[1];
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  const { id } = parentElement.parentElement;

  if (e.target.checked) {
    spanElement.classList.add('completed');

    allTodos.forEach((todo) => {
      if (Number(id) === todo.index) { todo.completed = true; }
    });
  } else {
    spanElement.classList.remove('completed');

    allTodos.forEach((todo) => {
      if (Number(id) === todo.index) { todo.completed = false; }
    });
  }
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
};

export {
  handleBlur, handleDelete, handleKebab, handleCheckbox,
};