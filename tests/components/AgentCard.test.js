import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../src/store/store';
import AgentCard from '../../src/components/agent-card/agent-card';
import { PRESENCE_STATE_KEYS } from '../../src/common/defaults/modal.defaults';
Enzyme.configure({ adapter: new Adapter() });

describe('Agent card', () => {
  const agentCardProps = {
    callStatus: 'Inbound Call',
    callTime: 0,
    ext: '0000',
    name: 'Staff Member Name',
    status: 'User online status',
    totalTime: 0,
    isPreview: true,
  };
  test('Agent card should be rendered', () => {
    let agentcard = mount(
      <Provider store={store}>
        <AgentCard callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER} {...agentCardProps} />
      </Provider>,
    );

    expect(agentcard.find('.agent-c')).toHaveLength(1);
  });

  test('Agent card background class must be dependent on the presence of the state', () => {
    let agentcard = mount(
      <Provider store={store}>
        <AgentCard {...agentCardProps} callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE} />
      </Provider>,
    );
    expect(agentcard.find('.agent-c--sun-yellow')).toHaveLength(1);

    agentcard.setProps({
      children: <AgentCard {...agentCardProps} callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER} />,
    });
    expect(agentcard.find('.agent-c--lighter-red')).toHaveLength(1);

    agentcard.setProps({
      children: <AgentCard {...agentCardProps} callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND} />,
    });
    expect(agentcard.find('.agent-c--orange')).toHaveLength(1);

    agentcard.setProps({
      children: <AgentCard {...agentCardProps} callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING} />,
    });
    expect(agentcard.find('.agent-c--magenta')).toHaveLength(1);

    agentcard.setProps({
      children: <AgentCard {...agentCardProps} callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP} />,
    });
    expect(agentcard.find('.agent-c--aqua')).toHaveLength(1);

    agentcard.setProps({
      children: <AgentCard {...agentCardProps} callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE} />,
    });
    expect(agentcard.find('.agent-c--sick-green')).toHaveLength(1);

    agentcard.setProps({
      children: <AgentCard {...agentCardProps} callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF} />,
    });
    expect(agentcard.find('.agent-c--grey')).toHaveLength(1);
  });
});
