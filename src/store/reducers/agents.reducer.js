import { agentsActions } from '../actions/agents.action';
import { FetchStatus } from './wallboards.reducer';

const initialState = {
  agentsQueues: [],
  agentsQueuesFetchStatus: FetchStatus.NULL,
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

    default:
      return state;
  }
};
