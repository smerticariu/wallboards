import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import { EditIcon } from 'src/assets/static/icons/edit';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { changeAgentAvailabilityStateThunk, fetchOrganisationAgentsThunk, fetchUserGroupsThunk } from 'src/store/thunk/agents.thunk';
import AgentCard from '../../agent-card/agent-card';
import AgentListTable from '../../tables/agent-list';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import moment from 'moment';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { PRESENCE_STATE_KEYS } from '../../../common/defaults/modal.defaults';
import { callsToObject } from '../../../common/utils/callsToObject';
import { sortAgentList } from '../../../common/sort/sort.agent-list';
import { filterAgentList } from '../../../common/filter/filter.agent-list';
import { findAgentStatus } from '../../../common/utils/findAgentStatus';

const GridAgentList = ({ isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();
  //fetch status
  const agentsQueuesFetchStatus = useSelector((state) => state.agents.agentsQueuesFetchStatus);
  const organisationUsersFetchStatus = useSelector((state) => state.agents.organisationUsersFetchStatus);
  const userGroupsFetchStatus = useSelector((state) => state.agents.userGroupsFetchStatus);

  //agents
  const agentsQueues = useSelector((state) => state.agents.agentsQueues);
  const agentsFromCurrentCallQueue = useMemo(() => agentsQueues[widget.callQueue.id] ?? [], [agentsQueues, widget.callQueue.id]);
  const organisationUsers = useSelector((state) => state.agents.organisationUsers);

  //calls
  const callsWithGroup = useSelector((state) => state.agents.callsWithGroup);
  const [agentsForDisplay, setAgentsForDisplay] = useState([]);

  //skills
  const agentsSkill = useSelector((state) => state.skills.agentsSkill);

  const availabilityStates = useSelector((state) => state.agents.availabilityStates);
  const availabilityProfiles = useSelector((state) => state.agents.availabilityProfiles);
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
    dispatch(fetchUserGroupsThunk());
    // eslint-disable-next-line
  }, [widget.callQueue.id]);

  useEffect(() => {
    dispatch(fetchOrganisationAgentsThunk());
    // eslint-disable-next-line
  }, [agentsFromCurrentCallQueue]);
  useEffect(() => {
    if (
      agentsQueuesFetchStatus === FetchStatus.SUCCESS &&
      organisationUsersFetchStatus === FetchStatus.SUCCESS &&
      userGroupsFetchStatus === FetchStatus.SUCCESS
    ) {
      const agentsWithFullInfo = agentsFromCurrentCallQueue.map((agentQueue) => {
        const agentSkills = agentsSkill.find((agentSkills) => agentSkills.agentId === agentQueue.userId);
        const lastAvailabilityStateChangeSeconds = agentQueue.lastAvailabilityStateChange
          ? moment().diff(moment(agentQueue.lastAvailabilityStateChange), 'seconds')
          : 0;

        const usersOnCall = callsToObject(callsWithGroup, 'userId');
        const devicesOnCall = callsToObject(callsWithGroup, 'deviceId');
        const agentStatus = findAgentStatus(agentQueue, usersOnCall, devicesOnCall);

        const organisationUser = organisationUsers.find((user) => user.id === agentQueue.userId);
        return {
          ...agentQueue,
          status: agentStatus,
          agentSkills: agentSkills?.skills?.map((skill) => ({ description: skill.description, name: skill.name })) ?? [],
          sipExtension: organisationUser.sipExtension,
          userName: organisationUser.userName,
          firstName: organisationUser.firstName,
          lastName: organisationUser.lastName,
          timeInCurrentAvailabilityState: lastAvailabilityStateChangeSeconds ?? 0,
          currentCallTimeSeconds:
            usersOnCall[agentQueue.userId]?.answerTime && PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF !== agentStatus
              ? moment().diff(moment(usersOnCall[agentQueue.userId].answerTime), 'seconds')
              : 0,
        };
      });
      if (!agentsWithFullInfo) return;

      const filtredAgentsWithFullInfo = filterAgentList(agentsWithFullInfo, widget);
      const sortedAgents = sortAgentList(filtredAgentsWithFullInfo, widget);

      setAgentsForDisplay(sortedAgents);
    }
  }, [
    userGroupsFetchStatus,
    organisationUsersFetchStatus,
    agentsQueuesFetchStatus,
    agentsFromCurrentCallQueue,
    agentsSkill,
    organisationUsers,
    callsWithGroup,
    widget,
  ]);
  // eslint-disable-next-line

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.AGENT_LIST));
    };

    return (
      <div onClick={onEditClick} className="widget__edit-icon">
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
      <div onClick={onDeleteClick} className="widget__delete-icon">
        <CloseIcon className="i--close i--close--small" />
      </div>
    );
  };
  const handleAgentAvailabilityState = (agentId, profileId, stateId, availabilityStateName) => {
    dispatch(changeAgentAvailabilityStateThunk(agentId, profileId, stateId, availabilityStateName));
  };
  return (
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.name}:</div>
          {widget.callQueue.name}
        </div>
        <div className="widget__icons">
          {isEditMode && (
            <>
              {handleEditIcon()}
              {handleDeleteIcon()}
            </>
          )}
        </div>
      </div>
      <div
        className={`widget__body ${widget.view === DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE ? 'widget__body--table' : ''}`}
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
                  <AgentListTable
                    key={index}
                    canChangeAvailabilityState={widget.interactivity.selectedItems.includes('CHANGE_AVAILABILITY_STATE')}
                    canListenLive={widget.interactivity.selectedItems.includes('LISTEN_LIVE')}
                    canCallAgents={widget.interactivity.selectedItems.includes('CALL_AGENTS')}
                    columnsToView={widget.columnsToView.selectedItems}
                    availabilityStatesList={availabilityStatesList}
                    handleAgentAvailabilityState={handleAgentAvailabilityState}
                    agents={[...agentsForDisplay].splice(startSlice, endSlice).map((agent) => ({
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
