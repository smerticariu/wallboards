import {
  fetchAllAgentsAC,
  fetchAllAgentsFailAC,
  fetchAllAgentsSuccessAC,
  fetchAvailabilityProfilesAC,
  fetchAvailabilityProfilesFailAC,
  fetchAvailabilityProfilesSuccessAC,
  fetchAvailabilityStatesAC,
  fetchAvailabilityStatesFailAC,
  fetchAvailabilityStatesSuccessAC,
  fetchOrganisationUsersAC,
  fetchOrganisationUsersFailAC,
  fetchOrganisationUsersSuccessAC,
  fetchSipDevicesUsersAC,
  fetchSipDevicesUsersFailAC,
  fetchSipDevicesUsersSuccessAC,
  fetchUserGroupsAC,
  fetchUserGroupsFailAC,
  fetchUserGroupsSuccessAC,
  fetchUserLoginDataSuccessAC,
  fetchUsersCurrentCallTimeSuccessAC,
  fetchUserStatusDataSuccessAC,
} from '../actions/agents.action';
import { handleIsNotificationShowAC } from '../actions/notification.action';
import { DEFAULTS } from '../../common/defaults/defaults';
import { AgentsApi } from '../../common/api/agents.api';
import { CallsQueuesApi } from '../../common/api/callsQueues.api';
import { MiscellaneousApi } from '../../common/api/miscellaneous.api';
import { AvailabilityApi } from '../../common/api/availability.api';
import { CallsApi } from '../../common/api/calls.api';
import moment from 'moment';

