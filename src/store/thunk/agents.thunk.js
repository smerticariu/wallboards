import axios from 'axios';
import { fetchAllAgentsAC, fetchAllAgentsFailAC, fetchAllAgentsSuccessAC } from '../actions/agents.action';

export const fetchAllAgentsThunk = (callQueueId) => async (dispatch, getState) => {
  dispatch(fetchAllAgentsAC());
  try {
    const { userInfo, token } = getState().login;
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
    dispatch(fetchAgentById(response.data.data[0].userId));
    dispatch(fetchAllAgentsSuccessAC(response.data.data, callQueueId));
  } catch (error) {
    dispatch(fetchAllAgentsFailAC('something went wrong'));
    console.log(error);
  }
};

export const fetchAgentById = (id) => async (dispatch, getState) => {
  // dispatch(fetchAllAgentsAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/availability/history`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);
    // dispatch(fetchAllAgentsSuccessAC(response.data.data));
  } catch (error) {
    // dispatch(fetchAllAgentsFailAC('something went wrong'));
    console.log(error);
  }
};
