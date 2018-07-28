import { makeCols, saveToLocalStorage, getLocalStorageKey } from '../index';

const firstString = 'A1:D18';
const firstArr = [
  { key: 0, name: 'A' },
  { key: 1, name: 'B' },
  { key: 2, name: 'C' },
  { key: 3, name: 'D' },
];
const firstObject = { key: 0, name: 'A' };

describe('makeCols()', () => {
  it('create array of columns', () => {
    expect(makeCols(firstString)).toEqual(firstArr);
  });

  it('must be object in array', () => {
    expect(makeCols(firstString)).toContainEqual(firstObject);
  });
});

const file = { name: 'styleSheets' };
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  key(num) {
    return this.store[num] || null;
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe('saveToLocalStorage()', () => {
  it('must be return number', () => {
    expect(typeof saveToLocalStorage({ file, object: file })).toEqual(
      'undefined',
    );
  });
});

describe('getLocalStorageKey()', () => {
  it('must be return name file', () => {
    expect(typeof getLocalStorageKey(0)).toEqual('object');
  });
});