export const fetchAllAgentsThunk = (callQueueId) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { userInfo, token, sapienUrl } = state.login;
    const existAgentsInQueue = state.agents.agentsQueues[callQueueId];
    const agentsQueues = state.agents.agentsQueues[callQueueId] ?? [];
    if (!existAgentsInQueue) {
      dispatch(fetchAllAgentsAC());
    }
    const response = await CallsQueuesApi({
      type: DEFAULTS.CALLS_QUEUES.API.GET.AGENT_FROM_CALL_QUEUE,
      organizationId: userInfo.organisationId,
      token,
      callQueueId,
      sapienUrl,
    });
    const allAgentsFromCallQueue = response.data.data;
    const agentsQueuesSort = [...agentsQueues].sort((agent1, agent2) => agent1.userId - agent2.userId);
    const allAgentsFromCallQueueSort = [...allAgentsFromCallQueue].sort((agent1, agent2) => agent1.userId - agent2.userId);
    if (!existAgentsInQueue || JSON.stringify(agentsQueuesSort) !== JSON.stringify(allAgentsFromCallQueueSort)) {
      dispatch(fetchAllAgentsSuccessAC(allAgentsFromCallQueue, callQueueId));
    }
  } catch (error) {
    dispatch(fetchAllAgentsFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchOrganisationAgentsThunk = () => async (dispatch, getState) => {
  dispatch(fetchOrganisationUsersAC());
  try {
    const { userInfo, token, sapienUrl } = getState().login;

    const allAgents = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.ALL_AGENTS,
      organizationId: userInfo.organisationId,
      token,
      sapienUrl,
    });
    dispatch(fetchOrganisationUsersSuccessAC(allAgents.data.data));
  } catch (error) {
    dispatch(fetchOrganisationUsersFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchDevicesSipAgentsThunk = () => async (dispatch, getState) => {
  dispatch(fetchSipDevicesUsersAC());
  try {
    const { userInfo, token, sapienUrl } = getState().login;

    const sipDevices = await MiscellaneousApi({
      type: DEFAULTS.MISCELLANEOUS.API.GET.SIP_DEVICE,
      organizationId: userInfo.organisationId,
      token,
      sapienUrl,
    });

    dispatch(fetchSipDevicesUsersSuccessAC(sipDevices.data.data));
  } catch (error) {
    dispatch(fetchSipDevicesUsersFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchUserGroupsThunk = () => async (dispatch, getState) => {
  dispatch(fetchUserGroupsAC());
  try {
    const { userInfo, token, sapienUrl } = getState().login;
    const userGroups = await MiscellaneousApi({
      type: DEFAULTS.MISCELLANEOUS.API.GET.USER_GROUPS,
      organizationId: userInfo.organisationId,
      token,
      sapienUrl,
    });

    dispatch(fetchUserGroupsSuccessAC(userGroups.data.data));
  } catch (error) {
    dispatch(fetchUserGroupsFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchAvailabilityProfilesThunk = () => async (dispatch, getState) => {
  dispatch(fetchAvailabilityProfilesAC());
  try {
    const { userInfo, token, sapienUrl } = getState().login;

    const availabilityProfiles = await AvailabilityApi({
      type: DEFAULTS.AVAILABILITY.API.GET.PROFILES,
      organizationId: userInfo.organisationId,
      token,
      sapienUrl,
    });

    dispatch(fetchAvailabilityProfilesSuccessAC(availabilityProfiles.data.data));
  } catch (error) {
    dispatch(fetchAvailabilityProfilesFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchAvailabilityStatesThunk = (availabilityId) => async (dispatch, getState) => {
  dispatch(fetchAvailabilityStatesAC());
  try {
    const { userInfo, token, sapienUrl } = getState().login;

    const availabilityStates = await AvailabilityApi({
      type: DEFAULTS.AVAILABILITY.API.GET.STATES,
      organizationId: userInfo.organisationId,
      token,
      availabilityId,
      sapienUrl,
    });
    dispatch(fetchAvailabilityStatesSuccessAC(availabilityStates.data.data, availabilityId));
  } catch (error) {
    dispatch(fetchAvailabilityStatesFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const changeAgentAvailabilityStateThunk =
  (agentId, availabilityProfileId, availabilityStateId, stateName) => async (dispatch, getState) => {
    try {
      const { userInfo, token, sapienUrl } = getState().login;

      const data = {
        availabilityProfileId: availabilityProfileId,
        availabilityStateId: availabilityStateId,
      };

      await AgentsApi({
        type: DEFAULTS.AGENTS.API.SAVE.AGENT,
        organizationId: userInfo.organisationId,
        token,
        agentId,
        data,
        sapienUrl,
      });
    } catch (error) {
      dispatch(handleIsNotificationShowAC(true, true, `Error: ${error?.response?.status ?? 'unknown'} - ${DEFAULTS.GLOBAL.FAIL}`));
      console.log(error);
    }
  };

export const callAgentThunk = (id) => async (dispatch, getState) => {
  try {
    const { userInfo, token, sapienUrl } = getState().login;
    const agent = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.BY_ID,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
      sapienUrl,
    });

    const userPhoneNumber = userInfo.sipExtension;
    const agentPhoneNumber = agent.data.data.sipExtension;

    const data = {
      to: agentPhoneNumber,
      from: userPhoneNumber,
      userId: id,
      cli: { present: 'DEFAULT' },
    };

    await CallsApi({
      type: DEFAULTS.CALLS.API.SAVE.CALL_AGENT,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
      data,
      sapienUrl,
    });
  } catch (error) {
    dispatch(handleIsNotificationShowAC(true, true, `Error: ${error.response.status ?? 'unknown'} - ${DEFAULTS.GLOBAL.FAIL}`));
    console.log(error);
  }
};

export const fetchUsersCurrentCallTimeThunk = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { userInfo, token, sapienUrl } = state.login;
    const reduxcallsWithLogicalDirection = state.agents.callsWithLogicalDirection;

    const response = await CallsApi({
      type: DEFAULTS.CALLS.API.GET.CALLS,
      organizationId: userInfo.organisationId,
      token,
      sapienUrl,
    });

    const callsWithLogicalDirection = response.data.data.reduce((data, callFullType) => {
      return [...data, ...callFullType.channels.map((call) => ({ ...call, logicalDirection: callFullType.direction }))];
    }, []);

    const callsSorted = [...callsWithLogicalDirection].sort((call1, call2) => call1.uuid - call2.uuid);
    const reduxCallsWithGroupSorted = [...reduxcallsWithLogicalDirection].sort((call1, call2) => call1.uuid - call2.uuid);
    if (JSON.stringify(callsSorted) !== JSON.stringify(reduxCallsWithGroupSorted)) {
      dispatch(fetchUsersCurrentCallTimeSuccessAC(callsWithLogicalDirection, response.data.data));
    }
  } catch (error) {
    console.log(error.response);
    dispatch(handleIsNotificationShowAC(true, true, `Error: ${error?.response?.status ?? 'unknown'} - ${DEFAULTS.GLOBAL.FAIL}`));
    console.log(error);
  }
};

export const listenLiveThunk = (id) => async (dispatch, getState) => {
  try {
    const { userInfo, token, sapienUrl } = getState().login;
    const agent = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.BY_ID,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
      sapienUrl,
    });

    const userPhoneNumber = userInfo.sipExtension;

    const calls = await CallsApi({
      type: DEFAULTS.CALLS.API.GET.CALLS,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
      sapienUrl,
    });

    const currentCall = calls.data.data.find((call) => {
      return call.channels.find((channel) => {
        return channel.userId === id || channel.to === agent.data.data.sipExtension;
      });
    });

    const currentChannel = currentCall.channels.find((channel) => {
      return channel.userId === id || channel.to === agent.data.data.sipExtension;
    });

    const data = {
      to: 'CPBXListenInService',
      from: userPhoneNumber,
      userId: parseInt(id),
      cli: { present: 'DEFAULT' },
      targetChannelUuid: currentChannel.uuid,
      variables: {
        listenInNumber: currentChannel.uuid,
        listenInName: currentChannel.uuid,
        listenInExtension: agent.data.data.sipExtension,
      },
    };

    await CallsApi({
      type: DEFAULTS.CALLS.API.SAVE.CALL_AGENT,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
      data,
      sapienUrl,
    });
  } catch (error) {
    console.log(error.data);
    dispatch(handleIsNotificationShowAC(true, true, `Error: ${error?.response?.status ?? 400} - ${DEFAULTS.GLOBAL.FAIL}`));
    console.log(error);
  }
};

export const fetchUserLoginDataThunk =
  ({ timeStart, timeEnd }, widgetId, groupId) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token, sapienUrl } = getState().login;

      const response = await MiscellaneousApi({
        type: DEFAULTS.MISCELLANEOUS.API.GET.USER_LOGIN_DATA,
        organizationId: userInfo.organisationId,
        token,
        groupId,
        timeStart,
        timeEnd,
        sapienUrl,
      });

      dispatch(fetchUserLoginDataSuccessAC(response.data.data, widgetId));
    } catch (error) {
      console.log(error);
    }
  };
export const fetchUserStatusDataThunk =
  ({ timeStart, timeEnd }, profileId, limitResult, widgetId) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token, sapienUrl } = getState().login;

      const responseAgentStatus = await AvailabilityApi({
        type: DEFAULTS.AVAILABILITY.API.GET.HISTORY,
        organizationId: userInfo.organisationId,
        token,
        profileId,
        limitResult,
        timeStart,
        timeEnd,
        sapienUrl,
      });

      dispatch(fetchUserStatusDataSuccessAC(responseAgentStatus.data.data, widgetId));
    } catch (error) {
      console.log(error);
    }
  };

export const exportCSVUserLoginDataThunk =
  ({ timeStart, timeEnd }, timezone, groupId) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token, sapienUrl } = getState().login;

      const responseAgentLogin = await MiscellaneousApi({
        type: DEFAULTS.MISCELLANEOUS.API.GET.USER_LOGIN_DATA,
        organizationId: userInfo.organisationId,
        token,
        groupId,
        timeStart,
        timeEnd,
        sapienUrl,
      });
      const userLoginData = responseAgentLogin.data.data;
      if (!userLoginData.length) {
        return dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.AGENTS.API.ERROR.NO_AGENTS));
      }
      const responseAgents = await AgentsApi({
        type: DEFAULTS.AGENTS.API.GET.ALL_AGENTS,
        organizationId: userInfo.organisationId,
        token,
        sapienUrl,
      });
      const allAgents = responseAgents.data.data;

      const userGroupsResponse = await MiscellaneousApi({
        type: DEFAULTS.MISCELLANEOUS.API.GET.USER_GROUPS,
        organizationId: userInfo.organisationId,
        token,
        sapienUrl,
      });
      const userGroups = userGroupsResponse.data.data;
      let users = ['Name,Group,Event,Date & Time,Elapsed'];
      userLoginData
        .sort((user1, user2) => new Date(user2.time).getTime() - new Date(user1.time).getTime())
        .filter((user) => Number(groupId) === -1 || user.groupId === groupId)
        .forEach((user) => {
          const group = userGroups.find((group) => user.groupId === group.id);
          const agent = allAgents.find((agent) => agent.id === user.userId);
          const timeInSecconds = moment().utcOffset(timezone).diff(moment(user.time), 'seconds');
          const noOfDays = Math.floor(timeInSecconds / 86400); // 1 day === 86400 seconds
          const dateString = moment.utc(timeInSecconds * 1000).format('HH:mm:ss');

          const time = moment(user.time).utcOffset(timezone).format('YYYY-MM-DD HH:mm:ss');

          users.push([
            `${agent.firstName + ' ' + agent.lastName},${group.name},${user.event},${time},${
              noOfDays ? `${noOfDays} Day${noOfDays === 1 ? '' : 's'}` : dateString
            }`,
          ]);
        });
      let csvContent = 'data:text/csv;charset=utf-8,' + users.map((user) => user).join('\n');
      let encodedUri = encodeURI(csvContent);
      let link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `Export_Agent_Login_Report_${moment(timeStart).format('YYYY-MM-DD')}-${moment(timeEnd).format('YYYY-MM-DD')}.csv`
      );
      const root = document.getElementById('root');
      root.appendChild(link);
      link.click();
      root.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

