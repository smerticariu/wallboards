import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllAgentsThunk,
  fetchUserLoginDataThunk,
  fetchUsersCurrentCallTimeThunk,
  fetchUserStatusDataThunk,
} from '../../../store/thunk/agents.thunk';
import GridAgentList from './agent-list';
import GridAgentLogin from './agent-login';
import GridCallStatus from './call-status';
import GridQueueTracking from './queue-tracking';
import GridCallTracking from './call-tracking';
import GridQueueStatus from './queue-status';
import { WIDGET_TYPE } from '../../../common/defaults/modal.defaults';
import GridAgentStatus from './agent-status';
import GridQueueList from './queue-list';
import { fetchAgentSkillThunk } from '../../../store/thunk/skills.thunk';
import { getTimes } from '../../../common/utils/getTimes';
import { getTimesAgentstatus } from '../../../common/utils/getTimesAgentstatus';
import { fetchCallStatisticThunk, fetchQueuedCallThunk, fetchQueueStatisticsThunk } from '../../../store/thunk/callsQueues.thunk';
import { getTimesCallTracking } from '../../../common/utils/getTimesCallTracking';
const Widget = ({ widget, isEditMode, ...props }) => {
  const agentsQueues = useSelector((state) => state.agents.agentsQueues);
  const agentQueues = useMemo(() => agentsQueues[widget?.callQueue?.id] ?? [], [agentsQueues, widget?.callQueue?.id]);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
    const agentsInterval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(agentsInterval);
    // eslint-disable-next-line
  }, [widget, agentQueues.length]);

  const fetchData = () => {
    if (
      widget.type === WIDGET_TYPE.AGENT_LIST ||
      widget.type === WIDGET_TYPE.CALL_STATUS ||
      widget.type === WIDGET_TYPE.QUEUE_LIST ||
      widget.type === WIDGET_TYPE.QUEUE_STATUS
    )
      dispatch(fetchUsersCurrentCallTimeThunk());
    if (widget.type === WIDGET_TYPE.QUEUE_STATUS || widget.type === WIDGET_TYPE.AGENT_LIST || widget.type === WIDGET_TYPE.QUEUE_LIST) {
      dispatch(fetchAllAgentsThunk(widget.callQueue.id));
    }
    if (widget.type === WIDGET_TYPE.AGENT_LOGIN) {
      dispatch(fetchUserLoginDataThunk(getTimes(widget), widget.id, widget.group.id));
    }
    if (widget.type === WIDGET_TYPE.AGENT_STATUS) {
      dispatch(fetchUserStatusDataThunk(getTimesAgentstatus(widget), widget.profile.id, widget.limitResult.value, widget.id));
    }
    if (widget.type === WIDGET_TYPE.CALL_TRACKING) {
      dispatch(fetchCallStatisticThunk(getTimesCallTracking(widget), widget.id));
    }
    if (widget.type === WIDGET_TYPE.QUEUE_LIST || widget.type === WIDGET_TYPE.QUEUE_STATUS) {
      dispatch(fetchQueuedCallThunk(widget.callQueue.id));
    }
    if (widget.type === WIDGET_TYPE.QUEUE_TRACKING) {
      dispatch(fetchQueueStatisticsThunk(getTimesCallTracking(widget), widget.id, widget.callQueue.id));
    }

    if (widget.type === WIDGET_TYPE.AGENT_LIST) {
      if (agentQueues.length) {
        agentQueues.forEach((agent) => {
          dispatch(fetchAgentSkillThunk(agent.userId));
        });
      }
    }
  };
  return (
    <>
      {widget.type === WIDGET_TYPE.AGENT_LIST && <GridAgentList isEditMode={isEditMode} widget={widget} />}
      {widget.type === WIDGET_TYPE.CALL_STATUS && <GridCallStatus isEditMode={isEditMode} widget={widget} />}
      {widget.type === WIDGET_TYPE.QUEUE_TRACKING && <GridQueueTracking isEditMode={isEditMode} widget={widget} />}
      {widget.type === WIDGET_TYPE.QUEUE_STATUS && <GridQueueStatus isEditMode={isEditMode} widget={widget} />}
      {widget.type === WIDGET_TYPE.CALL_TRACKING && <GridCallTracking isEditMode={isEditMode} widget={widget} />}
      {widget.type === WIDGET_TYPE.AGENT_LOGIN && <GridAgentLogin isEditMode={isEditMode} widget={widget} />}
      {widget.type === WIDGET_TYPE.AGENT_STATUS && <GridAgentStatus isEditMode={isEditMode} widget={widget} />}
      {widget.type === WIDGET_TYPE.QUEUE_LIST && <GridQueueList isEditMode={isEditMode} widget={widget} />}
    </>
  );
};
export default Widget;
