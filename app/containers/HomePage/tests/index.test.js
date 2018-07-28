import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../index';
import ModalCustom from '../../../components/modal';
import FirstBar from '../first-bar';
import SecondBar from '../second-bar';
import OutTable from '../../../components/table';

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
  length(key) {
    return this.store[key].length;
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe('<HomePage />', () => {
  it('should render the page ModalCustom', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find(ModalCustom).render()).toHaveLength(0);
  });
});

describe('<HomePage />', () => {
  it('should render the page FirstBar', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find(FirstBar).render()).toHaveLength(1);
  });
});

describe('<HomePage />', () => {
  it('should render the page SecondBar', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find(SecondBar).render()).toHaveLength(1);
  });
});

describe('<HomePage />', () => {
  it('should render the page OutTable', () => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find(OutTable).render()).toHaveLength(1);
  });
});
