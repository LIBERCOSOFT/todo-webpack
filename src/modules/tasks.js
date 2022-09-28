export default class Action {
  static addItemToDom(book) {
    const itemsContainer = document.querySelector('#items__container');
    const liElement = document.createElement('li');
    liElement.id = book.index;
    liElement.className = 'space__between';
    liElement.innerHTML = `
    <div class="items__desc">
    <input type="checkbox" />
    <span>${book.description}</span>
    </div>
    <i class="fa-solid fa-ellipsis-vertical" id="user__kebab__menu"> </i>
    `;

    itemsContainer.appendChild(liElement);
  }

  static displaySavedItems() {
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    if (allTodos) {
      allTodos.forEach((book) => this.addItemToDom(book));
    }
  }
}
