export const skillsActions = {
  FETCH_ALL_SKILLS: 'FETCH_ALL_SKILLS',
  FETCH_ALL_SKILLS_SUCCESS: 'FETCH_ALL_SKILLS_SUCCESS',
  FETCH_ALL_SKILLS_FAIL: 'FETCH_ALL_SKILLS_FAIL',

  FETCH_AGENTS_SKILLS: 'FETCH_AGENTS_SKILLS',
  FETCH_AGENTS_SKILLS_SUCCESS: 'FETCH_AGENTS_SKILLS_SUCCESS',
  FETCH_AGENTS_SKILLS_FAIL: 'FETCH_AGENTS_SKILLS_FAIL',
};
export const fetchAllSkillsAC = () => ({
  type: skillsActions.FETCH_ALL_SKILLS,
});
export const fetchAllSkillsSuccessAC = (skills) => ({
  type: skillsActions.FETCH_ALL_SKILLS_SUCCESS,
  payload: skills,
});
export const fetchAllSkillsFailAC = (errorMessage) => ({
  type: skillsActions.FETCH_ALL_SKILLS_FAIL,
  payload: errorMessage,
});

export const fetchAgentsSkillsAC = () => ({
  type: skillsActions.FETCH_AGENTS_SKILLS,
});
export const fetchAgentsSkillsSuccessAC = (agentId, skills) => ({
  type: skillsActions.FETCH_AGENTS_SKILLS_SUCCESS,
  payload: { agentId, skills },
});
export const fetchAgentsSkillsFailAC = (agentId, errorMessage) => ({
  type: skillsActions.FETCH_AGENTS_SKILLS_FAIL,
  payload: { agentId, skills: [], errorMessage },
});
