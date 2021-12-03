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

const AgentLoginTable = ({ isEditMode, tableData, widget, ...props }) => {
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
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.AGENT_LOGIN));
    };
    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <EditIcon className="i--edit i--edit--margin-right" />
      </div>
    );
  };

  return (
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.title}: </div>
          {widget.group.value}
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
    </div>
  );
};
export default AgentLoginTable;
