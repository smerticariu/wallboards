import React from 'react';
import WidgetContainer from '../grid/widgets/widget-container';
import TimeInterval from '../time-interval/time-interval';

const AgentLoginTable = ({ isEditMode, tableData, widget, ...props }) => {
  return (
    <WidgetContainer widget={widget} isEditMode={isEditMode}>
      {tableData.length ? (
        <div className="widget__body widget__body--table">
          <div className="agent-login">
            <div className="agent-login__header">
              <div className="agent-login__header-item">Name</div>
              <div className="agent-login__header-item">Group</div>
              <div className="agent-login__header-item">Event</div>
              <div className="agent-login__header-item">Date & Time</div>
              <div className="agent-login__header-item">Elapsed</div>
            </div>
            <div className="agent-login__body">
              {tableData.slice(0, +widget.limitResult.value).map((user) => {
                return (
                  <div key={`${user.userId} ${user.time} ${user.elapsed} ${user.event} ${user.groupName}`} className="agent-login__row">
                    <div className="agent-login__row-item">{user.name}</div>
                    <div className="agent-login__row-item">{user.groupName}</div>
                    <div className={`agent-login__row-item agent-login__row-item--${user.isLogin ? 'login' : 'logout'}`}>{user.event}</div>
                    <div className="agent-login__row-item">{user.time}</div>
                    <div className="agent-login__row-item">
                      <TimeInterval seconds={user.elapsed} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-message empty-message--agents">No agents</div>
      )}
    </WidgetContainer>
  );
};
export default AgentLoginTable;
