import {
  fetchAllCallsQueuesAC,
  fetchAllCallsQueuesFailAC,
  fetchAllCallsQueuesSuccessAC,
  fetchCallStatisticSuccessAC,
  fetchQueuedCallSuccess,
  fetchQueueStatisticsSuccessAC,
} from '../actions/callsQueues.action';
import { DEFAULTS } from '../../common/defaults/defaults';

import { CallsQueuesApi } from 'src/common/api/callsQueues.api';
import { CallsApi } from '../../common/api/calls.api';

export const fetchAllCallsQueuesThunk = () => async (dispatch, getState) => {
  dispatch(fetchAllCallsQueuesAC());
  try {
    const { userInfo, token } = getState().login;

    const allCallsQueues = await CallsQueuesApi({
      type: DEFAULTS.CALLS_QUEUES.API.GET.ALL_CALLS_QUEUES,
      organizationId: userInfo.organisationId,
      token,
    });

    dispatch(fetchAllCallsQueuesSuccessAC(allCallsQueues.data.data));
  } catch (error) {
    dispatch(fetchAllCallsQueuesFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchQueuedCallThunk = (callQueueId) => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;

    const allCallsQueues = await CallsQueuesApi({
      type: DEFAULTS.CALLS_QUEUES.API.GET.CALL_QUEUE,
      organizationId: userInfo.organisationId,
      callQueueId,
      token,
    });

    dispatch(fetchQueuedCallSuccess(allCallsQueues.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCallStatisticThunk =
  ({ timeStart, timeEnd }, widgetId) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token } = getState().login;

      const response = await CallsApi({
        type: DEFAULTS.CALLS.API.GET.CALLS_STATISTIC,
        organizationId: userInfo.organisationId,
        token,
        timeStart,

        timeEnd,
      });

      dispatch(fetchCallStatisticSuccessAC(response.data.data, widgetId));
    } catch (error) {
      console.log(error);
    }
  };

export const fetchQueueStatisticsThunk =
  ({ timeStart, timeEnd }, widgetId, callQueueId) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token } = getState().login;

      const response = await CallsQueuesApi({
        type: DEFAULTS.CALLS_QUEUES.API.GET.CALL_QUEUE_STATISTICS,
        organizationId: userInfo.organisationId,
        token,
        timeStart,
        callQueueId,
        timeEnd,
      });

      dispatch(fetchQueueStatisticsSuccessAC(response.data.data, widgetId));
    } catch (error) {
      console.log(error);
    }
  };
