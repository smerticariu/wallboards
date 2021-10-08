import React, { useRef } from 'react';
import useResize from 'src/common/hooks/useResize';
import AgentCard from '../agent-card/agent-card';

const GridAgentList = ({ ...props }) => {
  const agentListRef = useRef();
  const agentListBodyRef = useRef();
  const agentListHeaderRef = useRef();
  const onResize = (event) => {
    if (event.detail.height === event.target.scrollHeight) return;
    agentListRef.current.style.height = agentListBodyRef.current.scrollHeight + agentListHeaderRef.current.scrollHeight + 10 + 'px';
  };

  useResize(agentListRef, onResize);
  return (
    <div ref={agentListRef} className="a-list">
      <div ref={agentListHeaderRef} className="a-list__header">
        <div className="a-list__title">
          <div className="a-list__title--bold">Agent List:</div>
          Not urgent but somewhat important queue
        </div>
        <div className="a-list__icons">
          <div className="a-list__edit-icon">E</div>
          <div className="a-list__delete-icon">D</div>
        </div>
      </div>
      <div ref={agentListBodyRef} className="a-list__body">
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
    </div>
  );
};
export default GridAgentList;
