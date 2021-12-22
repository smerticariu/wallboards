import React from 'react';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from '../../../store/actions/modal.action';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { EditIcon } from '../../../assets/static/icons/edit';
import { CloseIcon } from '../../../assets/static/icons/close';
import { useDispatch } from 'react-redux';
import { WIDGET_TYPE } from '../../../common/defaults/modal.defaults';

const WidgetContainer = ({ widget, isEditMode, children, ...props }) => {
  const dispatch = useDispatch();

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES[widget.type]));
    };

    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <EditIcon className="i--edit i--edit--margin-right" />
      </div>
    );
  };

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
  const getWidgetTitle = () => {
    switch (widget.type) {
      case WIDGET_TYPE.AGENT_LIST: {
        return widget.callQueue.name;
      }
      case WIDGET_TYPE.CALL_STATUS: {
        return '';
      }
      case WIDGET_TYPE.QUEUE_TRACKING: {
        return widget.callQueue.value;
      }
      case WIDGET_TYPE.QUEUE_STATUS: {
        return widget.callQueue.value;
      }
      case WIDGET_TYPE.CALL_TRACKING: {
        return widget.period.value;
      }
      case WIDGET_TYPE.AGENT_LOGIN: {
        return widget.group.value;
      }
      case WIDGET_TYPE.AGENT_STATUS: {
        return widget.period.value;
      }
      case WIDGET_TYPE.QUEUE_LIST: {
        return (
          <>
            {widget.callQueue.value} - {widget.isCallStatusConnected && widget.isCallStatusWaiting && 'All Calls'}
            {widget.isCallStatusConnected && !widget.isCallStatusWaiting && 'Connected'}
            {!widget.isCallStatusConnected && widget.isCallStatusWaiting && 'Waiting'}
          </>
        );
      }
      default:
        return '';
    }
  };
  return (
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.title}: </div>
          {getWidgetTitle()}
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
      {children}
    </div>
  );
};
export default WidgetContainer;
