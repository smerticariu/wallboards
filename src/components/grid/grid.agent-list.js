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
  fetchUsersCurrentCallTimeThunk,
} from 'src/store/thunk/agents.thunk';
import AgentCard from '../agent-card/agent-card';
import AgentTable from '../agent-table/agent-table';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { fetchAgentSkillThunk } from 'src/store/thunk/skills.thunk';
import moment from '../../../node_modules/moment/moment';
import { DEFAULTS } from '../../common/defaults/defaults';
import { SORT_BY_VALUES } from '../../common/defaults/modal.defaults';
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
      dispatch(fetchUsersCurrentCallTimeThunk());
    }, 2000);
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
    dispatch(fetchOrganisationAgentsThunk());
    // eslint-disable-next-line
  }, [agentQueues?.agents?.length]);
  useEffect(() => {
    if (
      agents.agentsQueuesFetchStatus === FetchStatus.SUCCESS &&
      agents.organisationUsersFetchStatus === FetchStatus.SUCCESS &&
      agents.sipDevicesFetchStatus === FetchStatus.SUCCESS &&
      agents.userGroupsFetchStatus === FetchStatus.SUCCESS
    ) {
      const agentsWithFullInfo = agentQueues.agents.map((agentQueue) => {
        const agentSkills = agentsSkill.find((agentSkills) => agentSkills.agentId === agentQueue.userId);
        const lastAvailabilityStateChangeSeconds = moment().diff(moment(agentQueue.lastAvailabilityStateChange), 'seconds');

        return {
          ...agentQueue,
          agentSkills: agentSkills?.skills?.map((skill) => ({ description: skill.description, name: skill.name })) ?? [],
          sipExtension: agentQueue.organisationUserData?.sipExtension,
          userName: agentQueue.organisationUserData?.userName,
          firstName: agentQueue.organisationUserData?.firstName,
          lastName: agentQueue.organisationUserData?.lastName,
          timeInCurrentAvailabilityState: lastAvailabilityStateChangeSeconds ?? 0,
          currentCallTimeSeconds: agentQueue?.userCurrentCall?.answerTime
            ? moment().diff(moment(agentQueue.userCurrentCall.answerTime), 'seconds')
            : 0,
        };
      });

      const filtredAgentsWithFullInfo = agentsWithFullInfo.filter((agent) => {
        let isSkill =
          agent.agentSkills.length === 0
            ? false
            : widget.skills.selectAll || agent.agentSkills.some((agentSkill) => widget.skills.selectedItems.includes(agentSkill.name));
        isSkill = widget.view === DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.CARD ? true : isSkill;
        isSkill =
          widget.skills.selectNone || (!widget.skills.selectAll && !widget.skills.selectedItems.length)
            ? agent.agentSkills.length === 0
              ? true
              : false
            : isSkill;
        const isPresenceState = widget.presenceStates.selectAll || widget.presenceStates.selectedItems.includes(agent.status);
        const isAvailabilityState =
          widget.availabilityStates.selectAll ||
          widget.availabilityStates.selectedItems.some((state) => state.availabilityStateId === agent.availabilityState?.id);
        return isSkill && isPresenceState && isAvailabilityState;
      });

      const sortedAgents = filtredAgentsWithFullInfo.sort((agent1, agent2) => {
        if (widget.sortBy === SORT_BY_VALUES.AGENT_NAME)
          return `${agent1.firstName} ${agent1.lastName}`
            .toUpperCase()
            .localeCompare(`${agent2.firstName} ${agent2.lastName}`.toUpperCase());
        if (widget.sortBy === SORT_BY_VALUES.AVAILABILITY_STATE)
          return agent1?.availabilityState?.displayName.localeCompare(agent2?.availabilityState?.displayName);
        if (widget.sortBy === SORT_BY_VALUES.PRESENCE_STATE) return agent1.status.localeCompare(agent2.status);
        if (widget.sortBy === SORT_BY_VALUES.TIME_CURRENT_AVAILABILITY_STATE)
          return agent2.timeInCurrentAvailabilityState - agent1.timeInCurrentAvailabilityState;
        if (widget.sortBy === SORT_BY_VALUES.TIME_CURRENT_CALL) return agent2.currentCallTimeSeconds - agent1.currentCallTimeSeconds;
        return 0;
      });
      setAgentsForDisplay(sortedAgents);
    }
    // eslint-disable-next-line
  }, [agents, agentsSkill]);

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.ADD_COMPONENT));
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
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD_COMPONENT));
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
      <div
        className={`agent-list__body ${
          widget.view === DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE ? 'agent-list__body--table' : ''
        }`}
      >
        {!agentsForDisplay.length || widget.columnsToView.selectedItems.length === 0 ? (
          <div className="empty-message empty-message--agents">No agents</div>
        ) : widget.view === DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.CARD ? (
          agentsForDisplay.map((agent, index) => (
            <AgentCard
              id={agent.userId}
              availabilityStatesList={availabilityStatesList}
              handleAgentAvailabilityState={handleAgentAvailabilityState}
              key={`${agent.userId} ${index}`}
              callStatusKey={agent.status}
              callTime={agent.currentCallTimeSeconds}
              ext={agent.sipExtension}
              name={`${agent.firstName} ${agent.lastName}`}
              status={agent?.availabilityState?.displayName ?? 'None'}
              totalTime={agent.timeInCurrentAvailabilityState}
              canChangeAvailabilityState={widget.interactivity.selectedItems.includes('CHANGE_AVAILABILITY_STATE')}
              canListenLive={widget.interactivity.selectedItems.includes('LISTEN_LIVE')}
              canCallAgents={widget.interactivity.selectedItems.includes('CALL_AGENTS')}
            />
          ))
        ) : (
          <>
            {[...new Array(widget.columns === DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO ? 2 : 1)].map(
              (_, index) => {
                const startSlice =
                  widget.columns === DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO
                    ? index === 0
                      ? 0
                      : agentsForDisplay.length % 2 === 0
                      ? agentsForDisplay.length / 2
                      : agentsForDisplay.length / 2 + 1
                    : 0;

                const endSlice =
                  widget.columns === DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO
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
                    columnsToView={widget.columnsToView.selectedItems}
                    availabilityStatesList={availabilityStatesList}
                    handleAgentAvailabilityState={handleAgentAvailabilityState}
                    agents={JSON.parse(JSON.stringify(agentsForDisplay))
                      .splice(startSlice, endSlice)
                      .map((agent) => ({
                        id: agent.userId,
                        callStatusKey: agent.status,
                        agentName: `${agent.firstName} ${agent.lastName}`,
                        agentExtNo: agent.sipExtension ?? 'No data',
                        currAvaiState: agent.availabilityState?.displayName ?? 'None',
                        currPresState: agent.status,
                        noCallsOffered: agent.callCount,
                        noCallsAnswered: '0',
                        noCallsMissed: '0',
                        timeInCurrentPresenceState: 0,
                        timeInCurrentAvailabilityState: agent.timeInCurrentAvailabilityState,
                        timeInCurrentCall: agent.currentCallTimeSeconds,
                        timeInCurrentWrapup: 0,
                        listOfSkills: agent.agentSkills,
                      }))}
                  />
                );
              }
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default GridAgentList;
