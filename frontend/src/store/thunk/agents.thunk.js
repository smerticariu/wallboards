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
  fetchUsersCurrentCallTimeSuccessAC,
} from '../actions/agents.action';
import { handleIsNotificationShowAC } from '../actions/notification.action';
import { DEFAULTS } from '../../common/defaults/defaults';
import { AgentsApi } from '../../common/api/agents.api';
import { CallsQueuesApi } from '../../common/api/callsQueues.api';
import { MiscellaneousApi } from '../../common/api/miscellaneous.api';
import { AvailabilityApi } from '../../common/api/availability.api';
import { CallsApi } from '../../common/api/calls.api';

export const fetchAllAgentsThunk = (callQueueId) => async (dispatch, getState) => {
  dispatch(fetchAllAgentsAC());
  try {
    const { userInfo, token } = getState().login;
    const allAgentsFromCallQueue = await CallsQueuesApi({
      type: DEFAULTS.CALLS_QUEUES.API.GET.AGENT_FROM_CALL_QUEUE,
      organizationId: userInfo.organisationId,
      token,
      callQueueId,
    });
    dispatch(fetchAllAgentsSuccessAC(allAgentsFromCallQueue.data.data, callQueueId));
  } catch (error) {
    dispatch(fetchAllAgentsFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchOrganisationAgentsThunk = () => async (dispatch, getState) => {
  dispatch(fetchOrganisationUsersAC());
  try {
    const { userInfo, token } = getState().login;

    const allAgents = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.ALL_AGENTS,
      organizationId: userInfo.organisationId,
      token,
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
    const { userInfo, token } = getState().login;

    const sipDevices = await MiscellaneousApi({
      type: DEFAULTS.MISCELLANEOUS.API.GET.SIP_DEVICE,
      organizationId: userInfo.organisationId,
      token,
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
    const { userInfo, token } = getState().login;
    const userGroups = await MiscellaneousApi({
      type: DEFAULTS.MISCELLANEOUS.API.GET.USER_GROUPS,
      organizationId: userInfo.organisationId,
      token,
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
    const { userInfo, token } = getState().login;

    const availabilityProfiles = await AvailabilityApi({
      type: DEFAULTS.AVAILABILITY.API.GET.PROFILES,
      organizationId: userInfo.organisationId,
      token,
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
    const { userInfo, token } = getState().login;

    const availabilityStates = await AvailabilityApi({
      type: DEFAULTS.AVAILABILITY.API.GET.STATES,
      organizationId: userInfo.organisationId,
      token,
      availabilityId,
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
      const { userInfo, token } = getState().login;

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
      });
    } catch (error) {
      dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.GLOBAL.FAIL));
      console.log(error);
    }
  };

export const callAgentThunk = (id) => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;
    const agent = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.BY_ID,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
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
    });
  } catch (error) {
    dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchUsersCurrentCallTimeThunk = () => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;

    const response = await CallsApi({
      type: DEFAULTS.CALLS.API.GET.CALLS,
      organizationId: userInfo.organisationId,
      token,
    });

    dispatch(fetchUsersCurrentCallTimeSuccessAC(response.data.data));
    // dispatch(
    //   fetchUsersCurrentCallTimeSuccessAC([
    //     {
    //       direction: 'OUTGOING',
    //       channels: [
    //         {
    //           uuid: '4f7b1d78-1ab5-11ec-b254-b5dda23eb784',
    //           originatorUuid: null,
    //           deviceId: 187912,
    //           userId: 5601879,
    //           from: 12020,
    //           to: 2002,
    //           type: 'SOC',
    //           state: 'ANSWERED',
    //           createTime: '2021-09-21T08:24:17+00:00',
    //           answerTime: '2021-09-21T08:24:18+00:00',
    //           feature: 'CALL',
    //           policy: 'Default',
    //           direction: 'INCOMING',
    //         },
    //       ],
    //     },
    //   ])
    // );
  } catch (error) {
    dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const listenLiveThunk = (id) => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;
    const agent = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.BY_ID,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
    });

    const userPhoneNumber = userInfo.sipExtension;

    const calls = await CallsApi({
      type: DEFAULTS.CALLS.API.GET.CALLS,
      organizationId: userInfo.organisationId,
      token,
      agentId: id,
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
    });
  } catch (error) {
    dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};
