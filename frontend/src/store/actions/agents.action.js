export const agentsActions = {
  FETCH_ALL_AGENTS: 'FETCH_ALL_AGENTS',
  FETCH_ALL_AGENTS_SUCCESS: 'FETCH_ALL_AGENTS_SUCCESS',
  FETCH_ALL_AGENTS_FAIL: 'FETCH_ALL_AGENTS_FAIL',

  FETCH_ORGANISATION_USERS: 'FETCH_ORGANISATION_USERS',
  FETCH_ORGANISATION_USERS_SUCCESS: 'FETCH_ORGANISATION_USERS_SUCCESS',
  FETCH_ORGANISATION_USERS_FAIL: 'FETCH_ORGANISATION_USERS_FAIL',

  FETCH_DEVICES_SIP: 'FETCH_DEVICES_SIP',
  FETCH_DEVICES_SIP_SUCCESS: 'FETCH_DEVICES_SIP_SUCCESS',
  FETCH_DEVICES_SIP_FAIL: 'FETCH_DEVICES_SIP_FAIL',

  FETCH_USER_GROUPS: 'FETCH_USER_GROUPS',
  FETCH_USER_GROUPS_SUCCESS: 'FETCH_USER_GROUPS_SUCCESS',
  FETCH_USER_GROUPS_FAIL: 'FETCH_USER_GROUPS_FAIL',

  FETCH_AVAILABILITY_PROFILES: 'FETCH_AVAILABILITY_PROFILES',
  FETCH_AVAILABILITY_PROFILES_SUCCESS: 'FETCH_AVAILABILITY_PROFILES_SUCCESS',
  FETCH_AVAILABILITY_PROFILES_FAIL: 'FETCH_AVAILABILITY_PROFILES_FAIL',

  FETCH_AVAILABILITY_STATES: 'FETCH_AVAILABILITY_STATES',
  FETCH_AVAILABILITY_STATES_SUCCESS: 'FETCH_AVAILABILITY_STATES_SUCCESS',
  FETCH_AVAILABILITY_STATES_FAIL: 'FETCH_AVAILABILITY_STATES_FAIL',

  CHANGE_AGENT_AVAILABILITY_STATUS: 'CHANGE_AGENT_AVAILABILITY_STATUS',
  CHANGE_AGENT_AVAILABILITY_STATUS_SUCCESS: 'CHANGE_AGENT_AVAILABILITY_STATUS_SUCCESS',
  CHANGE_AGENT_AVAILABILITY_STATUS_FAIL: 'CHANGE_AGENT_AVAILABILITY_STATUS_FAIL',

  FETCH_USERS_CURRENT_CALL_TIME_SUCCESS: 'FETCH_USERS_CURRENT_CALL_TIME_SUCCESS',

  FETCH_USER_LOGIN_DATA_SUCCESS: 'FETCH_USER_LOGIN_DATA_SUCCESS',

  FETCH_USER_STATUS_DATA_SUCCESS: 'FETCH_USER_STATUS_DATA_SUCCESS',
};
export const fetchAllAgentsAC = () => ({
  type: agentsActions.FETCH_ALL_AGENTS,
});
export const fetchAllAgentsSuccessAC = (agents, callQueueId) => ({
  type: agentsActions.FETCH_ALL_AGENTS_SUCCESS,
  payload: { agents, callQueueId },
});
export const fetchAllAgentsFailAC = (errorMessage) => ({
  type: agentsActions.FETCH_ALL_AGENTS_FAIL,
  payload: errorMessage,
});

export const fetchOrganisationUsersAC = () => ({
  type: agentsActions.FETCH_ORGANISATION_USERS,
});
export const fetchOrganisationUsersSuccessAC = (users) => ({
  type: agentsActions.FETCH_ORGANISATION_USERS_SUCCESS,
  payload: users,
});
export const fetchOrganisationUsersFailAC = (errorMessage) => ({
  type: agentsActions.FETCH_ORGANISATION_USERS_FAIL,
  payload: errorMessage,
});

export const fetchSipDevicesUsersAC = () => ({
  type: agentsActions.FETCH_DEVICES_SIP,
});
export const fetchSipDevicesUsersSuccessAC = (users) => ({
  type: agentsActions.FETCH_DEVICES_SIP_SUCCESS,
  payload: users,
});
export const fetchSipDevicesUsersFailAC = (errorMessage) => ({
  type: agentsActions.FETCH_DEVICES_SIP_FAIL,
  payload: errorMessage,
});

export const fetchUserGroupsAC = () => ({
  type: agentsActions.FETCH_USER_GROUPS,
});
export const fetchUserGroupsSuccessAC = (users) => ({
  type: agentsActions.FETCH_USER_GROUPS_SUCCESS,
  payload: users,
});
export const fetchUserGroupsFailAC = (errorMessage) => ({
  type: agentsActions.FETCH_USER_GROUPS_FAIL,
  payload: errorMessage,
});

export const fetchAvailabilityProfilesAC = () => ({
  type: agentsActions.FETCH_AVAILABILITY_PROFILES,
});
export const fetchAvailabilityProfilesSuccessAC = (profiles) => ({
  type: agentsActions.FETCH_AVAILABILITY_PROFILES_SUCCESS,
  payload: profiles,
});
export const fetchAvailabilityProfilesFailAC = (errorMessage) => ({
  type: agentsActions.FETCH_AVAILABILITY_PROFILES_FAIL,
  payload: errorMessage,
});

export const fetchAvailabilityStatesAC = () => ({
  type: agentsActions.FETCH_AVAILABILITY_STATES,
});
export const fetchAvailabilityStatesSuccessAC = (profiles, availabilityId) => ({
  type: agentsActions.FETCH_AVAILABILITY_STATES_SUCCESS,
  payload: { profiles, availabilityId },
});
export const fetchAvailabilityStatesFailAC = (errorMessage) => ({
  type: agentsActions.FETCH_AVAILABILITY_STATES_FAIL,
  payload: errorMessage,
});

export const changeAgentAvailabilityStateAC = () => ({
  type: agentsActions.CHANGE_AGENT_AVAILABILITY_STATUS,
});
export const changeAgentAvailabilityStateSuccessAC = (userId, name) => ({
  type: agentsActions.CHANGE_AGENT_AVAILABILITY_STATUS_SUCCESS,
  payload: { userId, name },
});
export const changeAgentAvailabilityStateFailAC = (errorMessage) => ({
  type: agentsActions.CHANGE_AGENT_AVAILABILITY_STATUS_FAIL,
  payload: errorMessage,
});

export const fetchUsersCurrentCallTimeSuccessAC = (calls, callsWithGroup) => ({
  type: agentsActions.FETCH_USERS_CURRENT_CALL_TIME_SUCCESS,
  payload: { calls, callsWithGroup },
});
export const fetchUserLoginDataSuccessAC = (userLoginData, widgetId) => ({
  type: agentsActions.FETCH_USER_LOGIN_DATA_SUCCESS,
  payload: { userLoginData, widgetId },
});

export const fetchUserStatusDataSuccessAC = (userStatusData, widgetId) => ({
  type: agentsActions.FETCH_USER_STATUS_DATA_SUCCESS,
  payload: { userStatusData, widgetId },
});
