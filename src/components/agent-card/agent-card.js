import img from 'src/assets/static/images/not_exist_people.png';
import React from 'react';
const AgentCard = ({ name, ext, status, totalTime, callTime, callStatus, ...props }) => {
  return (
    <div className="agent-c">
      <div className="agent-c__header">
        <div className="agent-c__user">
          <div
            className="agent-c__user-image"
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
          <div className="agent-c__user-name-ext">
            <div className="agent-c__user-name">{name}</div>
            <div className="agent-c__user-ext">Ext: {ext}</div>
          </div>
        </div>
        <div className="agent-c__setiings-icon">x</div>
      </div>
      <div className="agent-c__status-time">
        <div className="agent-c__status">{status}</div>
        <div className="agent-c__time">{totalTime}</div>
      </div>
      <div className="agent-c__body">
        <div className="agent-c__call-time-text">Call time</div>
        <div className="agent-c__call-time-container">
          <div className="agent-c__call-time">{callTime}</div>
        </div>
        <div className="agent-c__footer">{callStatus}</div>
      </div>
    </div>
  );
};
export default AgentCard;