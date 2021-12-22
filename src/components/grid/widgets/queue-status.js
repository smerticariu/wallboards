import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getQueueStatusInitialValues } from '../../../common/defaults/wallboards.defaults';
import WidgetContainer from './widget-container';

const GridQueueStatus = ({ isEditMode, widget, ...props }) => {
  const callsWithLogicalDirection = useSelector((state) => state.agents.callsWithLogicalDirection);
  const agentsQueues = useSelector((state) => state.agents.agentsQueues);

  const queuedCall = useSelector((state) => state.callsQueues.queuedCall);
  const [queueStatusValues, handleQueueStatusValues] = useState({ ...getQueueStatusInitialValues() });
  useEffect(() => {
    let queueStatusValuesCopy = { ...getQueueStatusInitialValues() };
    const agents = agentsQueues[widget.callQueue.id] ?? [];

    agents.forEach((agent) => {
      ++queueStatusValuesCopy.totalAgents.value;
      const userCurrentCall = callsWithLogicalDirection
        .filter((call) => call.userId === agent.userId || call.deviceId === agent.deviceId)
        .pop();

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
    const queuedCalls = queuedCall[widget.callQueue.id] ?? [];

    queuedCalls.forEach((call) => {
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
  }, [callsWithLogicalDirection, agentsQueues]);

  const findEndWait = (call) => {
    let end = moment.utc();
    if (call.status.toLowerCase() === 'bridged' || call.status.toLowerCase() === 'connected') {
      const findCall = callsWithLogicalDirection.find((callFromBE) => callFromBE.uuid === call.uuid);
      if (findCall?.answerTime) {
        end = moment.utc(findCall.answerTime);
      }
    }
    return moment(end);
  };
  return (
    <WidgetContainer widget={widget} isEditMode={isEditMode}>
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
    </WidgetContainer>
  );
};
export default GridQueueStatus;
