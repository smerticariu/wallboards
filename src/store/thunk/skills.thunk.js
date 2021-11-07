import {
  fetchAgentsSkillsAC,
  fetchAgentsSkillsFailAC,
  fetchAgentsSkillsSuccessAC,
  fetchAllSkillsAC,
  fetchAllSkillsFailAC,
  fetchAllSkillsSuccessAC,
} from '../actions/skills.action';

import { DEFAULTS } from '../../common/defaults/defaults';
import { SkilsApi } from 'src/common/api/skills.api';
import { AgentsApi } from '../../common/api/agents.api';

export const fetchAllSkillsThunk = () => async (dispatch, getState) => {
  dispatch(fetchAllSkillsAC());
  try {
    const { userInfo, token } = getState().login;

    const allSkills = await SkilsApi({
      type: DEFAULTS.SKILLS.API.GET.ALL_SKILLS,
      organizationId: userInfo.organisationId,
      token,
    });

    dispatch(fetchAllSkillsSuccessAC(allSkills.data.data));
  } catch (error) {
    dispatch(fetchAllSkillsFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchAgentSkillThunk = (userId) => async (dispatch, getState) => {
  dispatch(fetchAgentsSkillsAC());
  try {
    const { userInfo, token } = getState().login;

    const agentSkills = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.AGENT_SKILLS,
      organizationId: userInfo.organisationId,
      token,
      agentId: userId,
    });

    dispatch(fetchAgentsSkillsSuccessAC(userId, agentSkills.data.data));
  } catch (error) {
    dispatch(fetchAgentsSkillsFailAC(userId, DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};
