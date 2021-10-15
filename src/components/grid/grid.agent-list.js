import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import { EditIcon } from 'src/assets/static/icons/edit';
import { handleWallboardActiveModalAC, setWidgetComponentForEditAC, setWidgetSizeAC } from 'src/store/actions/wallboards.action';
import AgentCard from '../agent-card/agent-card';
import AgentTable from '../agent-table/agent-table';
import { MAIN_VIEWING_OPTIONS } from '../modal/add-component/modal.add-component.defaults';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';
import { SortableDragHandle } from '../sortable/sortable';
import ResizeComponent from './grid.resize-component';

const GridAgentList = ({ widget, ...props }) => {
  const [cardSize, setCardSize] = useState({ width: widget?.size?.width, height: widget?.size?.height });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cardSize.width && !cardSize.height) return;

    const timeout = setTimeout(() => {
      dispatch(setWidgetSizeAC(cardSize, widget.id));
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [cardSize]);
  const onCardResize = (size) => {
    setCardSize(size);
  };

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget.id));
      dispatch(handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.ADD_COMPONENT));
    };
    return (
      <div onClick={onEditClick} className="agent-list__edit-icon">
        <EditIcon className="i--edit i--edit--margin-right" />
      </div>
    );
  };
  const handleDeleteIcon = () => {
    const onDeleteClick = () => {};
    return (
      <div onClick={onDeleteClick} className="agent-list__delete-icon">
        <CloseIcon className="i--close i--close--small" />
      </div>
    );
  };
  return (
    <ResizeComponent onResize={onCardResize} width={widget?.size?.width} height={widget?.size?.height} className="agent-list">
      <div className="agent-list__header">
        <SortableDragHandle>
          <div className="agent-list__title">
            <div className="agent-list__title--bold">Agent List:</div>
            Not urgent but somewhat important queue
          </div>
        </SortableDragHandle>
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
                  agentName: 'Megan Carter',
                  agentExtNo: '0000',
                  currAvaiState: 'Busy on calls',
                  currPresState: 'Inbound Call',
                  noCallsOffered: '0',
                  // noCallsAnswered: '0',
                  // noCallsMissed: '0',
                  // timeInCurrentPresenceState: '- - : - - : - -',
                  // timeInCurrentAvailabilityState: '- - : - - : - -',
                  // timeInCurrentCall: '- - : - - : - -',
                  timeInCurrentWrapup: '- - : - - : - -',
                  // listOfSkills: 'Skill',
                },
                {
                  agentName: 'Megan Carter',
                  agentExtNo: '0000',
                  currAvaiState: 'Busy on calls',
                  currPresState: 'Inbound Call',
                  noCallsOffered: '0',
                  // noCallsAnswered: '0',
                  // noCallsMissed: '0',
                  // timeInCurrentPresenceState: '- - : - - : - -',
                  // timeInCurrentAvailabilityState: '- - : - - : - -',
                  // timeInCurrentCall: '- - : - - : - -',
                  timeInCurrentWrapup: '- - : - - : - -',
                  // listOfSkills: 'Skill',
                },
                {
                  agentName: 'Megan Carter',
                  agentExtNo: '0000',
                  currAvaiState: 'Busy on calls',
                  currPresState: 'Inbound Call',
                  noCallsOffered: '0',
                  // noCallsAnswered: '0',
                  // noCallsMissed: '0',
                  // timeInCurrentPresenceState: '- - : - - : - -',
                  // timeInCurrentAvailabilityState: '- - : - - : - -',
                  // timeInCurrentCall: '- - : - - : - -',
                  timeInCurrentWrapup: '- - : - - : - -',
                  // listOfSkills: 'Skill',
                },
              ]}
            />
          </>
        )}
      </div>
    </ResizeComponent>
  );
};
export default GridAgentList;
