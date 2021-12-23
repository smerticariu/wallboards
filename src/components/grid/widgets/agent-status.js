import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchOrganisationAgentsThunk } from '../../../store/thunk/agents.thunk';
import AgentStatusTable from '../../agent-status-table/agent-status-table';

const GridAgentStatus = ({ widget, ...props }) => {
  const userStatusData = useSelector((state) => state.agents.userStatusData);
  const organisationUsers = useSelector((state) => state.agents.organisationUsers);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(fetchOrganisationAgentsThunk());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const userStatusDataForWidget = userStatusData[widget.id];
    if (userStatusDataForWidget && organisationUsers.length) {
      let users = [];
      userStatusDataForWidget.forEach((user) => {
        const agent = organisationUsers.find((agent) => agent.id === user.userId);
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
  }, [organisationUsers, userStatusData]);

  return <AgentStatusTable {...props} widget={widget} tableData={tableData} />;
};
export default GridAgentStatus;
