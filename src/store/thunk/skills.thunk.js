import axios from 'axios';
import {
  fetchAgentsSkillsAC,
  fetchAgentsSkillsFailAC,
  fetchAgentsSkillsSuccessAC,
  fetchAllSkillsAC,
  fetchAllSkillsFailAC,
  fetchAllSkillsSuccessAC,
} from '../actions/skills.action';

export const fetchAllSkillsThunk = () => async (dispatch, getState) => {
  dispatch(fetchAllSkillsAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/skill`,

      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);

    dispatch(fetchAllSkillsSuccessAC(response.data.data));
  } catch (error) {
    dispatch(fetchAllSkillsFailAC('something went wrong'));
    console.log(error);
  }
};

export const fetchAgentSkillThunk = (userId) => async (dispatch, getState) => {
  dispatch(fetchAgentsSkillsAC());
  try {
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.organisationId}/user/${userId}/skill`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const response = await axios(options);

    dispatch(fetchAgentsSkillsSuccessAC(userId, response.data.data));
  } catch (error) {
    dispatch(fetchAgentsSkillsFailAC(userId, 'something went wrong'));
    console.log(error);
  }
};
