import React from 'react';
import { ArrowDownIcon } from '../../assets/static/icons/arrow-down';
import { ADD_COMPONENT_COLUMN_OPTIONS, PRESENCE_STATE_KEYS_COLOR } from '../modal/add-component/modal.add-component.defaults';
const AgentTable = ({ columnsToView, agents, ...props }) => {
  const activeColumns = {
    isAgentNameColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME),
    isAgentExtNoColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_EXTENSION),
    isCurrAvaiStateColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY),
    isCurrPresStateColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_PRESENCE),
    isNoCallsOfferedColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED),
    isNoCallsAnsweredColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED),
    isNoCallsMissedColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED),
    isTimeInCurrentPresenceStateColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE),
    isTimeInCurrentAvailabilityStateColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_AVAILABILITY),
    isTimeInCurrentCallColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_CALL),
    isTimeInCurrentWrapupColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP),
    isListOfSkillsColumn: columnsToView.includes(ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES),
  };
  const noOfCols = Object.keys(activeColumns).filter((key) => activeColumns[key]).length;
  const colWidth = 100 / noOfCols + '%';

  return (
    <div className="agent-t">
      <div className="agent-t__header">
        {activeColumns.isAgentNameColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Name
          </div>
        )}
        {activeColumns.isCurrAvaiStateColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Availability Status
          </div>
        )}
        {activeColumns.isAgentExtNoColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Phone Number
          </div>
        )}
        {activeColumns.isCurrPresStateColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Presence Status
          </div>
        )}
        {activeColumns.isNoCallsOfferedColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Calls offered
          </div>
        )}
        {activeColumns.isNoCallsAnsweredColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Calls answered
          </div>
        )}
        {activeColumns.isNoCallsMissedColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Calls missed
          </div>
        )}
        {activeColumns.isTimeInCurrentPresenceStateColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time in current
          </div>
        )}
        {activeColumns.isTimeInCurrentAvailabilityStateColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time availability
          </div>
        )}
        {activeColumns.isTimeInCurrentCallColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time on cur. call
          </div>
        )}
        {activeColumns.isTimeInCurrentWrapupColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time on cur. wr.
          </div>
        )}
        {activeColumns.isListOfSkillsColumn && (
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
            {activeColumns.isAgentNameColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                Megan Carter
              </div>
            )}
            {activeColumns.isCurrAvaiStateColumn && (
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
            {activeColumns.isAgentExtNoColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.agentExtNo}
              </div>
            )}
            {activeColumns.isCurrPresStateColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.currPresState}
              </div>
            )}
            {activeColumns.isNoCallsOfferedColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.noCallsOffered}
              </div>
            )}
            {activeColumns.isNoCallsAnsweredColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.noCallsAnswered}
              </div>
            )}
            {activeColumns.isNoCallsMissedColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.noCallsMissed}
              </div>
            )}
            {activeColumns.isTimeInCurrentPresenceStateColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentPresenceState}
              </div>
            )}
            {activeColumns.isTimeInCurrentAvailabilityStateColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentAvailabilityState}
              </div>
            )}
            {activeColumns.isTimeInCurrentCallColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentCall}
              </div>
            )}
            {activeColumns.isTimeInCurrentWrapupColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.timeInCurrentWrapup}
              </div>
            )}
            {activeColumns.isListOfSkillsColumn && (
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
