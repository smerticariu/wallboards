import { fetchAllCallsQueuesAC, fetchAllCallsQueuesFailAC, fetchAllCallsQueuesSuccessAC } from '../actions/callsQueues.action';
import { DEFAULTS } from '../../common/defaults/defaults';

import { CallsQueuesApi } from 'src/common/api/callsQueues.api';

export const fetchAllCallsQueuesThunk = () => async (dispatch, getState) => {
  dispatch(fetchAllCallsQueuesAC());
  try {
    const { userInfo, token } = getState().login;

    const allCallsQueues = await CallsQueuesApi({
      type: DEFAULTS.CALLS_QUEUES.API.GET.ALL_CALLS_QUEUES,
      organizationId: userInfo.organisationId,
      token,
    })

    dispatch(fetchAllCallsQueuesSuccessAC(allCallsQueues.data.data));
  } catch (error) {
    dispatch(fetchAllCallsQueuesFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};
