import { agentsActions } from '../actions/agents.action';
import { FetchStatus } from './wallboards.reducer';

const initialState = {
  agentsQueues: [],
  agentsQueuesFetchStatus: FetchStatus.NULL,
};

export const agentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case agentsActions.FETCH_ALL_CALLS_QUEUES:
      return {
        ...state,
        agentsQueuesFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case agentsActions.FETCH_ALL_CALLS_QUEUES_SUCCESS:
      return {
        ...state,
        agentsQueues: action.payload,
        agentsQueuesFetchStatus: FetchStatus.SUCCESS,
      };

    case agentsActions.FETCH_ALL_CALLS_QUEUES_FAIL:
      return {
        ...state,
        agentsQueuesFetchStatus: FetchStatus.FAIL,
      };

    default:
      return state;
  }
};
