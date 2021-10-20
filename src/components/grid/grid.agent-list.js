import React from 'react';
import { useDispatch } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import { EditIcon } from 'src/assets/static/icons/edit';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import AgentCard from '../agent-card/agent-card';
import AgentTable from '../agent-table/agent-table';
import { ADD_COMPONENT_COLUMN_OPTIONS, MAIN_VIEWING_OPTIONS } from '../modal/add-component/modal.add-component.defaults';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';

const GridAgentList = ({ widget, ...props }) => {
  const dispatch = useDispatch();

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
          Not urgent but somewhat important queue
        </div>
        <div className="agent-list__icons">
          {handleEditIcon()}
          {handleDeleteIcon()}
        </div>
      </div>
      <div className={`agent-list__body ${widget.view === MAIN_VIEWING_OPTIONS.TABLE ? 'agent-list__body--table' : ''}`}>
        {widget.view === MAIN_VIEWING_OPTIONS.CARD ? (
          widget.presenceStates.selectedItems.map((presenceState) => (
            <AgentCard
              key={presenceState}
              callStatus="Inbound Call"
              callStatusKey={presenceState}
              callTime="--:--:--"
              ext="0000"
              name="Staff Member Name"
              status="User online status"
              totalTime="00:00:00"
            />
          ))
        ) : (
          <>
            <AgentTable
              agents={[
                {
                  agentName: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME) ? 'Megan Carter' : '',
                  agentExtNo: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_EXTENSION) ? '0000' : '',
                  currAvaiState: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY)
                    ? 'Busy on calls'
                    : '',
                  currPresState: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_PRESENCE)
                    ? 'Inbound Call'
                    : '',
                  noCallsOffered: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED) ? '0' : '',
                  noCallsAnswered: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED) ? '0' : '',
                  noCallsMissed: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED) ? '0' : '',
                  timeInCurrentPresenceState: widget.columnsToView.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE
                  )
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentAvailabilityState: widget.columnsToView.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_AVAILABILITY
                  )
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentCall: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_CALL)
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentWrapup: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP)
                    ? '- - : - - : - -'
                    : '',
                  listOfSkills: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES)
                    ? 'Skill'
                    : '',
                },
                {
                  agentName: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME) ? 'Megan Carter' : '',
                  agentExtNo: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_EXTENSION) ? '0000' : '',
                  currAvaiState: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY)
                    ? 'Busy on calls'
                    : '',
                  currPresState: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_PRESENCE)
                    ? 'Inbound Call'
                    : '',
                  noCallsOffered: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED) ? '0' : '',
                  noCallsAnswered: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED) ? '0' : '',
                  noCallsMissed: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED) ? '0' : '',
                  timeInCurrentPresenceState: widget.columnsToView.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE
                  )
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentAvailabilityState: widget.columnsToView.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_AVAILABILITY
                  )
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentCall: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_CALL)
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentWrapup: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP)
                    ? '- - : - - : - -'
                    : '',
                  listOfSkills: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES)
                    ? 'Skill'
                    : '',
                },
                {
                  agentName: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME) ? 'Megan Carter' : '',
                  agentExtNo: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_EXTENSION) ? '0000' : '',
                  currAvaiState: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY)
                    ? 'Busy on calls'
                    : '',
                  currPresState: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_PRESENCE)
                    ? 'Inbound Call'
                    : '',
                  noCallsOffered: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED) ? '0' : '',
                  noCallsAnswered: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED) ? '0' : '',
                  noCallsMissed: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED) ? '0' : '',
                  timeInCurrentPresenceState: widget.columnsToView.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE
                  )
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentAvailabilityState: widget.columnsToView.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_AVAILABILITY
                  )
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentCall: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_CALL)
                    ? '- - : - - : - -'
                    : '',
                  timeInCurrentWrapup: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP)
                    ? '- - : - - : - -'
                    : '',
                  listOfSkills: widget.columnsToView.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES)
                    ? 'Skill'
                    : '',
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default GridAgentList;
