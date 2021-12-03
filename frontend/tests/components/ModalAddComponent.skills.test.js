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

describe('Modal: Add Component -- skills', () => {
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

  test('Skills section should be rendered', () => {
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
    expect(wrapper.find('.c-modal--add-component__input-section--skills').length).toBe(1);
  });

  test('Select all shuld be checked', () => {
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
    expect(
      wrapper
        .find('.c-modal--add-component__input-section--skills')
        .find('.c-modal--add-component__select-checkbox')
        .find('input')
        .first()
        .props().checked,
    ).toBe(true);
  });

  test('Number of skills shuld be 2', () => {
    const store = mockStore({
      ...initialStoreValues,
      modal: {
        ...modalInitialState,
        agentList: {
          ...modalInitialState.agentList,
          mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE,
          skillsToView: {
            ...modalInitialState.agentList.skillsToView,
            selectAll: false,
          },
        },
      },
      skills: {
        ...skillsInitialState,
        allSkils: [
          {
            description: 'Skill1',
            name: 'SkillName1',
            id: 1,
          },
          {
            description: 'Skill2',
            name: 'SkillName2',
            id: 2,
          },
        ],
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );
    expect(
      wrapper
        .find('.c-modal--add-component__input-section--skills')
        .find('.c-modal--add-component__av-state-container')
        .find('.c-checkbox').length,
    ).toBe(2);
  });

  test('dispatch when skill checkbox clicked', () => {
    const store = mockStore({
      ...initialStoreValues,
      modal: {
        ...modalInitialState,
        agentList: {
          ...modalInitialState.agentList,
          mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE,
          skillsToView: {
            ...modalInitialState.agentList.skillsToView,
            selectAll: false,
          },
        },
      },
      skills: {
        ...skillsInitialState,
        allSkils: [
          {
            description: 'Skill1',
            name: 'SkillName1',
            id: 1,
          },
          {
            description: 'Skill2',
            name: 'SkillName2',
            id: 2,
          },
        ],
      },
    });
    let wrapper = mount(
      <Provider store={store}>
        <ModalAgentList />
      </Provider>,
    );

    expect(store.getActions().length).toBe(0);
    wrapper
      .find('.c-modal--add-component__input-section--skills')
      .find('.c-modal--add-component__av-state-container')
      .find('.c-checkbox')
      .first()
      .find('input')
      .simulate('change', { target: { checked: true, name: 'SkillName1' } });
    wrapper.update();
    expect(store.getActions().length).toBe(1);
  });
});
