import React from 'react';
import TimeInterval from '../time-interval/time-interval';
import WidgetContainer from '../grid/widgets/widget-container';

const AgentStatusTable = ({ isEditMode, tableData, widget, ...props }) => {
  const getGridTemplateColumn = () => {
    if (widget.isShowStateName && widget.isShowDisplayName) {
      return '20% 15% 16% 20% 19% 10%';
    }
    if (!widget.isShowStateName && !widget.isShowDisplayName) {
      return '30% 20% 30% 20%';
    }
    return '25% 15% 20% 25% 15%';
  };
  const gridTemplateColumn = getGridTemplateColumn();
  return (
    <WidgetContainer widget={widget} isEditMode={isEditMode}>
      {tableData.length ? (
        <div className="widget__body widget__body--table">
          <div className="agent-login agent-login--agent-status">
            <div className="agent-login__header" style={{ gridTemplateColumns: gridTemplateColumn }}>
              <div className="agent-login__header-item">Name</div>
              <div className="agent-login__header-item">Profile</div>
              {widget.isShowStateName && <div className="agent-login__header-item">State Name</div>}
              {widget.isShowDisplayName && <div className="agent-login__header-item">State Display Name</div>}
              <div className="agent-login__header-item">Date & Time</div>
              <div className="agent-login__header-item">Elapsed</div>
            </div>
            <div className="agent-login__body">
              {tableData.slice(0, widget.limitResult.value).map((user) => {
                return (
                  <div
                    key={`${user.userId} ${user.time} ${user.elapsed} ${user.profile} ${user.name} ${user.stateName} ${user.stateDisplayName}`}
                    className="agent-login__row"
                    style={{ gridTemplateColumns: gridTemplateColumn }}
                  >
                    <div className="agent-login__row-item">{user.name}</div>
                    <div className="agent-login__row-item">{user.profile}</div>
                    {widget.isShowStateName && <div className="agent-login__row-item">{user.stateName}</div>}
                    {widget.isShowDisplayName && <div className="agent-login__row-item">{user.stateDisplayName}</div>}
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
export default AgentStatusTable;
