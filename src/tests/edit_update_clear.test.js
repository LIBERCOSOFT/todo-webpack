/**
 * @jest-environment jsdom
 */

import addItemToDom from '../modules/addItemToDom.js';
import { handleEdit, handleCheckbox, deleteAllCompleted } from '../modules/eventListeners.js';

describe('successful edit of task description', () => {
  it('updates the task description on the dom', () => {
    document.body.innerHTML = '<ul id="items__container"></ul>';
    const newItem = {
      description: 'value one',
      completed: false,
      index: 1,
    };
    const e = {
      target: {
        parentElement: { parentElement: { id: newItem.index } },
        innerText: 'another two',
      },
    };
    addItemToDom(newItem);
    handleEdit(e);
    const spanElement = document.querySelector(`#desc-${newItem.index}`).innerText;
    expect(spanElement).toBe(e.target.innerText);
  });
});

describe('successful marking an item completed', () => {
  it('add a class of completed to item', () => {
    document.body.innerHTML = '<ul id="items__container"></ul>';
    const newItem = {
      description: 'value one',
      completed: false,
      index: 1,
    };
    const e = {
      target: {
        parentElement: {
          parentElement: { id: newItem.index },
        },
      },
    };
    addItemToDom(newItem);
    handleCheckbox(e);
    const spanElement = document.querySelector(`#desc-${newItem.index}`);
    expect(spanElement.classList.contains('completed')).toBeTruthy();
  });
});

describe('delete all item', () => {
  it('delete all completed item from the list', () => {
    document.body.innerHTML = '<ul id="items__container"></ul>';
    const newItem = {
      description: 'value',
      completed: true,
      index: 1,
    };

    addItemToDom(newItem);
    deleteAllCompleted();
    const items = document.querySelectorAll('.completed');
    expect(items).toHaveLength(0);
  });
});