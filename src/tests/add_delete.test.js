/**
 * @jest-environment jsdom
 */

import addItemToDom from '../modules/addItemToDom.js';
import { handleDelete } from '../modules/eventListeners.js';

describe('add item', () => {
  it('add one new item to the list', () => {
    document.body.innerHTML = '<ul id="items__container"></ul>';
    const newItem = {
      description: 'value',
      completed: false,
      index: 1,
    };
    addItemToDom(newItem);
    const items = document.querySelectorAll('#items__container li');
    expect(items).toHaveLength(1);
  });
});

describe('delete item', () => {
  it('delete one new item to the list', () => {
    document.body.innerHTML = '<ul id="items__container"></ul>';
    const newItem = {
      description: 'value',
      completed: false,
      index: 1,
    };
    const e = {
      target: {
        parentElement: { id: newItem.index },
      },
    };

    addItemToDom(newItem);
    handleDelete(e);
    const items = document.querySelectorAll('#items__container li');
    expect(items).toHaveLength(0);
  });
});