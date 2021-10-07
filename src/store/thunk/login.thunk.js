import axios from 'axios';
import { setUserInfoAC } from '../actions/login.action';

export const fetchUserInfoThunk = (token) => async (dispatch, getState) => {
  try {
    const options = {
      method: 'get',
      url: 'https://sapien-proxy.redmatter-qa01.pub/v1/user/me',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    if (!token.length) throw new Error('Invalid token');

    const getData = await axios(options).then((res) => res.data);
    dispatch(setUserInfoAC(getData.data));
  } catch (error) {
    console.log(error);
  }
};
