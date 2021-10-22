import axios from 'axios';
import { fetchAllSkilsAC, fetchAllSkilsFailAC, fetchAllSkilsSuccessAC } from '../actions/skills.action';

export const fetchAllSkilsThunk = () => async (dispatch, getState) => {
  dispatch(fetchAllSkilsAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/user/${userInfo.id}/skill`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);

    dispatch(fetchAllSkilsSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchAllSkilsFailAC('something went wrong'));
    console.log(error);
  }
};
