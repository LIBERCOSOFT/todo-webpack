import ItemStatus from './taskstatus.js';

export default class Action {
  static addItemToDom(book) {
    const itemsContainer = document.querySelector('#items__container');
    const liElement = document.createElement('li');
    liElement.id = book.index;
    liElement.className = 'space__between';
    const descDiv = document.createElement('div');
    descDiv.className = 'items__desc';
    const inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = `checkbox-${book.index}`;
    inputElement.addEventListener('change', ItemStatus.handleCheckbox);
    const spanElement = document.createElement('span');
    spanElement.id = `desc-${book.index}`;
    spanElement.innerText = book.description;
    spanElement.addEventListener('blur', this.handleBlur);
    descDiv.appendChild(inputElement);
    descDiv.appendChild(spanElement);
    const kebab = document.createElement('i');
    kebab.className = 'fa-solid fa-ellipsis-vertical';
    kebab.id = `kebab-${book.index}`;
    kebab.addEventListener('click', this.handleKebab);
    const trash = document.createElement('i');
    trash.className = 'fa-solid fa-trash hide';
    trash.id = `trash-${book.index}`;
    // Used mousedown instead of click because it fires before blur event listner
    trash.addEventListener('mousedown', this.handleDelete);
    liElement.appendChild(descDiv);
    liElement.appendChild(kebab);
    liElement.appendChild(trash);

    itemsContainer.appendChild(liElement);
  }

  static handleKebab(e) {
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
  }

  static handleDelete(e) {
    const { parentElement } = e.target;
    parentElement.remove();

    window.location.reload();

    const { id } = e.target.parentElement;
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    allTodos.forEach((todo, i) => {
      if (Number(id) === todo.index) {
        allTodos.splice(i, 1);
      }
    });
    allTodos.forEach((val, i) => {
      val.index = i + 1;
    });
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
  }

  static handleBlur(e) {
    const { parentElement } = e.target.parentElement;
    const kebabIndex = document.querySelector(`#kebab-${parentElement.id}`);
    const trashIndex = document.querySelector(`#trash-${parentElement.id}`);
    const spanElement = document.querySelector(`#desc-${parentElement.id}`);
    kebabIndex.classList.toggle('hide');
    trashIndex.classList.toggle('hide');
    spanElement.setAttribute('contenteditable', false);
    parentElement.style.backgroundColor = '#fff';
  }

  static displaySavedItems() {
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    if (allTodos) {
      allTodos.forEach((book) => this.addItemToDom(book));
    }
  }
}
