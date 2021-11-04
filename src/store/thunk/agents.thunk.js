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
} from '../actions/agents.action';
import { DEFAULTS } from '../../common/defaults/defaults';
import { AgentsApi } from 'src/common/api/agents.api';
import { CallsQueuesApi } from 'src/common/api/callsQueues.api';
import { MiscellaneousApi } from 'src/common/api/miscellaneous.api';
import { AvailabilityApi } from 'src/common/api/availability.api';

export const fetchAllAgentsThunk = (callQueueId) => async (dispatch, getState) => {
  dispatch(fetchAllAgentsAC());
  try {
    const { userInfo, token } = getState().login;
    const allAgentsFromCallQueue = await CallsQueuesApi({
      type: DEFAULTS.CALLS_QUEUES.API.GET.AGENT_FROM_CALL_QUEUE,
      organizationId: userInfo.organisationId,
      token,
      callQueueId,
    })
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
      console.log(error);
    }
  };
