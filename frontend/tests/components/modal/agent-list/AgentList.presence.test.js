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

describe('Modal: Agent List -- presence state', () => {
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
  test('Presence State section should be rendered', () => {
    expect(wrapper.find('.c-modal--add-component__input-section--presence-state').length).toBe(1);
  });

  test('Select all shuld be checked', () => {
    expect(
      wrapper
        .find('.c-modal--add-component__input-section--presence-state')
        .find('.c-modal--add-component__select-checkbox')
        .find('input')
        .first()
        .props().checked,
    ).toBe(true);
  });

  test('Number of presence states shuld be 7', () => {
    const store = mockStore({
      ...initialStoreValues,
      modal: {
        ...modalInitialState,
        agentList: {
          ...modalInitialState.agentList,
          mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE,
          presenceStates: {
            ...modalInitialState.agentList.presenceStates,
            selectAll: false,
          },
        },
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    expect(
      wrapper
        .find('.c-modal--add-component__input-section--presence-state')
        .find('.c-modal--add-component__av-state-container')
        .find('.c-checkbox').length,
    ).toBe(7);
  });

  test('dispatch when presence state checkbox clicked', () => {
    const store = mockStore({
      ...initialStoreValues,
      modal: {
        ...modalInitialState,
        agentList: {
          ...modalInitialState.agentList,
          mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE,
          presenceStates: {
            ...modalInitialState.agentList.presenceStates,
            selectAll: false,
          },
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
      .find('.c-modal--add-component__input-section--presence-state')
      .find('.c-modal--add-component__av-state-container')
      .find('.c-checkbox')
      .first()
      .find('input')
      .simulate('change', { target: { checked: true, name: 'idle' } });
    wrapper.update();
    expect(store.getActions().length).toBe(1);
  });
});
