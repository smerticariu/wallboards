import axios from '../../../node_modules/axios/index';
import { AgentsApi } from '../../common/api/agents.api';
import { DEFAULTS } from '../../common/defaults/defaults';
import jwtExtractor from '../../common/utils/jwtExtractor';
import config from '../../config/auth/index';
import { setAccessTokenAC, setUserInfoAC, setUserTokenInfoAC } from '../actions/login.action';

export const fetchUserInfoThunk = (token) => async (dispatch, getState) => {
  try {
    if (!token.length) throw new Error(DEFAULTS.GLOBAL.FAIL);

    const userInfo = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.AGENT_INFO,
      token,
    });
    dispatch(setUserInfoAC(userInfo.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserDataThunk = (sfToken) => async (dispatch, getState) => {
  try {
    const options = {
      method: 'get',
      url: `https://gatekeeper.redmatter-qa01.pub/token/salesforce?scope=${config.scope}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sfToken}`,
      },
    };
    await axios(options).then((res) => {
      dispatch(setAccessTokenAC(res.data.jwt));
      dispatch(setUserTokenInfoAC(jwtExtractor(res.data.jwt)));
      dispatch(fetchUserInfoThunk(res.data.jwt));
    });
  } catch (e) {}
};
