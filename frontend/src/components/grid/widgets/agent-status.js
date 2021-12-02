import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchOrganisationAgentsThunk, fetchUserStatusDataThunk } from '../../../store/thunk/agents.thunk';
import { getTimesCallTracking } from '../../../common/utils/getTimesCallTracking';
import AgentStatusTable from '../../agent-status-table/agent-status-table';

const GridAgentStatus = ({ widget, ...props }) => {
  const userStatusData = useSelector((state) => state.agents.userStatusData);
  const allAgents = useSelector((state) => state.agents.allAgents);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    dispatch(fetchUserStatusDataThunk(getTimesCallTracking(widget), widget.profile.id, widget.limitResult.value, widget.id));
    const interval = setInterval(() => {
      dispatch(fetchUserStatusDataThunk(getTimesCallTracking(widget), widget.profile.id, widget.limitResult.value, widget.id));
    }, [2000]);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [widget]);
  useEffect(() => {
    dispatch(fetchOrganisationAgentsThunk());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const userStatusDataForWidget = userStatusData.find((loginData) => loginData.widgetId === widget.id);
    if (userStatusDataForWidget && allAgents.length) {
      let users = [];
      userStatusDataForWidget.userStatusData.forEach((user) => {
        const agent = allAgents.find((agent) => agent.id === user.userId);
        const timeInSecconds = moment().diff(moment(user.time), 'seconds');
        const time = moment(user.time).utcOffset(widget.timeZone.id).format('YYYY-MM-DD HH:mm:ss');
        const elapsed = timeInSecconds;
        const name = agent.firstName + ' ' + agent.lastName;
        users.push({
          userId: user.userId,
          name,
          elapsed,
          time,
          profile: user.availabilityProfileName,
          stateName: user.availabilityStateName,
          stateDisplayName: user.availabilityStateDisplayName,
        });
      });
      setTableData(users);
    }
    // eslint-disable-next-line
  }, [allAgents, userStatusData]);

  return <AgentStatusTable {...props} widget={widget} tableData={tableData} />;
};
export default GridAgentStatus;
