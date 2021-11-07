import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { ADD_COMPONENT_COLUMN_OPTIONS, PRESENCE_STATE_KEYS } from '../../src/components/modal/add-component/modal.add-component.defaults';
import AgentTable from '../../src/components/agent-table/agent-table';
import { AGENTS_TABLE } from '../../src/components/grid/grid.defaults';
import { Provider } from 'react-redux';
import store from '../../src/store/store';
Enzyme.configure({ adapter: new Adapter() });

describe('Agent table', () => {
  test('Agent table should be rendered', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentTable
          columnsToView={Object.keys(ADD_COMPONENT_COLUMN_OPTIONS)}
          agents={[
            {
              callStatusKey: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
              agentName: 'Megan Carter',
              agentExtNo: '0000',
              currAvaiState: 'Busy on calls',
              currPresState: 'Inbound Call',
              noCallsOffered: '0',
              noCallsAnswered: '0',
              noCallsMissed: '0',
              timeInCurrentPresenceState: 0,
              timeInCurrentAvailabilityState: 0,
              timeInCurrentCall: 0,
              timeInCurrentWrapup: 0,
              listOfSkills: ['Skill'],
            },
          ]}
        />
      </Provider>,
    );

    expect(agentTable.find('.agent-t')).not.toHaveLength(0);
  });

  test('The number of agents should be the same as AGENTS_TABLE length', () => {
    const agentTable = mount(
      <Provider store={store}>
        <AgentTable columnsToView={Object.keys(ADD_COMPONENT_COLUMN_OPTIONS)} agents={AGENTS_TABLE} />
      </Provider>,
    );
    const agents = agentTable.find('.agent-t__agent');
    expect(agents.length).toBe(AGENTS_TABLE.length);
  });

  test('Agent Table card should render the agent name', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentTable
          columnsToView={Object.keys(ADD_COMPONENT_COLUMN_OPTIONS)}
          agents={[
            {
              callStatusKey: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
              agentName: 'Megan Carter',
              agentExtNo: '0000',
              currAvaiState: 'Busy on calls',
              currPresState: 'Inbound Call',
              noCallsOffered: '0',
              noCallsAnswered: '0',
              noCallsMissed: '0',
              timeInCurrentPresenceState: 0,
              timeInCurrentAvailabilityState: 0,
              timeInCurrentCall: 0,
              timeInCurrentWrapup: 0,
              listOfSkills: ['Skill'],
            },
          ]}
        />
      </Provider>,
    );
    expect(agentTable.text()).toMatch(/Megan Carter/);
  });

  test('Agent Table should have 1 column (settings icon)', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentTable
          columnsToView={[]}
          agents={[
            {
              callStatusKey: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
              agentName: 'Megan Carter',
              agentExtNo: '0000',
              currAvaiState: 'Busy on calls',
              currPresState: 'Inbound Call',
              noCallsOffered: '0',
              noCallsAnswered: '0',
              noCallsMissed: '0',
              timeInCurrentPresenceState: 0,
              timeInCurrentAvailabilityState: 0,
              timeInCurrentCall: 0,
              timeInCurrentWrapup: 0,
              listOfSkills: ['Skill'],
            },
          ]}
        />
      </Provider>,
    );
    expect(agentTable.find('.agent-t__agent-info').length).toBe(1);
  });

  test('Agent Table should have 2 columns (settings icon and agent name )', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentTable
          columnsToView={[ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME]}
          agents={[
            {
              callStatusKey: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
              agentName: 'Megan Carter',
              agentExtNo: '0000',
              currAvaiState: 'Busy on calls',
              currPresState: 'Inbound Call',
              noCallsOffered: '0',
              noCallsAnswered: '0',
              noCallsMissed: '0',
              timeInCurrentPresenceState: 0,
              timeInCurrentAvailabilityState: 0,
              timeInCurrentCall: 0,
              timeInCurrentWrapup: 0,
              listOfSkills: ['Skill'],
            },
          ]}
        />
      </Provider>,
    );
    expect(agentTable.find('.agent-t__agent-info').length).toBe(2);
  });

  test('Agent Table column width should be 100% / noOfColumns', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentTable columnsToView={[ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME]} agents={[AGENTS_TABLE[0]]} />
      </Provider>,
    );
    expect(agentTable.find('.agent-t__agent-info').at(1).prop('style')).toHaveProperty('width', '100%');
  });

  test('User can see only one interactivity option', () => {
    const agentTable = mount(
      <Provider store={store}>
        <AgentTable
          columnsToView={Object.keys(ADD_COMPONENT_COLUMN_OPTIONS)}
          canListenLive={true}
          agents={[
            {
              callStatusKey: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
              agentName: 'Megan Carter',
              agentExtNo: '0000',
              currAvaiState: 'Busy on calls',
              currPresState: 'Inbound Call',
              noCallsOffered: '0',
              noCallsAnswered: '0',
              noCallsMissed: '0',
              timeInCurrentPresenceState: 0,
              timeInCurrentAvailabilityState: 0,
              timeInCurrentCall: 0,
              timeInCurrentWrapup: 0,
              listOfSkills: ['Skill'],
            },
          ]}
        />
      </Provider>,
    );
    expect(agentTable.find('.c-dropdown__item').length).toBe(0);
    agentTable.find('.c-dropdown__trigger').find('.i--settings--table').last().simulate('click');
    expect(agentTable.find('.c-dropdown__item').length).toBe(1);
  });
});
