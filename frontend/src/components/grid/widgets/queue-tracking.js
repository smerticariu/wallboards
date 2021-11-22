import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { SettingsIcon } from '../../../assets/static/icons/settings';

import { DEFAULTS } from '../../../common/defaults/defaults';
import { CALL_DIRECTION } from '../../../common/defaults/modal.defaults';
const getCallsInitialValues = () => ({
  inbound: { value: 0, prevalue: 0 },
  outbound: { value: 0, prevalue: 0 },
  internal: { value: 0 },
  relayed: { value: 0 },
  feature: { value: 0 },
  uncategorised: { value: 0 },
});
const GridQueueTracking = ({ isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();
  const calls = useSelector((state) => state.agents.calls);
  const [noOfCalls, handleNoOfCalls] = useState({ ...getCallsInitialValues() });
  useEffect(() => {
    let noOfCallsCopy = { ...getCallsInitialValues() };
    calls.forEach((callGroup) =>
      callGroup.channels.forEach((call) => {
        switch (call.direction) {
          case CALL_DIRECTION.INBOUND:
            noOfCallsCopy.inbound.value++;
            break;
          case CALL_DIRECTION.OUTBOUND:
            noOfCallsCopy.outbound.value++;
            break;
          case CALL_DIRECTION.INTERNAL:
            noOfCallsCopy.internal.value++;
            break;
          case CALL_DIRECTION.INCOMING:
            noOfCallsCopy.inbound.prevalue++;
            break;
          case CALL_DIRECTION.OUTGOING:
            noOfCallsCopy.outbound.prevalue++;
            break;
          case CALL_DIRECTION.RELAYED:
            noOfCallsCopy.relayed.value++;
            break;
          case CALL_DIRECTION.FEATURE:
            noOfCallsCopy.feature.value++;
            break;
          default:
            noOfCallsCopy.uncategorised.value++;
        }
      })
    );
    handleNoOfCalls(noOfCallsCopy);
  }, [calls]);
  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.QUEUE_TRACKING));
    };

    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <SettingsIcon className="i--settings i--settings--call-status" />
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

  return (
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.title}</div>
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
      <div className={`widget__body widget__body--call-status`}>
        {Object.keys(noOfCalls).map((key) => (
          <div key={key} className="widget__call-status-row">
            <div className="widget__call-status-title">{key}</div>
            <div className="widget__call-status-data widget__call-status-data--two-columns">
              {Object.keys(noOfCalls[key]).map((valueKey) => (
                <div key={valueKey} className="widget__call-status-data__column">
                  {noOfCalls[key][valueKey]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GridQueueTracking;
