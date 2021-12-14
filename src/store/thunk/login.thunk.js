import axios from '../../../node_modules/axios/index';
import { AgentsApi } from '../../common/api/agents.api';
import { DEFAULTS } from '../../common/defaults/defaults';
import jwtExtractor from '../../common/utils/jwtExtractor';
import config from '../../config/auth/authConfig';
import { setAccessTokenAC, setUserInfoAC, setUserTokenInfoAC, setSapienUrlAC, setStoreUrlAC, setGatekeeperUrlAC } from '../actions/login.action';

export const fetchUserInfoThunk = (token) => async (dispatch, getState) => {
  try {
    console.log('fetchUserInfoThunk', token)
    if (!token) throw new Error(DEFAULTS.GLOBAL.FAIL);
    let sapienUrl = "";
    console.log('config'. config)
    await axios.get(`${config.envHost}/flightdeck/config`).then(res => {
      sapienUrl = res.data.sapienUrl;
      dispatch(setSapienUrlAC(res.data.sapienUrl));
      dispatch(setStoreUrlAC(res.data.storeUrl));
      dispatch(setGatekeeperUrlAC(res.data.gatekeeperUrl));
    });
    const userInfo = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.AGENT_INFO,
      token,
      sapienUrl,
    });
    dispatch(setUserInfoAC(userInfo.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserDataThunk = (sfToken) => async (dispatch, getState) => {
  try {
    const { gatekeeperUrl } = getState().login;
    const options = {
      method: 'get',
      url: `${gatekeeperUrl}/token/salesforce?scope=${config.scope}`,
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
