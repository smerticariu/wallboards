import React from 'react';
import AgentCard from '../agent-card/agent-card';
import { SortableDragHandle } from '../sortable/sortable';
import ResizeComponent from './grid.resize-component';

const GridAgentList = ({ ...props }) => {
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
      </div>
    </ResizeComponent>
  );
};
export default GridAgentList;
