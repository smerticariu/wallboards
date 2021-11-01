import { callsQueuesActions } from '../actions/callsQueues.action';
import { FetchStatus } from './wallboards.reducer';

const initialState = {
  allCallsQueues: [],
  allCallsQueuesFetchStatus: FetchStatus.NULL,
};

export const callsQueuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case callsQueuesActions.FETCH_ALL_CALLS_QUEUES:
      return {
        ...state,
        allCallsQueuesFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case callsQueuesActions.FETCH_ALL_CALLS_QUEUES_SUCCESS:
      return {
        ...state,
        allCallsQueues: action.payload,
        allCallsQueuesFetchStatus: FetchStatus.SUCCESS,
      };

    case callsQueuesActions.FETCH_ALL_CALLS_QUEUES_FAIL:
      return {
        ...state,
        allCallsQueuesFetchStatus: FetchStatus.FAIL,
      };

    default:
      return state;
  }
};
