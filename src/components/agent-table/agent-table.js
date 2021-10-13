import React from 'react';
import { ArrowDownIcon } from 'src/assets/static/icons/arrow-down';
import { previewAvailabilityStatusColors, previewStatusColors } from './agent-table.defaults';
const AgentTable = ({ agents, ...props }) => {
  return (
    <div className="agent-t">
      <div className="agent-t__header agent-t__header">
        {agents[0].agentName && <div className="agent-t__header-item agent-t__header-item">Name</div>}
        {agents[0].currAvaiState && <div className="agent-t__header-item agent-t__header-item">Availability Status</div>}
        {agents[0].agentExtNo && <div className="agent-t__header-item agent-t__header-item">Phone Number</div>}
        {agents[0].currPresState && <div className="agent-t__header-item agent-t__header-item">Presence Status</div>}
        {agents[0].noCallsOffered && <div className="agent-t__header-item agent-t__header-item">Calls offered</div>}
        {agents[0].noCallsAnswered && <div className="agent-t__header-item agent-t__header-item">Calls answered</div>}
        {agents[0].noCallsMissed && <div className="agent-t__header-item agent-t__header-item">Calls missed</div>}
        {agents[0].timeInCurrentPresenceState && <div className="agent-t__header-item agent-t__header-item">Time in current</div>}
        {agents[0].timeInCurrentAvailabilityState && <div className="agent-t__header-item agent-t__header-item">Time availability</div>}
        {agents[0].timeInCurrentCall && <div className="agent-t__header-item agent-t__header-item">Time on cur. call</div>}
        {agents[0].timeInCurrentWrapup && <div className="agent-t__header-item agent-t__header-item">Time on cur. wr.</div>}
        {agents[0].listOfSkills && <div className="agent-t__header-item agent-t__header-item">Skills</div>}
        {<div className="agent-t__header-item agent-t__header-item ">Status</div>}
      </div>

      <div className="agent-t__body">
        {agents.map((agent, index) => (
          <div key={index} className="agent-t__agent agent-t__agent">
            {agent.agentName && <div className="agent-t__agent-info agent-t__agent-info">Megan Carter</div>}
            {agent.currAvaiState && (
              <div className={`agent-t__agent-info agent-t__agent-info agent-t__agent-info--${previewAvailabilityStatusColors[index]}`}>
                {agent.currAvaiState}
                <ArrowDownIcon className="i--arrow--down i--arrow--down--table i--arrow--down--large" />
              </div>
            )}
            {agent.agentExtNo && <div className="agent-t__agent-info agent-t__agent-info">{agent.agentExtNo}</div>}
            {agent.currPresState && <div className="agent-t__agent-info agent-t__agent-info">{agent.currPresState}</div>}
            {agent.noCallsOffered && <div className="agent-t__agent-info agent-t__agent-info">{agent.noCallsOffered}</div>}
            {agent.noCallsAnswered && <div className="agent-t__agent-info agent-t__agent-info">{agent.noCallsAnswered}</div>}
            {agent.noCallsMissed && <div className="agent-t__agent-info agent-t__agent-info">{agent.noCallsMissed}</div>}
            {agent.timeInCurrentPresenceState && (
              <div className="agent-t__agent-info agent-t__agent-info">{agent.timeInCurrentPresenceState}</div>
            )}
            {agent.timeInCurrentAvailabilityState && (
              <div className="agent-t__agent-info agent-t__agent-info">{agent.timeInCurrentAvailabilityState}</div>
            )}
            {agent.timeInCurrentCall && <div className="agent-t__agent-info agent-t__agent-info">{agent.timeInCurrentCall}</div>}
            {agent.timeInCurrentWrapup && <div className="agent-t__agent-info agent-t__agent-info">{agent.timeInCurrentWrapup}</div>}
            {agent.listOfSkills && <div className="agent-t__agent-info agent-t__agent-info">{agent.listOfSkills}</div>}
            <div className="agent-t__agent-info agent-t__agent-info--circle agent-t__agent-info--circle">
              <div
                className={`agent-t__agent-info--circle-container agent-t__agent-info--circle-container--${previewStatusColors[index]} agent-t__agent-info--circle-container`}
              >
                <div
                  className={`agent-t__agent-info--circle-center agent-t__agent-info--circle-container--${previewStatusColors[index]} agent-t__agent-info--circle-center`}
                />
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
