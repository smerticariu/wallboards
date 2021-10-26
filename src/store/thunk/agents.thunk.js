import axios from 'axios';
import { fetchAllAgentsAC, fetchAllAgentsFailAC, fetchAllAgentsSuccesAC } from '../actions/agents.action';
// import { fetchAllCallsQueuesThunk } from './callsQueues.thunk';

export const fetchAllAgentsThunk = (callQueueId) => async (dispatch, getState) => {
  // dispatch(fetchAllCallsQueuesThunk());
  dispatch(fetchAllAgentsAC());
  try {
    const { userInfo, token } = getState().login;
    const { callsQueues } = getState().callsQueues;
    
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/call-queue/${callQueueId}/agent`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);

    dispatch(fetchAllAgentsSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchAllSkilsFailAC('something went wrong'));
    console.log(error);
  }
};
