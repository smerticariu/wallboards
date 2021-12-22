import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { modalInitialState } from '../../../../src/store/reducers/modal.reducer';
import { skillsInitialState } from '../../../../src/store/reducers/skills.reducer';
import { callsQueuesInitialState } from '../../../../src/store/reducers/callsQueues.reducer';
import { loginInitialState } from '../../../../src/store/reducers/login.reducer';
import { agentsInitialState } from '../../../../src/store/reducers/agents.reducer';
import ModalAgentList from '../../../../src/components/modal/agent-list/modal.agent-list';
import { DEFAULTS } from '../../../../src/common/defaults/defaults';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Modal: Agent List -- view section', () => {
  const initialStoreValues = {
    modal: { ...modalInitialState },
    skills: { ...skillsInitialState },
    callsQueues: { ...callsQueuesInitialState },
    login: { ...loginInitialState },
    agents: { ...agentsInitialState },
    wallboards: {
      present: {
        wallboardIdForDelete: 0,
      },
    },
  };
  const store = mockStore({
    ...initialStoreValues,
  });
  let wrapper = mount(
    <Provider store={store}>
      <ModalAgentList />
    </Provider>,
  );
  test(`In add mode the button must be with the text "Add"`, () => {
    expect(wrapper.find('.c-button--m-left').text()).toBe('Add');
  });

  test(`In edit mode the button must be with the text "Save"`, () => {
    initialStoreValues.modal.agentList.isEditMode = true;
    const store = mockStore({
      ...initialStoreValues,
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    expect(wrapper.find('.c-button--m-left').text()).toBe('Save');
  });

  test('View section should be rendered', () => {
    expect(wrapper.find('.c-modal--add-component__input-section--view').length).toBe(1);
  });

  test('Card View option shuld be selected', () => {
    expect(wrapper.find('.c-modal--add-component__input-section--view').find('input').first().props().checked).toBe(true);
  });

  test('if is card view, show only 2 options', () => {
    expect(wrapper.find('.c-modal--add-component__input-section--view').find('input').length).toBe(2);
  });

  test('if is table view, show columns options', () => {
    const store = mockStore({
      ...initialStoreValues,
      modal: {
        ...modalInitialState,
        agentList: {
          ...modalInitialState.agentList,
          mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE,
        },
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    expect(wrapper.find('.c-modal--add-component__input-section--view').find('input').length).toBe(4);
  });

  test('dispatch when radio button is clicked', () => {
    const store = mockStore({
      ...initialStoreValues,
      modal: {
        ...modalInitialState,
        agentList: {
          ...modalInitialState.agentList,
          mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE,
        },
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    expect(store.getActions().length).toBe(0);
    wrapper
      .find('.c-modal--add-component__input-section--view')
      .find('.c-radio')
      .first()
      .find('input')
      .simulate('change', { target: { checked: true, name: 'Test' } });
    wrapper.update();
    expect(store.getActions().length).toBe(1);
  });
});
