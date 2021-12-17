import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAgentsThunk, fetchUsersCurrentCallTimeThunk } from '../../../store/thunk/agents.thunk';
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
const Widget = ({ widget, isEditMode, ...props }) => {
  const agentsQueues = useSelector((state) => state.agents.agentsQueues);
  const agentQueues = agentsQueues[widget?.callQueue?.id] ?? [];

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    const agentsInterval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(agentsInterval);
    // eslint-disable-next-line
  }, [widget, agentsQueues]);

  const fetchData = () => {
    if (widget.type === WIDGET_TYPE.AGENT_LIST || widget.type === WIDGET_TYPE.CALL_STATUS || widget.type === WIDGET_TYPE.QUEUE_LIST)
      dispatch(fetchUsersCurrentCallTimeThunk());
    if (widget.type === WIDGET_TYPE.QUEUE_STATUS || widget.type === WIDGET_TYPE.AGENT_LIST || widget.type === WIDGET_TYPE.QUEUE_LIST) {
      dispatch(fetchAllAgentsThunk(widget.callQueue.id));
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
