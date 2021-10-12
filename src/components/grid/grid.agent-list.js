import React from 'react';
import AgentCard from '../agent-card/agent-card';
import AgentTable from '../agent-table/agent-table';
import { MAIN_VIEWING_OPTIONS } from '../modal/add-component/modal.add-component.defaults';
import { SortableDragHandle } from '../sortable/sortable';
import ResizeComponent from './grid.resize-component';

const GridAgentList = ({ widget, ...props }) => {
  return (
    <ResizeComponent className="a-list">
      <div className="a-list__header">
        <SortableDragHandle>
          <div className="a-list__title">
            <div className="a-list__title--bold">Agent List:</div>
            Not urgent but somewhat important queue
          </div>
        </SortableDragHandle>
        <div className="a-list__icons">
          <div className="a-list__edit-icon">E</div>
          <div className="a-list__delete-icon">D</div>
        </div>
      </div>
      <div className="a-list__body">
        {widget.view === MAIN_VIEWING_OPTIONS.CARD ? (
          <>
            <AgentCard
              callStatus="Inbound Call"
              callTime="--:--:--"
              ext="0000"
              name="Staff Member Name"
              status="User online status"
              totalTime="00:00:00"
            />
            <AgentCard
              callStatus="Inbound Call"
              callTime="--:--:--"
              ext="0000"
              name="Staff Member Name"
              status="User online status"
              totalTime="00:00:00"
            />
            <AgentCard
              callStatus="Inbound Call"
              callTime="--:--:--"
              ext="0000"
              name="Staff Member Name"
              status="User online status"
              totalTime="00:00:00"
            />
          </>
        ) : (
          <>
            <AgentTable
              agentName={'Test Value'}
              agentExtNo={'Test Value'}
              currAvaiState={'Test Value'}
              // currPresState={'Test Value'}
              // noCallsOffered={'Test Value'}
              // noCallsAnswered={'Test Value'}
              // noCallsMissed={'Test Value'}
              // timeInCurrentPresenceState={'Test Value'}
              // timeInCurrentAvailabilityState={'Test Value'}
              timeInCurrentCall={'Test Value'}
              timeInCurrentWrapup={'Test Value'}
              listOfSkills={'Test Value'}
            />
          </>
        )}
      </div>
    </ResizeComponent>
  );
};
export default GridAgentList;