export const exportCSVUserStatusDataThunk =
  ({ timeStart, timeEnd }, profileId, timezone, isShowDisplayName, isShowStateName) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token, sapienUrl } = getState().login;

      const responseAgentStatus = await AvailabilityApi({
        type: DEFAULTS.AVAILABILITY.API.GET.HISTORY,
        organizationId: userInfo.organisationId,
        token,
        profileId,
        timeStart,
        timeEnd,
        sapienUrl,
      });
      const agentStatusData = responseAgentStatus.data.data;
      if (!agentStatusData.length) {
        return dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.AGENTS.API.ERROR.NO_AGENTS_STATUS));
      }
      const responseAgents = await AgentsApi({
        type: DEFAULTS.AGENTS.API.GET.ALL_AGENTS,
        organizationId: userInfo.organisationId,
        token,
        sapienUrl,
      });
      const allAgents = responseAgents.data.data;
      let users = [
        `Name,Profile,${isShowStateName ? 'State Name,' : ''}${isShowDisplayName ? 'State Display Name,' : ''}Date & Time,Elapsed`,
      ];
      agentStatusData.forEach((user) => {
        const agent = allAgents.find((agent) => agent.id === user.userId);
        const timeInSecconds = moment().diff(moment(user.time), 'seconds');
        const noOfDays = Math.floor(timeInSecconds / 86400); // 1 day === 86400 seconds
        const dateString = moment.utc(timeInSecconds * 1000).format('HH:mm:ss');
        users.push([
          `${agent.firstName + ' ' + agent.lastName},${user.availabilityProfileName},${
            isShowStateName ? user.availabilityStateName + ',' : ''
          }${isShowDisplayName ? user.availabilityStateDisplayName + ',' : ''}${moment(user.time)
            .utcOffset(timezone)
            .format('YYYY-MM-DD HH:mm:ss')},${noOfDays ? `${noOfDays} Day${noOfDays === 1 ? '' : 's'}` : dateString}`,
        ]);
      });
      let csvContent = 'data:text/csv;charset=utf-8,' + users.map((user) => user).join('\n');
      let encodedUri = encodeURI(csvContent);
      let link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `Export_Agent_Availability_State_Report_${moment(timeStart).format('YYYY-MM-DD')}-${moment(timeEnd).format('YYYY-MM-DD')}.csv`
      );
      const root = document.getElementById('root');
      root.appendChild(link);
      link.click();
      root.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };
