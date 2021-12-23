import { DEFAULTS } from '../defaults/defaults';

export const filterAgentList = (agentsWithFullInfo, widget) => {
  return agentsWithFullInfo.filter((agent) => {
    let isSkill =
      agent.agentSkills.length === 0
        ? false
        : widget.skills.selectAll || agent.agentSkills.some((agentSkill) => widget.skills.selectedItems.includes(agentSkill.name));
    isSkill =
      widget.skills.selectNone || (!widget.skills.selectAll && !widget.skills.selectedItems.length)
        ? agent.agentSkills.length === 0
          ? true
          : false
        : isSkill;
    isSkill = widget.view === DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.CARD ? true : isSkill;
    const isPresenceState = widget.presenceStates.selectAll || widget.presenceStates.selectedItems.includes(agent.status);
    const isAvailabilityState =
      widget.availabilityStates.selectAll ||
      widget.availabilityStates.selectedItems.some((state) => state.availabilityStateId === agent.availabilityState?.id);
    return isSkill && isPresenceState && isAvailabilityState;
  });
};
