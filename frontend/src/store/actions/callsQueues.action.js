export const callsQueuesActions = {
  FETCH_ALL_CALLS_QUEUES: 'FETCH_ALL_CALLS_QUEUES',
  FETCH_ALL_CALLS_QUEUES_SUCCESS: 'FETCH_ALL_CALLS_QUEUES_SUCCESS',
  FETCH_ALL_CALLS_QUEUES_FAIL: 'FETCH_ALL_CALLS_QUEUES_FAIL',

  FETCH_QUEUED_CALL_SUCCESS: 'FETCH_QUEUED_CALL_SUCCESS',

  FETCH_CALLS_STATISTIC_SUCCESS: 'FETCH_CALLS_STATISTIC_SUCCESS',

  FETCH_CALL_QUEUE_STATISTIC_SUCCESS: 'FETCH_CALL_QUEUE_STATISTIC_SUCCESS',
};
export const fetchAllCallsQueuesAC = () => ({
  type: callsQueuesActions.FETCH_ALL_CALLS_QUEUES,
});
export const fetchAllCallsQueuesSuccessAC = (skills) => ({
  type: callsQueuesActions.FETCH_ALL_CALLS_QUEUES_SUCCESS,
  payload: skills,
});
export const fetchAllCallsQueuesFailAC = (errorMessage) => ({
  type: callsQueuesActions.FETCH_ALL_CALLS_QUEUES_FAIL,
  payload: errorMessage,
});

export const fetchQueuedCallSuccess = (queuedCall, callQueueId) => ({
  type: callsQueuesActions.FETCH_QUEUED_CALL_SUCCESS,
  payload: { queuedCall, callQueueId },
});

export const fetchCallStatisticSuccessAC = (callsStatistic, widgetId) => ({
  type: callsQueuesActions.FETCH_CALLS_STATISTIC_SUCCESS,
  payload: { callsStatistic, widgetId },
});

export const fetchQueueStatisticsSuccessAC = (callQueueStatistic, widgetId) => ({
  type: callsQueuesActions.FETCH_CALL_QUEUE_STATISTIC_SUCCESS,
  payload: { callQueueStatistic, widgetId },
});
