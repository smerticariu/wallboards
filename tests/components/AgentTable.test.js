import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import AgentListTable from '../../src/components/tables/agent-list';
import { Provider } from 'react-redux';
import store from '../../src/store/store';
import { ADD_COMPONENT_COLUMN_OPTIONS, PRESENCE_STATE_KEYS } from '../../src/common/defaults/modal.defaults';
import { DEFAULTS } from '../../src/common/defaults/defaults';
Enzyme.configure({ adapter: new Adapter() });

describe('Agent table', () => {
  test('Agent table should be rendered', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentListTable
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

    expect(agentTable.find('.agent-list-table')).not.toHaveLength(0);
  });

  test('The number of agents should be the same as AGENTS_TABLE length', () => {
    const agentTable = mount(
      <Provider store={store}>
        <AgentListTable columnsToView={Object.keys(ADD_COMPONENT_COLUMN_OPTIONS)} agents={DEFAULTS.GRID.AGENTS_TABLE_MOCK} />
      </Provider>,
    );
    const agents = agentTable.find('.agent-list-table__agent');
    expect(agents.length).toBe(DEFAULTS.GRID.AGENTS_TABLE_MOCK.length);
  });

  test('Agent Table card should render the agent name', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentListTable
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

  test('Agent Table should have 0 columns', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentListTable
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
    expect(agentTable.find('.agent-list-table__agent-info').length).toBe(0);
  });

  test('Agent Table should have 1 column (agent name)', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentListTable
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
    expect(agentTable.find('.agent-list-table__agent-info').length).toBe(1);
  });

  test('Agent Table column width should be 100% / noOfColumns', () => {
    let agentTable = mount(
      <Provider store={store}>
        <AgentListTable columnsToView={[ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME]} agents={[DEFAULTS.GRID.AGENTS_TABLE_MOCK[0]]} />
      </Provider>,
    );
    expect(agentTable.find('.agent-list-table__agent-info').prop('style')).toHaveProperty('width', '100%');
  });
});
