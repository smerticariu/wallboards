export const skillsActions = {
  FETCH_ALL_SKILS: 'FETCH_ALL_SKILS',
  FETCH_ALL_SKILS_SUCCESS: 'FETCH_ALL_SKILS_SUCCESS',
  FETCH_ALL_SKILS_FAIL: 'FETCH_ALL_SKILS_FAIL',
};
export const fetchAllSkilsAC = () => ({
  type: skillsActions.FETCH_ALL_SKILS,
});
export const fetchAllSkilsSuccessAC = (skills) => ({
  type: skillsActions.FETCH_ALL_SKILS_SUCCESS,
  payload: skills,
});
export const fetchAllSkilsFailAC = (errorMessage) => ({
  type: skillsActions.FETCH_ALL_SKILS_FAIL,
  payload: errorMessage,
});
