import React from 'react';
import { ArrowDownIcon } from 'src/assets/static/icons/arrow-down';
const AgentTable = ({
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
      <div className="agent-t__header agent-t__header">
        {agentName && <div className="agent-t__header-item agent-t__header-item">Name</div>}
        {currAvaiState && <div className="agent-t__header-item agent-t__header-item">Availability Status</div>}
        {agentExtNo && <div className="agent-t__header-item agent-t__header-item">Phone Number</div>}
        {currPresState && <div className="agent-t__header-item agent-t__header-item">Presence Status</div>}
        {noCallsOffered && <div className="agent-t__header-item agent-t__header-item">Calls offered</div>}
        {noCallsAnswered && <div className="agent-t__header-item agent-t__header-item">Calls answered</div>}
        {noCallsMissed && <div className="agent-t__header-item agent-t__header-item">Calls missed</div>}
        {timeInCurrentPresenceState && <div className="agent-t__header-item agent-t__header-item">Time in current</div>}
        {timeInCurrentAvailabilityState && <div className="agent-t__header-item agent-t__header-item">Time availability</div>}
        {timeInCurrentCall && <div className="agent-t__header-item agent-t__header-item">Time on cur. call</div>}
        {timeInCurrentWrapup && <div className="agent-t__header-item agent-t__header-item">Time on cur. wr.</div>}
        {listOfSkills && <div className="agent-t__header-item agent-t__header-item">Skills</div>}
        {<div className="agent-t__header-item agent-t__header-item ">Status</div>}
      </div>

      <div className="agent-t__body">
        {[0, 1].map((n) => (
          <div key={n} className="agent-t__agent agent-t__agent">
            {agentName && <div className="agent-t__agent-info agent-t__agent-info">Megan Carter</div>}
            {currAvaiState && (
              <div className={`agent-t__agent-info agent-t__agent-info agent-t__agent-info${n ? '--red' : '--green'}`}>
                {n ? 'Busy on calls' : 'I’m available'}
                <ArrowDownIcon className="i--arrow--down i--arrow--down--table" />
              </div>
            )}
            {agentExtNo && <div className="agent-t__agent-info agent-t__agent-info">0000</div>}
            {currPresState && <div className="agent-t__agent-info agent-t__agent-info">Inbound Call</div>}
            {noCallsOffered && <div className="agent-t__agent-info agent-t__agent-info">0</div>}
            {noCallsAnswered && <div className="agent-t__agent-info agent-t__agent-info">0</div>}
            {noCallsMissed && <div className="agent-t__agent-info agent-t__agent-info">0</div>}
            {timeInCurrentPresenceState && <div className="agent-t__agent-info agent-t__agent-info">- - : - - : - -</div>}
            {timeInCurrentAvailabilityState && <div className="agent-t__agent-info agent-t__agent-info">- - : - - : - -</div>}
            {timeInCurrentCall && <div className="agent-t__agent-info agent-t__agent-info">- - : - - : - -</div>}
            {timeInCurrentWrapup && <div className="agent-t__agent-info agent-t__agent-info">- - : - - : - -</div>}
            {listOfSkills && <div className="agent-t__agent-info agent-t__agent-info">skill</div>}
            <div className="agent-t__agent-info agent-t__agent-info--circle agent-t__agent-info--circle">
              <div className="agent-t__agent-info--circle-container agent-t__agent-info--circle-container">
                <div className="agent-t__agent-info--circle-center agent-t__agent-info--circle-center"></div>
              </div>
              Idle
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AgentTable;
