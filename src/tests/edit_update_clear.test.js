/**
 * @jest-environment jsdom
 */

import addItemToDom from '../modules/addItemToDom.js';
import {
  handleEdit, handleCheckbox, deleteAllCompleted,
} from '../modules/eventListeners.js';

describe('successful edit of task description', () => {
  it('checks the data type given to handlEdit function', () => {
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
    expect(e).toBeInstanceOf(Object);
    handleEdit(e);
  });

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
  it('checks the data type given to handleCheckbox function', () => {
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
    expect(e).toBeInstanceOf(Object);
    handleCheckbox(e);
  });

  it('add a class of completed to completed item', () => {
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
  it('checks if the deleteAllCompleted has an argument', () => {
    document.body.innerHTML = '<ul id="items__container"></ul>';
    const newItem = {
      description: 'value',
      completed: true,
      index: 1,
    };

    addItemToDom(newItem);
    function deleteAllCompleted(...args) {
      const { length } = [...args];
      return length === 0;
    }

    expect(deleteAllCompleted()).toBeTruthy();
  });

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