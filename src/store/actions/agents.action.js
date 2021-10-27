export const agentsActions = {
  FETCH_ALL_AGENTS: 'FETCH_ALL_AGENTS',
  FETCH_ALL_AGENTS_SUCCESS: 'FETCH_ALL_AGENTS_SUCCESS',
  FETCH_ALL_AGENTS_FAIL: 'FETCH_ALL_AGENTS_FAIL',
};
export const fetchAllAgentsAC = () => ({
  type: agentsActions.FETCH_ALL_AGENTS,
});
export const fetchAllAgentsSuccessAC = (agent, callQueueId) => ({
  type: agentsActions.FETCH_ALL_AGENTS_SUCCESS,
  payload: { agent, callQueueId },
});
export const fetchAllAgentsFailAC = (errorMessage) => ({
  type: agentsActions.FETCH_ALL_AGENTS_FAIL,
  payload: errorMessage,
});
