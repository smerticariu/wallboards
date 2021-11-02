import axios from 'axios';
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

export const fetchAllAgentsThunk = (callQueueId) => async (dispatch, getState) => {
  dispatch(fetchAllAgentsAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/call-queue/${callQueueId}/agent`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);
    dispatch(fetchAllAgentsSuccessAC(response.data.data, callQueueId));
  } catch (error) {
    dispatch(fetchAllAgentsFailAC('something went wrong'));
    console.log(error);
  }
};

export const fetchOrganisationAgentsThunk = () => async (dispatch, getState) => {
  dispatch(fetchOrganisationUsersAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/user`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const response = await axios(options);
    dispatch(fetchOrganisationUsersSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchOrganisationUsersFailAC('something went wrong'));
    console.log(error);
  }
};

export const fetchDevicesSipAgentsThunk = () => async (dispatch, getState) => {
  dispatch(fetchSipDevicesUsersAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/sip-device`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const response = await axios(options);
    dispatch(fetchSipDevicesUsersSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchSipDevicesUsersFailAC('something went wrong'));
    console.log(error);
  }
};

export const fetchUserGroupsThunk = () => async (dispatch, getState) => {
  dispatch(fetchUserGroupsAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/user-group`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const response = await axios(options);
    dispatch(fetchUserGroupsSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchUserGroupsFailAC('something went wrong'));
    console.log(error);
  }
};

export const fetchAvailabilityProfilesThunk = () => async (dispatch, getState) => {
  dispatch(fetchAvailabilityProfilesAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/availability/profile`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const response = await axios(options);
    dispatch(fetchAvailabilityProfilesSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchAvailabilityProfilesFailAC('something went wrong'));
    console.log(error);
  }
};

export const fetchAvailabilityStatesThunk = (availabilityId) => async (dispatch, getState) => {
  dispatch(fetchAvailabilityStatesAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/availability/profile/${availabilityId}/state`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const response = await axios(options);
    dispatch(fetchAvailabilityStatesSuccessAC(response.data.data, availabilityId));
  } catch (error) {
    dispatch(fetchAvailabilityStatesFailAC('something went wrong'));
    console.log(error);
  }
};

export const changeAgentAvailabilityStateThunk =
  (agentId, availabilityProfileId, availabilityStateId, stateName) => async (dispatch, getState) => {
    try {
      const { userInfo, token } = getState().login;
      const options = {
        method: 'patch',
        url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/user/${agentId}`,
        data: {
          availabilityProfileId: availabilityProfileId,
          availabilityStateId: availabilityStateId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        },
      };
      await axios(options);
    } catch (error) {
      console.log(error);
    }
  };
