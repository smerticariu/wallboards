import React from 'react';
import { ArrowDownIcon } from '../../assets/static/icons/arrow-down';
import { PRESENCE_STATE_KEYS_COLOR } from '../modal/add-component/modal.add-component.defaults';
const AgentTable = ({ agents, ...props }) => {
  const noOfCols = Object.keys(agents[0]).filter((key) => agents[0][key]).length;

  const colWidth = 100 / noOfCols + '%';
  return (
    <div className="agent-t">
      <div className="agent-t__header">
        {agents[0].agentName && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Name
          </div>
        )}
        {agents[0].currAvaiState && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Availability Status
          </div>
        )}
        {agents[0].agentExtNo && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Phone Number
          </div>
        )}
        {agents[0].currPresState && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Presence Status
          </div>
        )}
        {agents[0].noCallsOffered && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Calls offered
          </div>
        )}
        {agents[0].noCallsAnswered && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Calls answered
          </div>
        )}
        {agents[0].noCallsMissed && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Calls missed
          </div>
        )}
        {agents[0].timeInCurrentPresenceState && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time in current
          </div>
        )}
        {agents[0].timeInCurrentAvailabilityState && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time availability
          </div>
        )}
        {agents[0].timeInCurrentCall && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time on cur. call
          </div>
        )}
        {agents[0].timeInCurrentWrapup && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time on cur. wr.
          </div>
        )}
        {agents[0].listOfSkills && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Skills
          </div>
        )}
        {
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Status
          </div>
        }
      </div>

      <div className="agent-t__body">
        {agents.map((agent, index) => (
          <div key={index} className="agent-t__agent">
            {agent.agentName && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                Megan Carter
              </div>
            )}
            {agent.currAvaiState && (
              <div
                className={`agent-t__agent-info agent-t__agent-info--${
                  PRESENCE_STATE_KEYS_COLOR.CARD_AVAILABILITY_STATUS_BACKGROUND[agent.callStatusKey]
                }`}
                style={{ width: colWidth }}
              >
                {agent.currAvaiState}
                <ArrowDownIcon className="i--arrow--down i--arrow--down--table i--arrow--down--large" />
              </div>
            )}
            {agent.agentExtNo && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.agentExtNo}
              </div>
            )}
            {agent.currPresState && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.currPresState}
              </div>
            )}
            {agent.noCallsOffered && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.noCallsOffered}
              </div>
            )}
            {agent.noCallsAnswered && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.noCallsAnswered}
              </div>
            )}
            {agent.noCallsMissed && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.noCallsMissed}
              </div>
            )}
            {agent.timeInCurrentPresenceState && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentPresenceState}
              </div>
            )}
            {agent.timeInCurrentAvailabilityState && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentAvailabilityState}
              </div>
            )}
            {agent.timeInCurrentCall && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentCall}
              </div>
            )}
            {agent.timeInCurrentWrapup && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentWrapup}
              </div>
            )}
            {agent.listOfSkills && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.listOfSkills}
              </div>
            )}
            <div className="agent-t__agent-info  agent-t__agent-info--circle" style={{ width: colWidth }}>
              <div
                className={`agent-t__agent-info--circle-container agent-t__agent-info--circle-container--${
                  PRESENCE_STATE_KEYS_COLOR.CARD_BACKGROUND[agent.callStatusKey]
                }`}
              >
                <div
                  className={`agent-t__agent-info--circle-center agent-t__agent-info--circle-container--${
                    PRESENCE_STATE_KEYS_COLOR.CARD_BACKGROUND[agent.callStatusKey]
                  }`}
                />
              </div>
              {PRESENCE_STATE_KEYS_COLOR.CARD_PRESENCE_STATE_TEXT[agent.callStatusKey]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AgentTable;
