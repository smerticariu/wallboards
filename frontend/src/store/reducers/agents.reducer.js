import { agentsActions } from '../actions/agents.action';
import { FetchStatus } from './wallboards.reducer';

export const agentsInitialState = {
  agentsQueues: [],
  agentsQueuesFetchStatus: FetchStatus.NULL,

  organisationUsersFetchStatus: FetchStatus.NULL,

  sipDevices: [],
  sipDevicesFetchStatus: FetchStatus.NULL,

  userGroups: [],
  userGroupsFetchStatus: FetchStatus.NULL,

  availabilityProfiles: [],
  availabilityProfilesFetchStatus: FetchStatus.NULL,

  availabilityStates: [],
  availabilityStatesFetchStatus: FetchStatus.NULL,

  calls: [],
};

export const agentsReducer = (state = agentsInitialState, action) => {
  switch (action.type) {
    case agentsActions.FETCH_ALL_AGENTS:
      return {
        ...state,
        agentsQueuesFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_ALL_AGENTS_SUCCESS:
      return {
        ...state,
        agentsQueues: state.agentsQueues.some((agentQueue) => agentQueue.callQueueId === action.payload.callQueueId)
          ? state.agentsQueues.map((agentQueue) =>
              agentQueue.callQueueId !== action.payload.callQueueId
                ? agentQueue
                : {
                    ...agentQueue,
                    agents: action.payload.agent.map((agent) => {
                      const agentFromRedux = agentQueue.agents.find((reduxAgent) => reduxAgent.userId === agent.userId);
                      if (agentFromRedux) {
                        let newStatus = agentFromRedux.userCurrentCall ? agentFromRedux.status : agent.status;
                        return {
                          ...agentFromRedux,
                          ...agent,
                          status: newStatus,
                        };
                      }
                      return agent;
                    }),
                  }
            )
          : [
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

    case agentsActions.FETCH_ORGANISATION_USERS_SUCCESS: {
      const agents = action.payload;
      return {
        ...state,
        agentsQueues: state.agentsQueues.map((agentQueue) => ({
          ...agentQueue,
          agents: agentQueue.agents.map((agent) => {
            const agentFromRequest = agents.find((agentFromRequest) => agentFromRequest.id === agent.userId);
            if (agentFromRequest) {
              return {
                ...agent,
                organisationUserData: { ...agentFromRequest },
              };
            }
            return agent;
          }),
        })),
        organisationUsersFetchStatus: FetchStatus.SUCCESS,
      };
    }
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

    case agentsActions.CHANGE_AGENT_AVAILABILITY_STATUS_SUCCESS:
      return {
        ...state,
        agentsQueues: state.agentsQueues.map((agentGroup) => ({
          ...agentGroup,
          agents: agentGroup.agents.map((agent) =>
            agent.userId !== action.payload.userId
              ? agent
              : { ...agent, availabilityState: { ...agent.availabilityState, displayName: action.payload.name, name: action.payload.name } }
          ),
        })),
      };
    case agentsActions.FETCH_USERS_CURRENT_CALL_TIME_SUCCESS:
      const calls = action.payload;
      return {
        ...state,
        calls,
        agentsQueues: state.agentsQueues.map((queueWithAgents) => ({
          ...queueWithAgents,
          agents: queueWithAgents.agents.map((agent) => {
            let userCall = null;
            let newStatus = agent.status;
            calls.some((call) =>
              call.channels.some((channel) => {
                if (channel.userId === agent.userId || channel.to === agent.organisationUserData?.sipExtension) {
                  userCall = {
                    ...channel,
                    direction: call.direction,
                  };
                  return true;
                }
                return false;
              })
            );
            return {
              ...agent,
              userCurrentCall: userCall,
              status: newStatus,
            };
          }),
        })),
      };

    default:
      return state;
  }
};
