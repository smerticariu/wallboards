import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import { EditIcon } from 'src/assets/static/icons/edit';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { fetchAllAgentsThunk } from 'src/store/thunk/agents.thunk';
import AgentCard from '../agent-card/agent-card';
import AgentTable from '../agent-table/agent-table';
import { ADD_COMPONENT_COLUMNS_NO_OPTIONS, MAIN_VIEWING_OPTIONS } from '../modal/add-component/modal.add-component.defaults';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';
import { AGENTS_TABLE } from './grid.defaults';
import moment from 'moment';
const GridAgentList = ({ isEditMode, widget, ...props }) => {
  const dispatch = useDispatch();
  const agentQueues = useSelector((state) => state.agents.agentsQueues.find((queue) => queue.callQueueId === widget.callQueue.id));
  useEffect(() => {
    dispatch(fetchAllAgentsThunk(widget.callQueue.id));
  }, [widget.callQueue.id]);

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
        {widget.view === MAIN_VIEWING_OPTIONS.CARD ? (
          agentQueues?.agents?.map((agent) => (
            <AgentCard
              key={agent.userId}
              callStatusKey={agent.status}
              callTime="--:--:--"
              ext="0000"
              name="Staff Member Name"
              status={agent.availabilityState.displayName}
              totalTime="00:00:00"
            />
          ))
        ) : (
          <>
            <AgentTable
              columnsToView={widget.columnsToView.selectedItems}
              agents={agentQueues?.agents?.map((agent) => ({
                callStatusKey: agent.status,
                agentName: 'Megan Carter',
                agentExtNo: '0000',
                currAvaiState: agent.availabilityState.displayName,
                currPresState: agent.status,
                noCallsOffered: agent.callCount,
                noCallsAnswered: '0',
                noCallsMissed: '0',
                timeInCurrentPresenceState: '- - : - - : - -',
                timeInCurrentAvailabilityState: '- - : - - : - -',
                timeInCurrentCall: '- - : - - : - -',
                timeInCurrentWrapup: moment({}).seconds(agent.wrapUpTime).format('H:mm:ss'),
                listOfSkills: 'Skill',
              }))}
            />
            {widget.columns === ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO && (
              <AgentTable columnsToView={widget.columnsToView.selectedItems} agents={AGENTS_TABLE} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default GridAgentList;
