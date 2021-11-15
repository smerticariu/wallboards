import React from 'react';
import { ArrowDownIcon } from '../../assets/static/icons/arrow-down';
import { SettingsIcon } from '../../assets/static/icons/settings';
import { DEFAULTS } from '../../common/defaults/defaults';
import { PRESENCE_STATE_KEYS_COLOR } from '../modal/add-component/modal.add-component.defaults';
const AgentTablePreview = ({
  canCallAgents,
  canListenLive,
  agentName,
  agentExtNo,
  currAvaiState,
  currPresState,
  noCallsOffered,
  noCallsAnswered,
  noCallsMissed,
  timeInCurrentPresenceState,
  timeInCurrentAvailabilityState,
  timeInCurrentCall,
  timeInCurrentWrapup,
  listOfSkills,
  ...props
}) => {
  return (
    <div className="agent-t">
      <div className="agent-t__header agent-t__header--preview">
        {(canCallAgents || canListenLive) && (
          <div className="agent-t__header-item agent-t__header-item--preview agent-t__header-item--preview--settings"></div>
        )}
        {agentName && <div className="agent-t__header-item agent-t__header-item--preview">Name</div>}
        {currAvaiState && <div className="agent-t__header-item agent-t__header-item--preview">Availability Status</div>}
        {agentExtNo && <div className="agent-t__header-item agent-t__header-item--preview">Phone Ext</div>}
        {noCallsOffered && <div className="agent-t__header-item agent-t__header-item--preview">Calls offered</div>}
        {noCallsAnswered && <div className="agent-t__header-item agent-t__header-item--preview">Calls answered</div>}
        {noCallsMissed && <div className="agent-t__header-item agent-t__header-item--preview">Calls missed</div>}
        {timeInCurrentPresenceState && <div className="agent-t__header-item agent-t__header-item--preview">Time in current</div>}
        {timeInCurrentAvailabilityState && <div className="agent-t__header-item agent-t__header-item--preview">Time availability</div>}
        {timeInCurrentCall && <div className="agent-t__header-item agent-t__header-item--preview">Time on cur. call</div>}
        {timeInCurrentWrapup && <div className="agent-t__header-item agent-t__header-item--preview">Time on cur. wr.</div>}
        {listOfSkills && <div className="agent-t__header-item agent-t__header-item--preview">Skills</div>}
        {currPresState && <div className="agent-t__header-item agent-t__header-item--preview ">Status</div>}
      </div>

      <div className="agent-t__body">
        {[0, 1, 2].map((index) => (
          <div key={index} className="agent-t__agent agent-t__agent--preview">
            {(canCallAgents || canListenLive) && (
              <div className="agent-t__agent-info agent-t__agent-info--preview agent-t__agent-info--preview--settings">
                <SettingsIcon onClick={() => {}} className="i--settings i--settings--table i--settings--table--small" />
              </div>
            )}
            {agentName && <div className="agent-t__agent-info agent-t__agent-info--preview">Megan Carter</div>}
            {currAvaiState && (
              <div
                className={`agent-t__agent-info agent-t__agent-info--preview agent-t__agent-info--preview--color agent-t__agent-info--${
                  PRESENCE_STATE_KEYS_COLOR.CARD_AVAILABILITY_STATUS_BACKGROUND[DEFAULTS.GRID.TABLE_PREVIEW.AVAILABILITY_COLORS[index]]
                }`}
              >
                {index === 0 && 'I’m available'}
                {index === 1 && 'I’m busy'}
                {index === 2 && 'On calls'}
                <ArrowDownIcon className="i--arrow--down i--arrow--down--table i--arrow--down--small" />
              </div>
            )}
            {agentExtNo && <div className="agent-t__agent-info agent-t__agent-info--preview">0000</div>}
            {noCallsOffered && <div className="agent-t__agent-info agent-t__agent-info--preview">0</div>}
            {noCallsAnswered && <div className="agent-t__agent-info agent-t__agent-info--preview">0</div>}
            {noCallsMissed && <div className="agent-t__agent-info agent-t__agent-info--preview">0</div>}
            {timeInCurrentPresenceState && <div className="agent-t__agent-info agent-t__agent-info--preview">- - : - - : - -</div>}
            {timeInCurrentAvailabilityState && <div className="agent-t__agent-info agent-t__agent-info--preview">- - : - - : - -</div>}
            {timeInCurrentCall && <div className="agent-t__agent-info agent-t__agent-info--preview">- - : - - : - -</div>}
            {timeInCurrentWrapup && <div className="agent-t__agent-info agent-t__agent-info--preview">- - : - - : - -</div>}
            {listOfSkills && <div className="agent-t__agent-info agent-t__agent-info--preview">skill</div>}

            {currPresState && (
              <div className="agent-t__agent-info  agent-t__agent-info--status agent-t__agent-info--status--preview">
                <div
                  className={`agent-t__agent-info__circle agent-t__agent-info__circle--preview agent-t__agent-info__circle--${
                    PRESENCE_STATE_KEYS_COLOR.CARD_BACKGROUND[DEFAULTS.GRID.TABLE_PREVIEW.AVAILABILITY_COLORS[index]]
                  }`}
                ></div>
                {PRESENCE_STATE_KEYS_COLOR.CARD_PRESENCE_STATE_TEXT[DEFAULTS.GRID.TABLE_PREVIEW.AVAILABILITY_COLORS[index]]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AgentTablePreview;
