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
import { DEFAULTS } from '../../src/common/defaults/defaults';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Modal: Add Component -- columns to view', () => {
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

  test('Columns to view section should be rendered', () => {
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
    expect(wrapper.find('.c-modal--add-component__input-section--columns').length).toBe(1);
  });

  test('Initially 4 options must be checked', () => {
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
    let noOfcolumns = 0;
    wrapper
      .find('.c-modal--add-component__input-section--columns')
      .find('input')
      .forEach((input) => {
        if (input.props().checked) {
          noOfcolumns++;
        }
      });
    expect(noOfcolumns).toBe(4);
  });
});
