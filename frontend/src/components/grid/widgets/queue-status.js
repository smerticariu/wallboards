import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import moment from 'moment';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { fetchQueuedCallThunk } from '../../../store/thunk/callsQueues.thunk';
import { getQueueStatusInitialValues } from '../../../common/defaults/wallboards.defaults';
import { fetchUsersCurrentCallTimeThunk } from '../../../store/thunk/agents.thunk';
import { EditIcon } from '../../../assets/static/icons/edit';

const GridQueueStatus = ({ isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();
  const calls = useSelector((state) => state.agents.calls);
  const agentsQueues = useSelector((state) => state.agents.agentsQueues);

  const queuedCall = useSelector((state) => state.callsQueues.queuedCall[widget.callQueue.id] ?? []);
  const [queueStatusValues, handleQueueStatusValues] = useState({ ...getQueueStatusInitialValues() });
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchQueuedCallThunk(widget.callQueue.id));
      dispatch(fetchUsersCurrentCallTimeThunk());
    }, [2000]);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [widget.callQueue.id]);

  useEffect(() => {
    let queueStatusValuesCopy = { ...getQueueStatusInitialValues() };
    if (agentsQueues.length) {
      const agents = agentsQueues.find((agentQueue) => agentQueue.callQueueId === widget.callQueue.id);

      agents?.agents?.forEach((agent) => {
        ++queueStatusValuesCopy.totalAgents.value;
        const userCurrentCall = calls.filter((call) => call.userId === agent.userId || call.deviceId === agent.deviceId).pop();

        if (agent.status.toLowerCase() === 'loggedoff') {
          ++queueStatusValuesCopy.loggedOffAgents.value;
        } else if (agent.status.toLowerCase() === 'busy' || (agent.status.toLowerCase() === 'idle' && userCurrentCall)) {
          ++queueStatusValuesCopy.busyAgents.value;
        } else if (agent.status.toLowerCase() === 'idle' && agent.inWrapUp) {
          ++queueStatusValuesCopy.wrappedUpAgents.value;
        } else {
          ++queueStatusValuesCopy.availableAgents.value;
        }
      });
    }

    queuedCall.forEach((call) => {
      if (call.status.toLowerCase() !== 'connected' && call.status.toLowerCase() !== 'bridged') {
        queueStatusValuesCopy.totalCallsQueueing.value++;
      }
      queueStatusValuesCopy.mostDialAttempts.value = Math.max(call.dialAttempts, queueStatusValuesCopy.mostDialAttempts.value);
      queueStatusValuesCopy.longestTimeInQueue.value = moment
        .utc(
          Math.max(
            findEndWait(call).diff(moment.utc(call.created), 'seconds'),
            moment(queueStatusValuesCopy.longestTimeInQueue.value, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds')
          ) * 1000
        )
        .format('HH:mm:ss');
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
        <EditIcon className="i--edit i--edit--margin-right" />
      </div>
    );
  };
  const findEndWait = (call) => {
    let end = moment.utc();
    if (call.status.toLowerCase() === 'bridged' || call.status.toLowerCase() === 'connected') {
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
