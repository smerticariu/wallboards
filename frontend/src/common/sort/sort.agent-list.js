import { SORT_BY_VALUES } from '../defaults/modal.defaults';

export const sortAgentList = (filtredAgentsWithFullInfo, widget) => {
  return [...filtredAgentsWithFullInfo].sort((agent1, agent2) => {
    if (widget.sortBy === SORT_BY_VALUES.AGENT_NAME)
      return `${agent1.firstName} ${agent1.lastName}`.toUpperCase().localeCompare(`${agent2.firstName} ${agent2.lastName}`.toUpperCase());
    if (widget.sortBy === SORT_BY_VALUES.AVAILABILITY_STATE)
      return agent1?.availabilityState?.displayName.localeCompare(agent2?.availabilityState?.displayName);
    if (widget.sortBy === SORT_BY_VALUES.PRESENCE_STATE) return agent1.status.localeCompare(agent2.status);
    if (widget.sortBy === SORT_BY_VALUES.TIME_CURRENT_AVAILABILITY_STATE)
      return agent2.timeInCurrentAvailabilityState - agent1.timeInCurrentAvailabilityState;
    if (widget.sortBy === SORT_BY_VALUES.TIME_CURRENT_CALL) return agent2.currentCallTimeSeconds - agent1.currentCallTimeSeconds;
    return 0;
  });
};
