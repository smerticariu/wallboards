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
    const { userInfo, token, sapienUrl } = getState().login;

    const allSkills = await SkilsApi({
      type: DEFAULTS.SKILLS.API.GET.ALL_SKILLS,
      organizationId: userInfo.organisationId,
      token,
      sapienUrl,
    });

    dispatch(fetchAllSkillsSuccessAC(allSkills.data.data));
  } catch (error) {
    dispatch(fetchAllSkillsFailAC(DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};

export const fetchAgentSkillThunk = (userId) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { userInfo, token, sapienUrl } = state.login;
    const allSkills = state.skills.agentsSkill;
    const reduxAgentSkills = allSkills.find((agentSkills) => agentSkills.agentId === userId);
    if (!reduxAgentSkills) {
      dispatch(fetchAgentsSkillsAC());
    }

    const response = await AgentsApi({
      type: DEFAULTS.AGENTS.API.GET.AGENT_SKILLS,
      organizationId: userInfo.organisationId,
      token,
      agentId: userId,
      sapienUrl,
    });
    const agentSkills = response.data.data;
    const reduxAgentSkillSorted = reduxAgentSkills ? [...reduxAgentSkills.skills].sort((skill1, skill2) => skill1.id - skill2.id) : null;
    const agentSkillsSorted = [...agentSkills].sort((skill1, skill2) => skill1.id - skill2.id);

    if (JSON.stringify(reduxAgentSkillSorted) !== JSON.stringify(agentSkillsSorted)) {
      dispatch(fetchAgentsSkillsSuccessAC(userId, agentSkills));
    }
  } catch (error) {
    dispatch(fetchAgentsSkillsFailAC(userId, DEFAULTS.GLOBAL.FAIL));
    console.log(error);
  }
};
