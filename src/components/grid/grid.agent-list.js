import React, { forwardRef } from 'react';
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
import {
  ADD_COMPONENT_COLUMNS_NO_OPTIONS,
  CALL_QUEUE_OPTIONS,
  MAIN_VIEWING_OPTIONS,
} from '../modal/add-component/modal.add-component.defaults';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';
import { AGENTS_TABLE } from './grid.defaults';

const GridAgentList = forwardRef(({ isEditMode, widget, ...props }, ref) => {
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
          {CALL_QUEUE_OPTIONS.find((option) => option.VALUE === widget.queue).TEXT}
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
        ref={ref}
        id={widget.id}
        className={`agent-list__body ${widget.view === MAIN_VIEWING_OPTIONS.TABLE ? 'agent-list__body--table' : ''}`}
      >
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
            <AgentTable columnsToView={widget.columnsToView.selectedItems} agents={AGENTS_TABLE} />
            {widget.columns === ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO && (
              <AgentTable columnsToView={widget.columnsToView.selectedItems} agents={AGENTS_TABLE} />
            )}
          </>
        )}
      </div>
    </div>
  );
});
export default GridAgentList;
