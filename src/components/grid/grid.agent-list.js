import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import { EditIcon } from 'src/assets/static/icons/edit';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import {
  changeAgentAvailabilityStateThunk,
  fetchAllAgentsThunk,
  fetchDevicesSipAgentsThunk,
  fetchOrganisationAgentsThunk,
  fetchUserGroupsThunk,
} from 'src/store/thunk/agents.thunk';
import AgentCard from '../agent-card/agent-card';
import AgentTable from '../agent-table/agent-table';
import {
  ADD_COMPONENT_COLUMNS_NO_OPTIONS,
  MAIN_VIEWING_OPTIONS,
  PRESENCE_STATE_KEYS,
  SORT_BY_VALUES,
} from '../modal/add-component/modal.add-component.defaults';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { fetchAgentSkillThunk } from 'src/store/thunk/skills.thunk';
const GridAgentList = ({ isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();
  const agentQueues = useSelector((state) => state.agents.agentsQueues.find((queue) => queue.callQueueId === widget.callQueue.id));
  const agents = useSelector((state) => state.agents);
  const { agentsSkill } = useSelector((state) => state.skills);
  const [agentsForDisplay, setAgentsForDisplay] = useState([]);

  const { availabilityStates, availabilityProfiles } = useSelector((state) => state.agents);
  const [availabilityStatesList, handleAvailabilityStatesList] = useState([]);

  useEffect(() => {
    if (availabilityStates.length && availabilityProfiles.length) {
      handleAvailabilityStatesList(
        availabilityProfiles.reduce((availabilityList, availabilityProfile) => {
          const list = [];
          const availabilityState = availabilityStates.find((state) => state.availabilityProfileId === availabilityProfile.id);
          if (availabilityState) {
            availabilityState.states.forEach((state) =>
              list.push({
                availabilityProfileId: availabilityProfile.id,
                availabilityProfileName: availabilityProfile.name,
                availabilityStateId: state.id,
                availabilityStateName: state.name,
                availabilityStateDisplayName: state.displayName,
              })
            );
          }
          return [...availabilityList, ...list];
        }, [])
      );
    }
  }, [availabilityProfiles, availabilityStates]);
  useEffect(() => {
    dispatch(fetchAllAgentsThunk(widget.callQueue.id));
    const agentsInterval = setInterval(() => {
      dispatch(fetchAllAgentsThunk(widget.callQueue.id));
    }, 2000);
    dispatch(fetchOrganisationAgentsThunk());
    dispatch(fetchDevicesSipAgentsThunk());
    dispatch(fetchUserGroupsThunk());
    return () => clearInterval(agentsInterval);
    // eslint-disable-next-line
  }, [widget.callQueue.id]);

  useEffect(() => {
    if (agentQueues?.agents?.length) {
      agentQueues.agents.forEach((agent) => {
        dispatch(fetchAgentSkillThunk(agent.userId));
      });
    }
    // eslint-disable-next-line
  }, [agentQueues]);

  useEffect(() => {
    if (
      agents.agentsQueuesFetchStatus === FetchStatus.SUCCESS &&
      agents.organisationUsersFetchStatus === FetchStatus.SUCCESS &&
      agents.sipDevicesFetchStatus === FetchStatus.SUCCESS &&
      agents.userGroupsFetchStatus === FetchStatus.SUCCESS
    ) {
      const agentsWithFullInfo = agentQueues.agents.map((agentQueue) => {
        const orgUser = agents.organisationUsers.find((orgUser) => orgUser.id === agentQueue.userId);
        const agentSkills = agentsSkill.find((agentSkills) => agentSkills.agentId === agentQueue.userId);
        const lastAvailabilityStateChangeSeconds = (new Date() - new Date(agentQueue.lastAvailabilityStateChange)) / 1000;

        return {
          ...agentQueue,
          agentSkills: agentSkills?.skills?.map((skill) => ({ description: skill.description, name: skill.name })) ?? [],
          sipExtension: orgUser.sipExtension,
          userName: orgUser.userName,
          firstName: orgUser.firstName,
          lastName: orgUser.lastName,
          timeInCurrentAvailabilityState: lastAvailabilityStateChangeSeconds ?? 0,
        };
      });

      const filtredAgentsWithFullInfo = agentsWithFullInfo.filter((agent) => {
        const isSkill =
          agent.agentSkills.length === 0
            ? false
            : widget.skills.selectAll || agent.agentSkills.some((agentSkill) => widget.skills.selectedItems.includes(agentSkill.name));
        const isPresenceState = widget.presenceStates.selectAll || widget.presenceStates.selectedItems.includes(agent.status);
        const isAvailabilityState =
          widget.availabilityStates.selectAll ||
          widget.availabilityStates.selectedItems.some((state) => state.availabilityStateId === agent.availabilityState?.id);
        return isSkill && isPresenceState && isAvailabilityState;
      });
      const sortedAgents = filtredAgentsWithFullInfo.sort((agent1, agent2) => {
        if (widget.sortBy === SORT_BY_VALUES.AGENT_NAME)
          return `${agent2.firstName} ${agent2.lastName}`
            .toUpperCase()
            .localeCompare(`${agent1.firstName} ${agent1.lastName}`.toUpperCase());
        if (widget.sortBy === SORT_BY_VALUES.AVAILABILITY_STATE)
          return agent1?.availabilityState?.displayName.localeCompare(agent2?.availabilityState?.displayName);
        if (widget.sortBy === SORT_BY_VALUES.PRESENCE_STATE) return agent1.status.localeCompare(agent2.status);
        if (widget.sortBy === SORT_BY_VALUES.TIME_CURRENT_AVAILABILITY_STATE)
          return agent2.timeInCurrentAvailabilityState - agent1.timeInCurrentAvailabilityState;
        return 0;
      });
      setAgentsForDisplay(sortedAgents);
    }
    // eslint-disable-next-line
  }, [agents, agentsSkill]);

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.ADD_COMPONENT));
    };

    return (
      <div onClick={onEditClick} className="agent-list__edit-icon">
        <EditIcon className="i--edit i--edit--margin-right" />
      </div>
    );
  };

  const handleDeleteIcon = () => {
    const onDeleteClick = () => {
      dispatch(setWallboardComponentForDeleteAC(widget));
      dispatch(handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.DELETE_WALLBOARD_COMPONENT));
    };
    return (
      <div onClick={onDeleteClick} className="agent-list__delete-icon">
        <CloseIcon className="i--close i--close--small" />
      </div>
    );
  };
  const handleAgentAvailabilityState = (agentId, profileId, stateId, availabilityStateName) => {
    dispatch(changeAgentAvailabilityStateThunk(agentId, profileId, stateId, availabilityStateName));
  };
  return (
    <div className="agent-list">
      <div className="agent-list__header">
        <div className="agent-list__title">
          <div className="agent-list__title--bold">{widget.name}:</div>
          {widget.callQueue.name}
        </div>
        <div className="agent-list__icons">
          {isEditMode && (
            <>
              {handleEditIcon()}
              {handleDeleteIcon()}
            </>
          )}
        </div>
      </div>
      <div className={`agent-list__body ${widget.view === MAIN_VIEWING_OPTIONS.TABLE ? 'agent-list__body--table' : ''}`}>
        {!agentsForDisplay.length ? (
          <div className="empty-message empty-message--agents">No agents</div>
        ) : widget.view === MAIN_VIEWING_OPTIONS.CARD ? (
          agentsForDisplay.map((agent, index) => (
            <AgentCard
              id={agent.userId}
              availabilityStatesList={availabilityStatesList}
              handleAgentAvailabilityState={handleAgentAvailabilityState}
              key={`${agent.userId} ${index}`}
              callStatusKey={agent.status}
              callTime={0}
              isEditMode={isEditMode}
              ext={agent.sipExtension}
              name={`${agent.lastName} ${agent.firstName}`}
              status={agent?.availabilityState?.displayName ?? 'None'}
              totalTime="00:00:00"
              canChangeAvailabilityState={widget.interactivity.selectedItems.includes('CHANGE_AVAILABILITY_STATE')}
              canListenLive={widget.interactivity.selectedItems.includes('LISTEN_LIVE')}
              canCallAgents={widget.interactivity.selectedItems.includes('CALL_AGENTS')}
            />
          ))
        ) : (
          <>
            {[...new Array(widget.columns === ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO ? 2 : 1)].map((_, index) => {
              const startSlice =
                widget.columns === ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO
                  ? index === 0
                    ? 0
                    : agentsForDisplay.length % 2 === 0
                    ? agentsForDisplay.length / 2
                    : agentsForDisplay.length / 2 + 1
                  : 0;

              const endSlice =
                widget.columns === ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO
                  ? index === 0
                    ? agentsForDisplay.length % 2 === 0
                      ? agentsForDisplay.length / 2
                      : (agentsForDisplay.length + 1) / 2
                    : agentsForDisplay.length
                  : agentsForDisplay.length;
              return (
                <AgentTable
                  key={index}
                  canChangeAvailabilityState={widget.interactivity.selectedItems.includes('CHANGE_AVAILABILITY_STATE')}
                  canListenLive={widget.interactivity.selectedItems.includes('LISTEN_LIVE')}
                  canCallAgents={widget.interactivity.selectedItems.includes('CALL_AGENTS')}
                  isEditMode={isEditMode}
                  columnsToView={widget.columnsToView.selectedItems}
                  availabilityStatesList={availabilityStatesList}
                  handleAgentAvailabilityState={handleAgentAvailabilityState}
                  agents={JSON.parse(JSON.stringify(agentsForDisplay))
                    .splice(startSlice, endSlice)
                    .map((agent) => ({
                      id: agent.userId,
                      callStatusKey: agent.status,
                      agentName: `${agent.lastName} ${agent.firstName}`,
                      agentExtNo: agent.sipExtension,
                      currAvaiState: agent.availabilityState?.displayName ?? 'None',
                      currPresState: agent.status,
                      noCallsOffered: agent.callCount,
                      noCallsAnswered: '0',
                      noCallsMissed: '0',
                      timeInCurrentPresenceState: 0,
                      timeInCurrentAvailabilityState: agent.timeInCurrentAvailabilityState,
                      timeInCurrentCall: 0,
                      timeInCurrentWrapup: 0,
                      listOfSkills: agent.agentSkills,
                    }))}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
export default GridAgentList;
