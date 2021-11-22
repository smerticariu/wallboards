import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { SettingsIcon } from '../../../assets/static/icons/settings';
import moment from 'moment';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { PRESENCE_STATE_KEYS } from '../../../common/defaults/modal.defaults';
import { fetchQueuedCallThunk } from '../../../store/thunk/callsQueues.thunk';
import { getQueueStatusInitialValues } from '../../../common/defaults/wallboards.defaults';

const GridQueueStatus = ({ isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();
  const calls = useSelector((state) => state.agents.calls);
  const agentsQueues = useSelector((state) => state.agents.agentsQueues);

  const queuedCall = useSelector((state) => state.callsQueues.queuedCall);
  const [queueStatusValues, handleQueueStatusValues] = useState({ ...getQueueStatusInitialValues() });
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchQueuedCallThunk(widget.callQueue.id));
    }, [2000]);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [widget.callQueue.id]);

  useEffect(() => {
    let queueStatusValuesCopy = { ...getQueueStatusInitialValues() };
    if (agentsQueues.length) {
      const agents = agentsQueues.find((agentQueue) => agentQueue.callQueueId === widget.callQueue.id);
      agents?.agents.forEach((agent) => {
        queueStatusValuesCopy.total_agents.value++;
        switch (agent.status.toLowerCase()) {
          case PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF.toLowerCase():
            queueStatusValuesCopy.logged_off_agents.value++;
            break;
          case PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE.toLowerCase():
            if (agent.onCall) {
              queueStatusValuesCopy.busy_agents.value++;
              break;
            }
            if (agent.inWrapUp) {
              queueStatusValuesCopy.wrapped_up_agents.value++;
              break;
            }
            queueStatusValuesCopy.available_agents.value++;
            break;
          case PRESENCE_STATE_KEYS.AGENT_STATUS_BUSY.toLowerCase():
            queueStatusValuesCopy.busy_agents.value++;
            break;
          default:
            queueStatusValuesCopy.available_agents.value++;
        }
      });
    }
    queuedCall.forEach((call) => {
      if (call.status.toLowerCase() !== 'connected' && call.status.toLowerCase() !== 'bridged') {
        queueStatusValues.total_calls_queueing.value++;
        queueStatusValues.most_dial_attempts.value = Math.max(call.dialAttempts, queueStatusValues.most_dial_attempts.value);
        queueStatusValues.longest_time_in_queue.value = Math.max(
          findEndWait(call).diff(moment.utc(call.created), 'second'),
          queueStatusValues.longest_time_in_queue.value
        );
      }
    });
    handleQueueStatusValues(queueStatusValuesCopy);
    // eslint-disable-next-line
  }, [calls, agentsQueues]);
  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.QUEUE_STATUS));
    };

    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <SettingsIcon className="i--settings i--settings--call-status" />
      </div>
    );
  };
  const findEndWait = (call) => {
    let end = moment.utc();
    if (call.status === 'bridged' || call.status === 'connected') {
      const findCall = calls.find((callFromBE) => callFromBE.uuid === call.uuid);
      if (findCall?.answerTime) {
        end = moment.utc(findCall.answerTime);
      }
    }
    return moment(end);
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
          <div className="widget__title--bold">{widget.title}: </div>
          {widget.callQueue.value}
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
        {Object.keys(queueStatusValues).map((key) => (
          <div key={key} className="widget__call-status-row">
            <div className="widget__call-status-title">{queueStatusValues[key].title}</div>
            <div className="widget__call-status-data">
              <div
                className={`widget__call-status-data__column widget__call-status-data__column`}
                style={{ backgroundColor: queueStatusValues[key].color }}
              >
                {queueStatusValues[key].value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GridQueueStatus;
