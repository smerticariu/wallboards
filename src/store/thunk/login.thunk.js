import { AgentsApi } from '../../common/api/agents.api';
import { DEFAULTS } from '../../common/defaults/defaults';
import { setUserInfoAC } from '../actions/login.action';

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
