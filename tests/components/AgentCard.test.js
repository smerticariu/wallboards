import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AgentTable from 'components/agent-table/agent-table';
import { AGENTS_TABLE } from 'components/grid/grid.defaults';
import { PRESENCE_STATE_KEYS } from 'components/modal/add-component/modal.add-component.defaults';

Enzyme.configure({ adapter: new Adapter() });

describe('Agent card', () => {
  test('Sign In button should be rendered', () => {
    let agentTable = mount(
      <AgentTable
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
            timeInCurrentPresenceState: '- - : - - : - -',
            timeInCurrentAvailabilityState: '- - : - - : - -',
            timeInCurrentCall: '- - : - - : - -',
            timeInCurrentWrapup: '- - : - - : - -',
            listOfSkills: 'Skill',
          },
        ]}
      />,
    );

    expect(agentTable.find('.agent-t')).not.toHaveLength(0);
  });

  test('The number of agents should be the same as AGENTS_TABLE length', () => {
    const agentTable = shallow(<AgentTable agents={AGENTS_TABLE} />);
    const agents = agentTable.find('.agent-t__agent');
    expect(agents.length).toBe(AGENTS_TABLE.length);
  });

  test('Agent Table card should be TODO', () => {
    let agentTable = mount(
      <AgentTable
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
            timeInCurrentPresenceState: '- - : - - : - -',
            timeInCurrentAvailabilityState: '- - : - - : - -',
            timeInCurrentCall: '- - : - - : - -',
            timeInCurrentWrapup: '- - : - - : - -',
            listOfSkills: 'Skill',
          },
        ]}
      />,
    );
  });
});
