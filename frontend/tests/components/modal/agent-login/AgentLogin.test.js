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
import ModalAgentLogin from '../../../../src/components/modal/agent-login/modal.agent-login';
import { DEFAULTS } from '../../../../src/common/defaults/defaults';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Modal: Agent Login', () => {
  const initialStoreValues = {
    modal: {
      ...modalInitialState,
      agentLogin: {
        ...modalInitialState.agentLogin,
        period: {
          id: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[2].id,
          value: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[2].value,
        },
      },
    },
    skills: { ...skillsInitialState },
    callsQueues: { ...callsQueuesInitialState },
    login: {
      ...loginInitialState,
      userInfo: {
        organisationId: 0,
      },
    },
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
      <ModalAgentLogin />
    </Provider>,
  );

  test('Modal should be rendered', () => {
    expect(wrapper.find('.c-modal__container').length).toBe(1);
  });

  test(`Number of period options must be ${DEFAULTS.MODAL.AGENT_LOGIN.PERIOD.length}`, () => {
    expect(wrapper.find({ name: 'period' }).find('option').length).toBe(DEFAULTS.MODAL.AGENT_LOGIN.PERIOD.length);
  });

  test(`Initial number of group options must be 1`, () => {
    expect(wrapper.find({ name: 'group' }).find('option').length).toBe(1);
  });

  test(`Number of week days must be 7`, () => {
    expect(wrapper.find({ name: 'startOfWeek' }).find('option').length).toBe(7);
  });
});
