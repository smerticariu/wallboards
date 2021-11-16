import React from 'react';
import { useDispatch } from 'react-redux';
import { ArrowDownIcon } from '../../assets/static/icons/arrow-down';
import { SettingsIcon } from '../../assets/static/icons/settings';
import { DEFAULTS } from '../../common/defaults/defaults';
import { ADD_COMPONENT_COLUMN_OPTIONS } from '../../common/defaults/modal.defaults';
import { callAgentThunk, listenLiveThunk } from '../../store/thunk/agents.thunk';
import Dropdown from '../dropdown/dropdown';
import TimeInterval from '../time-interval/time-interval';
const AgentTable = ({
  canCallAgents,
  canListenLive,
  canChangeAvailabilityState,
  availabilityStatesList,
  handleAgentAvailabilityState,
  columnsToView,
  agents,
  ...props
}) => {
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
  const colWidth = 100 / (activeColumns.isCurrPresStateColumn ? noOfCols - 1 : noOfCols) + '%';

  const dispatch = useDispatch();

  const handleCallAgent = (id) => {
    dispatch(callAgentThunk(id));
  };

  const handleListenLive = (id) => {
    dispatch(listenLiveThunk(id));
  };

  return (
    <div className="agent-t">
      <div className="agent-t__header">
        {(canListenLive || canCallAgents) && <div className="agent-t__header-item agent-t__header-item--settings"></div>}
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
            Extension No
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
            Time in current p.state
          </div>
        )}
        {activeColumns.isTimeInCurrentAvailabilityStateColumn && (
          <div className="agent-t__header-item" style={{ width: colWidth }}>
            Time in current a.state
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
        {activeColumns.isCurrPresStateColumn && <div className="agent-t__header-item agent-t__header-item--status">Status</div>}
      </div>

      <div className="agent-t__body">
        {agents?.map((agent, index) => (
          <div key={`${agent.userId} ${index}`} className="agent-t__agent">
            {(canListenLive || canCallAgents) && (
              <div className="agent-t__agent-info agent-t__agent-info--settings">
                <Dropdown closeOnClick={true} trigger={<SettingsIcon className="i--settings i--settings--table" />}>
                  {canListenLive && (
                    <div
                      className="c-dropdown__item"
                      onClick={() => {
                        handleListenLive(agent.id);
                      }}
                    >
                      Listen live
                    </div>
                  )}
                  {canCallAgents && (
                    <div
                      onClick={() => {
                        handleCallAgent(agent.id);
                      }}
                      className="c-dropdown__item"
                    >
                      Call agent
                    </div>
                  )}
                </Dropdown>
              </div>
            )}
            {activeColumns.isAgentNameColumn && (
              <div className="agent-t__agent-info agent-t__agent-info--name" style={{ width: colWidth }}>
                {agent.agentName.length > DEFAULTS.GRID.MAX_NAME_CHARACTERS ? (
                  <Dropdown
                    className="c-dropdown--availability-state"
                    openOnHover={true}
                    closeOnHover={true}
                    containerClassName={'c-dropdown__container--agent-name'}
                    trigger={<div className="c-dropdown__trigger--agent-name">{agent.agentName}</div>}
                  >
                    <div className="c-dropdown--agent-name">{agent.agentName}</div>
                  </Dropdown>
                ) : (
                  agent.agentName
                )}
              </div>
            )}
            {activeColumns.isCurrAvaiStateColumn && (
              <div
                className={`agent-t__agent-info ${canChangeAvailabilityState ? 'agent-t__agent-info--overflow' : ''} agent-t__agent-info--${
                  DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_AVAILABILITY_STATUS_BACKGROUND[agent.callStatusKey]
                }`}
                style={{ width: colWidth }}
              >
                {canChangeAvailabilityState ? (
                  <>
                    <Dropdown
                      className="c-dropdown--availability-state"
                      closeOnClick={true}
                      containerClassName="c-dropdown__container--availability"
                      trigger={<div className="c-dropdown__trigger--agent-name">{agent.currAvaiState}</div>}
                    >
                      {availabilityStatesList.map((state) => (
                        <div
                          key={`${state.availabilityProfileId} ${state.availabilityStateId}`}
                          onClick={() =>
                            handleAgentAvailabilityState(
                              agent.id,
                              state.availabilityProfileId,
                              state.availabilityStateId,
                              state.availabilityStateName
                            )
                          }
                          className="c-dropdown__item"
                        >
                          {state.availabilityStateDisplayName}
                        </div>
                      ))}
                    </Dropdown>
                    <ArrowDownIcon className="i--arrow--down i--arrow--down--table i--arrow--down--large" />
                  </>
                ) : (
                  agent.currAvaiState
                )}
              </div>
            )}
            {activeColumns.isAgentExtNoColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.agentExtNo}
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
                <TimeInterval seconds={agent.timeInCurrentPresenceState} />
              </div>
            )}
            {activeColumns.isTimeInCurrentAvailabilityStateColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                <TimeInterval seconds={agent.timeInCurrentAvailabilityState} />
              </div>
            )}
            {activeColumns.isTimeInCurrentCallColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                <TimeInterval seconds={agent.timeInCurrentCall} />
              </div>
            )}
            {activeColumns.isTimeInCurrentWrapupColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                <TimeInterval seconds={agent.timeInCurrentWrapup} />
              </div>
            )}
            {activeColumns.isListOfSkillsColumn && (
              <div className="agent-t__agent-info" style={{ width: colWidth }}>
                {agent.listOfSkills.length ? (
                  <Dropdown closeOnClick={true} trigger={<div className="agent-t__agent-info__skills">...</div>}>
                    {agent.listOfSkills.map((skill, index) => (
                      <div key={index} className="c-dropdown__item">
                        {skill.description}
                      </div>
                    ))}
                  </Dropdown>
                ) : (
                  'None'
                )}
              </div>
            )}
            {activeColumns.isCurrPresStateColumn && (
              <div className="agent-t__agent-info  agent-t__agent-info--status">
                <div
                  className={`agent-t__agent-info__circle agent-t__agent-info__circle--${
                    DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_BACKGROUND[agent.callStatusKey]
                  }`}
                ></div>
                {DEFAULTS.MODAL.ADD_COMPONENT.PRESENCE_STATE_KEYS_COLOR.CARD_PRESENCE_STATE_TEXT[agent.callStatusKey]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AgentTable;
