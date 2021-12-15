import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import ModalDeleteWallboard from '../../src/components/modal/delete-wallboard/modal.delete-wallboard';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Wallboard delete modal', () => {
  test('Modal should be rendered', () => {
    const store = mockStore({
      modal: { activeModalName: 'DELETE_WALLBOARD' },
      wallboards: {
        present: {
          wallboardIdForDelete: 'wallboard-id-4324234324234',
        },
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalDeleteWallboard />
      </Provider>,
    );

    expect(wrapper.find('.c-modal').length).toBe(1);
  });

  test('Modal must be close', () => {
    const store = mockStore({
      modal: { activeModalName: null },
      wallboards: {
        present: {
          wallboardIdForDelete: 'wallboard-id-4324234324234',
        },
      },
    });
    const { activeModalName } = store.getState().modal;

    store.getState();
    let wrapper = mount(<Provider store={store}>{activeModalName === 'DELETE_WALLBOARD' && <ModalDeleteWallboard />}</Provider>);

    expect(wrapper.find('.c-modal--open').length).toBe(0);
  });
  test('Modal must be open', () => {
    const store = mockStore({
      modal: { activeModalName: 'DELETE_WALLBOARD' },
      wallboards: {
        present: {
          wallboardIdForDelete: 'wallboard-id-4324234324234',
        },
      },
    });
    const { activeModalName } = store.getState().modal;

    store.getState();
    let wrapper = mount(<Provider store={store}>{activeModalName === 'DELETE_WALLBOARD' && <ModalDeleteWallboard />}</Provider>);
    expect(wrapper.find('.c-modal--open').length).toBe(1);
  });
});
