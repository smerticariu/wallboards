import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QUEUE_LIST_COLUMN_OPTIONS } from '../../../common/defaults/modal.defaults';
import { callsToObject } from '../../../common/utils/callsToObject';
import { findTimeAtHeadOfQueue } from '../../../common/utils/findTimeAtHeadOfQueue';
import { findTimeInQueue } from '../../../common/utils/findTimeInQueue';
import { fetchOrganisationAgentsThunk } from '../../../store/thunk/agents.thunk';
import { fetchQueuedCallThunk } from '../../../store/thunk/callsQueues.thunk';
import QueueListTable from '../../tables/table.queue-list';

const GridQueueList = ({ widget, ...props }) => {
  const allAgents = useSelector((state) => state.agents.allAgents);
  const calls = useSelector((state) => state.agents.calls);
  const queuedCall = useSelector((state) => state.callsQueues.queuedCall);

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    dispatch(fetchQueuedCallThunk(widget.callQueue.id));
    const interval = setInterval(() => {
      dispatch(fetchQueuedCallThunk(widget.callQueue.id));
    }, [2000]);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [widget]);

  useEffect(() => {
    dispatch(fetchOrganisationAgentsThunk());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let activeCalls = { ...callsToObject(calls, 'uuid'), ...callsToObject(calls, 'originatorUuid') };
    let queuedCallCopy = [...queuedCall];

    queuedCallCopy = queuedCallCopy.filter((call) => {
      const status = call.status.toLowerCase();
      if (status === 'ringing' || status === 'waiting') {
        return widget.isCallStatusWaiting;
      }
      if (status === 'bridged' || status === 'connected') {
        return widget.isCallStatusConnected;
      }
      return true;
    });

    queuedCallCopy = queuedCallCopy.map((call, key) => {
      call.timeInQueue = findTimeInQueue(call, activeCalls);
      call.timeAtHeadOfQueue = findTimeAtHeadOfQueue(call);
      return call;
    });
    setTableData(
      queuedCallCopy.map((call) => ({
        [QUEUE_LIST_COLUMN_OPTIONS.CALLER_NUMBER]: call.callerIdNumber,
        [QUEUE_LIST_COLUMN_OPTIONS.CALLER_NAME]: call.callerIdName,
        [QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE]: call.position,
        [QUEUE_LIST_COLUMN_OPTIONS.PRIORITY]: call.priority,
        [QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE]: call.timeInQueue,
        [QUEUE_LIST_COLUMN_OPTIONS.DIAL_ATTEMPTS]: call.dialAttempts,
        [QUEUE_LIST_COLUMN_OPTIONS.STATUS]: call.status,
        [QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]: 'unknown',
        [QUEUE_LIST_COLUMN_OPTIONS.SKILLS_REQUESTED]: 'unknown',
        [QUEUE_LIST_COLUMN_OPTIONS.SKILLS_SHORTAGE]: 'unknown',
        [QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE]: call.timeAtHeadOfQueue,
        [QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED]: call.callbackRequested,
        [QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS]: call.callbackAttempts,
        [QUEUE_LIST_COLUMN_OPTIONS.FLAGS]: 'unknown',
        uuid: call.uuid,
        agentId: call.userId,
      }))
    );
    // eslint-disable-next-line
  }, [allAgents, calls, queuedCall]);

  return <QueueListTable {...props} isPreviewMode={false} widget={widget} tableData={tableData} />;
};
export default GridQueueList;