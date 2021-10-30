import { agentsActions } from '../actions/agents.action';
import { FetchStatus } from './wallboards.reducer';

const initialState = {
  agentsQueues: [],
  agentsQueuesFetchStatus: FetchStatus.NULL,

  organisationUsers: [],
  organisationUsersFetchStatus: FetchStatus.NULL,

  sipDevices: [],
  sipDevicesFetchStatus: FetchStatus.NULL,

  userGroups: [],
  userGroupsFetchStatus: FetchStatus.NULL,

  availabilityProfiles: [],
  availabilityProfilesFetchStatus: FetchStatus.NULL,

  availabilityStates: [],
  availabilityStatesFetchStatus: FetchStatus.NULL,
};

export const agentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case agentsActions.FETCH_ALL_AGENTS:
      return {
        ...state,
        agentsQueuesFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_ALL_AGENTS_SUCCESS:
      return {
        ...state,
        agentsQueues: [
          ...state.agentsQueues,
          {
            callQueueId: action.payload.callQueueId,
            agents: action.payload.agent,
          },
        ],
        agentsQueuesFetchStatus: FetchStatus.SUCCESS,
      };

    case agentsActions.FETCH_ALL_AGENTS_FAIL:
      return {
        ...state,
        agentsQueuesFetchStatus: FetchStatus.FAIL,
      };

    case agentsActions.FETCH_ORGANISATION_USERS:
      return {
        ...state,
        organisationUsersFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_ORGANISATION_USERS_SUCCESS:
      return {
        ...state,
        organisationUsers: [...action.payload],
        organisationUsersFetchStatus: FetchStatus.SUCCESS,
      };

    case agentsActions.FETCH_ORGANISATION_USERS_FAIL:
      return {
        ...state,
        organisationUsersFetchStatus: FetchStatus.FAIL,
      };

    case agentsActions.FETCH_DEVICES_SIP:
      return {
        ...state,
        sipDevicesFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_DEVICES_SIP_SUCCESS:
      return {
        ...state,
        sipDevices: [...action.payload],
        sipDevicesFetchStatus: FetchStatus.SUCCESS,
      };

    case agentsActions.FETCH_DEVICES_SIP_FAIL:
      return {
        ...state,
        sipDevicesFetchStatus: FetchStatus.FAIL,
      };

    case agentsActions.FETCH_USER_GROUPS:
      return {
        ...state,
        userGroupsFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_USER_GROUPS_SUCCESS:
      return {
        ...state,
        userGroups: [...action.payload],
        userGroupsFetchStatus: FetchStatus.SUCCESS,
      };

    case agentsActions.FETCH_USER_GROUPS_FAIL:
      return {
        ...state,
        userGroupsFetchStatus: FetchStatus.FAIL,
      };

    case agentsActions.FETCH_AVAILABILITY_PROFILES:
      return {
        ...state,
        availabilityProfilesFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_AVAILABILITY_PROFILES_SUCCESS:
      return {
        ...state,
        availabilityProfiles: [...action.payload],
        availabilityProfilesFetchStatus: FetchStatus.SUCCESS,
      };

    case agentsActions.FETCH_AVAILABILITY_PROFILES_FAIL:
      return {
        ...state,
        availabilityProfilesFetchStatus: FetchStatus.FAIL,
      };

    case agentsActions.FETCH_AVAILABILITY_STATES:
      return {
        ...state,
        availabilityStatesFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_AVAILABILITY_STATES_SUCCESS:
      return {
        ...state,
        availabilityStates: [
          ...state.availabilityStates,
          {
            availabilityProfileId: action.payload.availabilityId,
            states: action.payload.profiles,
          },
        ],
        availabilityStatesFetchStatus: FetchStatus.SUCCESS,
      };

    case agentsActions.FETCH_AVAILABILITY_STATES_FAIL:
      return {
        ...state,
        availabilityStatesFetchStatus: FetchStatus.FAIL,
      };

    default:
      return state;
  }
};
