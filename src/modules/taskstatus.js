export default class ItemStatus {
  static handleCheckbox(e) {
    const { parentElement } = e.target;
    const spanElement = parentElement.children[1];
    spanElement.classList.toggle('completed');
  }
}