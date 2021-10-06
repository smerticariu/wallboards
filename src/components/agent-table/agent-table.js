import React from "react";
import { ArrowDownIcon } from "src/assets/static/icons/arrow-down";
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
      <div className="agent-t__table">
        <div className="agent-t__head">
          {agentName && <div className="agent-t__head-td">Name</div>}
          {currAvaiState && (
            <div className="agent-t__head-td">Availability Status</div>
          )}
          {agentExtNo && <div className="agent-t__head-td">Phone Number</div>}
          {currPresState && (
            <div className="agent-t__head-td">Presence Status</div>
          )}
          {noCallsOffered && (
            <div className="agent-t__head-td">Calls offered</div>
          )}
          {noCallsAnswered && (
            <div className="agent-t__head-td">Calls answered</div>
          )}
          {noCallsMissed && (
            <div className="agent-t__head-td">Calls missed</div>
          )}
          {timeInCurrentPresenceState && (
            <div className="agent-t__head-td">Time in current</div>
          )}
          {timeInCurrentAvailabilityState && (
            <div className="agent-t__head-td">Time availability</div>
          )}
          {timeInCurrentCall && (
            <div className="agent-t__head-td">Time on cur. call</div>
          )}
          {timeInCurrentWrapup && (
            <div className="agent-t__head-td">Time on cur. wr.</div>
          )}
          {listOfSkills && <div className="agent-t__head-td">Skills</div>}
          {<div className="agent-t__head-td" />}
        </div>

        <div className="agent-t__body">
          <div className="agent-t__body-tr">
            {agentName && (
              <div className="agent-t__body-tr__td">Megan Carter</div>
            )}
            {currAvaiState && (
              <div className="agent-t__body-tr__td agent-t__body-tr__td--red ">
                Busy on calls
                <ArrowDownIcon className="i--arrow--down i--arrow--down--table" />
              </div>
            )}
            {agentExtNo && <div className="agent-t__body-tr__td">0000</div>}
            {currPresState && (
              <div className="agent-t__body-tr__td">Inbound Call</div>
            )}
            {noCallsOffered && <div className="agent-t__body-tr__td">0</div>}
            {noCallsAnswered && <div className="agent-t__body-tr__td">0</div>}
            {noCallsMissed && <div className="agent-t__body-tr__td">0</div>}
            {timeInCurrentPresenceState && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {timeInCurrentAvailabilityState && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {timeInCurrentCall && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {timeInCurrentWrapup && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {listOfSkills && <div className="agent-t__body-tr__td">skill</div>}
            <div className="agent-t__body-tr__td agent-t__body-tr__td--circle">
              <div className="agent-t__body-tr__td--circle-container">
                <div className="agent-t__body-tr__td--circle-center"></div>
              </div>
              Idle
            </div>
          </div>
          <div className="agent-t__body-tr">
            {agentName && (
              <div className="agent-t__body-tr__td">Megan Carter</div>
            )}
            {currAvaiState && (
              <div className="agent-t__body-tr__td agent-t__body-tr__td--green ">
                I’m available for calls
                <ArrowDownIcon className="i--arrow--down i--arrow--down--table" />
              </div>
            )}
            {agentExtNo && (
              <div className="agent-t__body-tr__td">agentExtNo</div>
            )}
            {currPresState && (
              <div className="agent-t__body-tr__td">Inbound Call</div>
            )}
            {noCallsOffered && <div className="agent-t__body-tr__td">0</div>}
            {noCallsAnswered && <div className="agent-t__body-tr__td">0</div>}
            {noCallsMissed && <div className="agent-t__body-tr__td">0</div>}
            {timeInCurrentPresenceState && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {timeInCurrentAvailabilityState && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {timeInCurrentCall && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {timeInCurrentWrapup && (
              <div className="agent-t__body-tr__td">- - : - - : - -</div>
            )}
            {listOfSkills && <div className="agent-t__body-tr__td">skill</div>}
            <div className="agent-t__body-tr__td agent-t__body-tr__td--circle">
              <div className="agent-t__body-tr__td--circle-container">
                <div className="agent-t__body-tr__td--circle-center"></div>
              </div>
              Idle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AgentTable;
