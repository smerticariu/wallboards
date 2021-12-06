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
  fetchDevicesSipAgentsThunk,
  fetchOrganisationAgentsThunk,
  fetchUserGroupsThunk,
} from 'src/store/thunk/agents.thunk';
import AgentCard from '../../agent-card/agent-card';
import AgentListTable from '../../tables/agent-list';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { fetchAgentSkillThunk } from 'src/store/thunk/skills.thunk';
import moment from 'moment';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { PRESENCE_STATE_KEYS, SORT_BY_VALUES } from '../../../common/defaults/modal.defaults';
const GridAgentList = ({ isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();
  const agentQueues = useSelector((state) => state.agents.agentsQueues.find((queue) => queue.callQueueId === widget.callQueue.id));
  const agents = useSelector((state) => state.agents);
  const calls = useSelector((state) => state.agents.calls);
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
    dispatch(fetchDevicesSipAgentsThunk());
    dispatch(fetchUserGroupsThunk());
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
      const agentsWithFullInfo = agentQueues?.agents?.map((agentQueue) => {
        const agentSkills = agentsSkill.find((agentSkills) => agentSkills.agentId === agentQueue.userId);
        const userCurrentCall = calls.filter((call) => call.userId === agentQueue.userId || call.deviceId === agentQueue.deviceId).pop();

        const lastAvailabilityStateChangeSeconds = agentQueue.lastAvailabilityStateChange
          ? moment().diff(moment(agentQueue.lastAvailabilityStateChange), 'seconds')
          : 0;
        let agentStatus = agentQueue.status;
        switch (agentQueue.status.toLowerCase()) {
          case PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF:
            agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF;
            break;
          case PRESENCE_STATE_KEYS.AGENT_STATUS_BUSY:
            agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE;
            //try to detect RINGING state
            if (agentQueue.userId != null) {
              if (userCurrentCall) {
                if (userCurrentCall.state === 'RINGING') {
                  agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
                }
                break;
              }
            }
            //try to find the device in the active calls
            if (agentQueue.deviceId != null) {
              if (userCurrentCall) {
                if (userCurrentCall.state === 'RINGING') {
                  agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
                }
                break;
              }
            }
            break;
          case PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE:
            //try to find the user in the active calls
            if (agentQueue.userId != null) {
              if (userCurrentCall) {
                agentStatus =
                  ['INBOUND', 'INCOMING'].indexOf(userCurrentCall.logicalDirection) !== -1
                    ? PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER
                    : PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND;
                agentQueue.answerTime = userCurrentCall.answerTime;
                if (userCurrentCall.state === 'RINGING') {
                  agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
                }
                break;
              }
            }
            // try to find the device in the active calls
            if (agentQueue.deviceId != null) {
              if (userCurrentCall) {
                agentStatus =
                  ['INBOUND', 'INCOMING'].indexOf(userCurrentCall.logicalDirection) !== -1
                    ? PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER
                    : PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND;
                agentQueue.answerTime = userCurrentCall.answerTime;
                if (userCurrentCall.state === 'RINGING') {
                  agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
                }
                break;
              }
            }
            //check is agent is inWrapUp
            if (agentQueue.inWrapUp === true) {
              agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP;
              break;
            }
            break;
          default:
            agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE;
        }

        return {
          ...agentQueue,
          status: agentStatus,
          agentSkills: agentSkills?.skills?.map((skill) => ({ description: skill.description, name: skill.name })) ?? [],
          sipExtension: agentQueue.organisationUserData?.sipExtension,
          userName: agentQueue.organisationUserData?.userName,
          firstName: agentQueue.organisationUserData?.firstName,
          lastName: agentQueue.organisationUserData?.lastName,
          timeInCurrentAvailabilityState: lastAvailabilityStateChangeSeconds ?? 0,
          currentCallTimeSeconds:
            userCurrentCall?.answerTime && PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF !== agentStatus
              ? moment().diff(moment(userCurrentCall.answerTime), 'seconds')
              : 0,
        };
      });
      if (!agentsWithFullInfo) return;

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