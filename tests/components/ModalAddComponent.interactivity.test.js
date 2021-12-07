import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ModalAgentList from '../../src/components/modal/agent-list/modal.agent-list';
import { modalInitialState } from '../../src/store/reducers/modal.reducer';
import { skillsInitialState } from '../../src/store/reducers/skills.reducer';
import { callsQueuesInitialState } from '../../src/store/reducers/callsQueues.reducer';
import { loginInitialState } from '../../src/store/reducers/login.reducer';
import { agentsInitialState } from '../../src/store/reducers/agents.reducer';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Modal: Add Component -- interactivity options', () => {
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

  test('Interactivity section should be rendered', () => {
    const store = mockStore({
      ...initialStoreValues,
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    expect(wrapper.find('.c-modal--add-component__input-section--interactivity').length).toBe(1);
  });

  test('All interactivity options shuld be checked', () => {
    const store = mockStore({
      ...initialStoreValues,
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    wrapper
      .find('.c-modal--add-component__input-section--interactivity')
      .find('input')
      .forEach((input) => {
        expect(input.props().checked).toBe(true);
      });
  });

  test('All interactivity options shuld be unchecked', () => {
    const store = mockStore({
      ...initialStoreValues,
      modal: {
        ...modalInitialState,
        agentList: {
          ...modalInitialState.agentList,
          interactivityOptions: {
            ...modalInitialState.agentList.interactivityOptions,
            selectedItems: [],
          },
        },
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    wrapper
      .find('.c-modal--add-component__input-section--interactivity')
      .find('input')
      .forEach((input) => {
        expect(input.props().checked).toBe(false);
      });
  });
});
