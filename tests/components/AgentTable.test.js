import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { ADD_COMPONENT_COLUMN_OPTIONS, PRESENCE_STATE_KEYS } from '../../src/components/modal/add-component/modal.add-component.defaults';
import AgentTable from '../../src/components/agent-table/agent-table';
import { AGENTS_TABLE } from '../../src/components/grid/grid.defaults';
Enzyme.configure({ adapter: new Adapter() });

describe('Agent table', () => {
  test('Agent table should be rendered', () => {
    let agentTable = mount(
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
      />,
    );

    expect(agentTable.find('.agent-t')).not.toHaveLength(0);
  });

  test('The number of agents should be the same as AGENTS_TABLE length', () => {
    const agentTable = shallow(<AgentTable columnsToView={Object.keys(ADD_COMPONENT_COLUMN_OPTIONS)} agents={AGENTS_TABLE} />);
    const agents = agentTable.find('.agent-t__agent');
    expect(agents.length).toBe(AGENTS_TABLE.length);
  });

  test('Agent Table card should render the agent name', () => {
    let agentTable = mount(
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
      />,
    );
    expect(agentTable.text()).toMatch(/Megan Carter/);
  });

  test('Agent Table should have 2 columns (state and settings icon)', () => {
    let agentTable = mount(
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
      />,
    );
    expect(agentTable.find('.agent-t__agent-info').length).toBe(2);
  });

  test('Agent Table should have 3 columns (state, settings icon and agent name )', () => {
    let agentTable = mount(
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
      />,
    );
    expect(agentTable.find('.agent-t__agent-info').length).toBe(3);
  });

  test('Agent Table column width should be 100% / noOfColumns', () => {
    let agentTable = mount(
      <AgentTable
        columnsToView={[ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME, ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY]}
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
      />,
    );
    expect(agentTable.find('.agent-t__agent-info').).toBe(3);
  });
});
