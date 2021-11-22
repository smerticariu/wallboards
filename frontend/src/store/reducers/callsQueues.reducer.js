import { callsQueuesActions } from '../actions/callsQueues.action';
import { FetchStatus } from './wallboards.reducer';

export const callsQueuesInitialState = {
  allCallsQueues: [],
  allCallsQueuesFetchStatus: FetchStatus.NULL,
  queuedCall: [],
  callsStatistic: [],
};

export const callsQueuesReducer = (state = callsQueuesInitialState, action) => {
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

    case callsQueuesActions.FETCH_QUEUED_CALL_SUCCESS:
      return {
        ...state,
        queuedCall: action.payload,
      };
    case callsQueuesActions.FETCH_CALLS_STATISTIC_SUCCESS:
      const { widgetId, callsStatistic } = action.payload;
      const callStatisticFromState = state.callsStatistic.find((call) => call.widgetId === widgetId);
      return {
        ...state,
        callsStatistic: callStatisticFromState
          ? state.callsStatistic.map((call) => (call.widgetId !== widgetId ? call : { ...call, callsStatistic }))
          : [...state.callsStatistic, { widgetId, callsStatistic }],
      };

    default:
      return state;
  }
};
