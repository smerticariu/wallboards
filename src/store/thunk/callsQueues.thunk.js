import axios from 'axios';
import { fetchAllCallsQueuesAC, fetchAllCallsQueuesFailAC, fetchAllCallsQueuesSuccessAC } from '../actions/callsQueues.action';

export const fetchAllCallsQueuesThunk = () => async (dispatch, getState) => {
  dispatch(fetchAllCallsQueuesAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/call-queue`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);

    dispatch(fetchAllCallsQueuesSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchAllCallsQueuesFailAC('something went wrong'));
    console.log(error);
  }
};
