import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchOrganisationAgentsThunk, fetchUserGroupsThunk, fetchUserLoginDataThunk } from '../../../store/thunk/agents.thunk';
import { getTimes } from '../../../common/utils/getTimes';
import AgentLoginTable from '../../tables/table.agent-login';

const GridAgentLogin = ({ widget, ...props }) => {
  const userLoginData = useSelector((state) => state.agents.userLoginData);
  const allAgents = useSelector((state) => state.agents.allAgents);
  const userGroups = useSelector((state) => state.agents.userGroups);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    dispatch(fetchUserLoginDataThunk(getTimes(widget), widget.id, widget.group.id));
    const interval = setInterval(() => {
      dispatch(fetchUserLoginDataThunk(getTimes(widget), widget.id, widget.group.id));
    }, [2000]);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [widget]);
  useEffect(() => {
    dispatch(fetchOrganisationAgentsThunk());
    dispatch(fetchUserGroupsThunk());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const userLoginDataForWidget = userLoginData.find((loginData) => loginData.widgetId === widget.id);
    if (userLoginDataForWidget && allAgents.length && userGroups.length) {
      let users = [];
      [...userLoginDataForWidget.userLoginData]
        .sort((user1, user2) => new Date(user2.time).getTime() - new Date(user1.time).getTime())
        .filter((user) => Number(widget.group.id) === -1 || user.groupId === widget.group.id)
        .forEach((user) => {
          const group = userGroups.find((group) => user.groupId === group.id);
          const agent = allAgents.find((agent) => agent.id === user.userId);
          users.push({
            groupName: group.name,
            name: agent.firstName + ' ' + agent.lastName,
            event: user.event,
            userId: user.userId,
            isLogin: user.event.toLowerCase() === 'login',
            time: moment(user.time).utcOffset(widget.timeZone.id).format('YYYY-DD-MM HH:mm:ss'),
            elapsed: moment().utcOffset(widget.timeZone.id).diff(moment(user.time), 'seconds'),
          });
        });
      setTableData(users);
    }
  }, [allAgents, userGroups, userLoginData]);

  return <AgentLoginTable {...props} widget={widget} tableData={tableData} />;
};
export default GridAgentLogin;
