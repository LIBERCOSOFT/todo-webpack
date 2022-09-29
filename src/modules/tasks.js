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
    const spanElement = document.createElement('span');
    spanElement.id = `desc-${book.index}`;
    spanElement.innerText = book.description;
    descDiv.appendChild(inputElement);
    descDiv.appendChild(spanElement);
    const kebab = document.createElement('i');
    kebab.className = 'fa-solid fa-ellipsis-vertical';
    kebab.id = `kebab-${book.index}`;
    kebab.addEventListener('click', this.handleKebab);
    const trash = document.createElement('i');
    trash.className = 'fa-solid fa-trash hide';
    trash.id = `trash-${book.index}`;
    trash.addEventListener('click', this.handleDelete);
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

    const { id } = e.target.parentElement;
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    allTodos.forEach((todo, i) => {
      if (Number(id) === todo.index) {
        allTodos.splice(i, 1);
      }
    });
    for (let i = 1; i <= allTodos; i += 1) {
      allTodos[i].index = i;
    }
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
  }

  static displaySavedItems() {
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    if (allTodos) {
      allTodos.forEach((book) => this.addItemToDom(book));
    }
  }
}
