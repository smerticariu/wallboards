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
import { DEFAULTS } from '../../../../src/common/defaults/defaults';
import ModalAgentStatus from '../../../../src/components/modal/agent-status/modal.agent-status';

const mockStore = createMockStore([thunk]);
Enzyme.configure({ adapter: new Adapter() });

describe('Modal: Agent Status', () => {
  let initialStoreValues = {
    modal: {
      ...modalInitialState,
      agentStatus: {
        ...modalInitialState.agentStatus,
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
      <ModalAgentStatus />
    </Provider>,
  );

  test('Modal should be rendered', () => {
    expect(wrapper.find('.c-modal__container').length).toBe(1);
  });

  test(`Number of period options must be ${DEFAULTS.MODAL.AGENT_LOGIN.PERIOD.length}`, () => {
    expect(wrapper.find({ name: 'period' }).find('option').length).toBe(DEFAULTS.MODAL.AGENT_LOGIN.PERIOD.length);
  });

  test(`Number of week days must be 7`, () => {
    expect(wrapper.find({ name: 'startOfWeek' }).find('option').length).toBe(7);
  });

  test(`In add mode the button must be with the text "Add"`, () => {
    expect(wrapper.find('.c-button--m-left').text()).toBe('Add');
  });

  test(`In edit mode the button must be with the text "Save"`, () => {
    initialStoreValues.modal.agentStatus.isEditMode = true;
    const store = mockStore({
      ...initialStoreValues,
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentStatus />
      </Provider>,
    );
    expect(wrapper.find('.c-button--m-left').text()).toBe('Save');
  });

  test(`Only 10 rows should be displayed in the preview`, () => {
    expect(wrapper.find('.agent-login__row').length).toBe(10);
  });

  test(`Header must have 6 columns`, () => {
    expect(wrapper.find('.agent-login__header-item').length).toBe(6);
  });

  test(`Each row must have 6 columns`, () => {
    wrapper.find('.agent-login__row').forEach((row) => {
      expect(row.find('.agent-login__row-item').length).toBe(6);
    });
  });
});
