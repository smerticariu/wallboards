import React from 'react';
import { useDispatch } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { EditIcon } from '../../assets/static/icons/edit';
import { DEFAULTS } from '../../common/defaults/defaults';
import TimeInterval from '../time-interval/time-interval';

const AgentStatusTable = ({ isEditMode, tableData, widget, ...props }) => {
  const dispatch = useDispatch();

  const handleDeleteIcon = () => {
    const onDeleteClick = () => {
      dispatch(setWallboardComponentForDeleteAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD_COMPONENT));
    };
    return (
      <div onClick={onDeleteClick} className="widget__delete-icon">
        <CloseIcon className="i--close i--close--small" />
      </div>
    );
  };

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.AGENT_STATUS));
    };
    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <EditIcon className="i--edit i--edit--margin-right" />
      </div>
    );
  };
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
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.title}: </div>
          {widget.period.value}
        </div>
        <div className="widget__icons">
          {isEditMode && (
            <>
              {handleEditIcon()}
              {handleDeleteIcon()}
            </>
          )}
        </div>
      </div>
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
    </div>
  );
};
export default AgentStatusTable;
