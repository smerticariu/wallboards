import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QUEUE_LIST_COLUMN_OPTIONS } from '../../../common/defaults/modal.defaults';
import { callsToObject } from '../../../common/utils/callsToObject';
import { findTimeAtHeadOfQueue } from '../../../common/utils/findTimeAtHeadOfQueue';
import { findTimeInQueue } from '../../../common/utils/findTimeInQueue';
import { fetchOrganisationAgentsThunk } from '../../../store/thunk/agents.thunk';
import QueueListTable from '../../tables/table.queue-list';

const GridQueueList = ({ widget, ...props }) => {
  const organisationUsers = useSelector((state) => state.agents.organisationUsers);
  const callsWithGroup = useSelector((state) => state.agents.callsWithGroup);
  const agentQueues = useSelector((state) => state.agents.agentsQueues);
  const queuedCall = useSelector((state) => state.callsQueues.queuedCall);

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(fetchOrganisationAgentsThunk());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let activeCalls = {
      ...callsToObject(callsWithGroup, 'uuid'),
      ...callsToObject(callsWithGroup, 'originatorUuid'),
    };
    const queueCall = queuedCall[widget.callQueue.id] ?? [];
    let queuedCallCopy = [...queueCall];
    const agentQueue = agentQueues[widget.callQueue.id] ?? [];
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

    queuedCallCopy = queuedCallCopy.map((call) => {
      call.timeInQueue = findTimeInQueue(call, activeCalls);
      call.timeAtHeadOfQueue = findTimeAtHeadOfQueue(call, activeCalls);
      return call;
    });
    setTableData(
      queuedCallCopy.map((call) => {
        const agent = agentQueue.find((agent) => agent.callUuid === call.uuid);
        const user = organisationUsers.find((user) => user.id === agent?.userId);
        return {
          [QUEUE_LIST_COLUMN_OPTIONS.CALLER_NUMBER]: call.callerIdNumber,
          [QUEUE_LIST_COLUMN_OPTIONS.CALLER_NAME]: call.callerIdName,
          [QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE]: call.position,
          [QUEUE_LIST_COLUMN_OPTIONS.PRIORITY]: call.priority,
          [QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE]: call.timeInQueue,
          [QUEUE_LIST_COLUMN_OPTIONS.DIAL_ATTEMPTS]: call.dialAttempts,
          [QUEUE_LIST_COLUMN_OPTIONS.STATUS]: call.status,
          [QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]: user ? `${user.firstName} ${user.lastName}` : '',
          [QUEUE_LIST_COLUMN_OPTIONS.SKILLS_REQUESTED]: 'none',
          [QUEUE_LIST_COLUMN_OPTIONS.SKILLS_SHORTAGE]: 'none',
          [QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE]: call.timeAtHeadOfQueue,
          [QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED]: call.callbackRequested,
          [QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS]: call.callbackAttempts,
          [QUEUE_LIST_COLUMN_OPTIONS.FLAGS]: 'none',
          uuid: call.uuid,
          agentId: user?.id,
        };
      })
    );
    // eslint-disable-next-line
  }, [organisationUsers, callsWithGroup, queuedCall]);

  return <QueueListTable {...props} isPreviewMode={false} widget={widget} tableData={tableData} />;
};
export default GridQueueList;
