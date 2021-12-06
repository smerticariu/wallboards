import React from 'react';
import { useDispatch } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { EditIcon } from '../../assets/static/icons/edit';
import { SettingsIcon } from '../../assets/static/icons/settings';
import { DEFAULTS } from '../../common/defaults/defaults';
import {
  QUEUE_LIST_COLUMN_OPTIONS,
  QUEUE_LIST_INTERACTIVITY_OPTIONS_KEYS,
  QUEUE_LIST_SORT_BY_VALUES,
} from '../../common/defaults/modal.defaults';
import { listenLiveThunk } from '../../store/thunk/agents.thunk';
import Dropdown from '../dropdown/dropdown';
import { ProgressBar } from '../progress-bar/progress-bar';
import TimeInterval from '../time-interval/time-interval';

const QueueListTable = ({ isPreviewMode, isEditMode, tableData, widget, ...props }) => {
  const dispatch = useDispatch();
  let filtredTableColumns = [
    ...DEFAULTS.MODAL.QUEUE_LIST.COLUMNS.filter((column) => widget.columnsToViewOptions.selectedItems.includes(column.value)),
  ];
  if (widget.interactivityOptions.selectedItems.length) {
    filtredTableColumns.push({ value: QUEUE_LIST_COLUMN_OPTIONS.OPTIONS, text: 'Options', minWidth: 70 });
  }
  const totalWidth = filtredTableColumns.reduce((width, column) => width + column.minWidth, 0);
  const handleDeleteIcon = () => {
    const onDeleteClick = () => {
      if (isPreviewMode) return;
      dispatch(setWallboardComponentForDeleteAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD_COMPONENT));
    };
    return (
      <div onClick={onDeleteClick} className="widget__delete-icon">
        <CloseIcon className="i--close i--close--small" />
      </div>
    );
  };

  const handleEditIcon = () => {
    if (isPreviewMode) return;
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.QUEUE_LIST));
    };
    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <EditIcon className="i--edit i--edit--margin-right" />
      </div>
    );
  };

  const handleListenLive = (agentId) => {
    if (isPreviewMode) return;
    dispatch(listenLiveThunk(agentId));
  };

  const sortedTableData = [...tableData].sort((call1, call2) => {
    switch (widget.sortBy) {
      case QUEUE_LIST_SORT_BY_VALUES.POSITION_IN_QUEUE:
        return call1[QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE] - call2[QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE];
      case QUEUE_LIST_SORT_BY_VALUES.CALLER_NAME:
        return call1[QUEUE_LIST_COLUMN_OPTIONS.CALLER_NAME]
          .toUpperCase()
          .localeCompare(call2[QUEUE_LIST_COLUMN_OPTIONS.CALLER_NAME].toUpperCase());
      case QUEUE_LIST_SORT_BY_VALUES.PRIORITY:
        return call2[QUEUE_LIST_COLUMN_OPTIONS.PRIORITY] - call1[QUEUE_LIST_COLUMN_OPTIONS.PRIORITY];
      case QUEUE_LIST_SORT_BY_VALUES.TIME_WAITING_IN_QUEUE:
        return call2[QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE] - call1[QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE];
      case QUEUE_LIST_SORT_BY_VALUES.DIAL_ATTEMPTS:
        return call2[QUEUE_LIST_COLUMN_OPTIONS.DIAL_ATTEMPTS] - call1[QUEUE_LIST_COLUMN_OPTIONS.DIAL_ATTEMPTS];
      case QUEUE_LIST_SORT_BY_VALUES.STATUS:
        return call1[QUEUE_LIST_COLUMN_OPTIONS.STATUS].toUpperCase().localeCompare(call2[QUEUE_LIST_COLUMN_OPTIONS.STATUS].toUpperCase());
      case QUEUE_LIST_SORT_BY_VALUES.AGENT_CONNECTED_TO:
        if (!call1[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]) return 1;
        if (!call2[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]) return -1;
        return call1[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]
          .toUpperCase()
          .localeCompare(call2[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO].toUpperCase());
      case QUEUE_LIST_SORT_BY_VALUES.TIME_AT_HEAD_OF_QUEUE:
        return call2[QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE] - call1[QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE];
      case QUEUE_LIST_SORT_BY_VALUES.CALLBACK_REQUESTED:
        if (call1[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED]) return -1;
        return 1;
      case QUEUE_LIST_SORT_BY_VALUES.CALLBACK_ATTEMPTS:
        if (!call1[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS]) return 1;
        if (!call2[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS]) return -1;
        return call2[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS] - call1[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS];
      default:
        return 0;
    }
  });
  return (
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.title}: </div>
          {widget.callQueue.value} - {widget.isCallStatusConnected && widget.isCallStatusWaiting && 'All Calls'}
          {widget.isCallStatusConnected && !widget.isCallStatusWaiting && 'Connected'}
          {!widget.isCallStatusConnected && widget.isCallStatusWaiting && 'Waiting'}
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
      {tableData.length && widget.columnsToViewOptions.selectedItems.length ? (
        <div className="widget__body widget__body--table">
          <div className="agent-login">
            <div className="agent-login__header agent-login__header--queue-list">
              {filtredTableColumns.map((item) => (
                <div
                  key={item.value}
                  className="agent-login__header-item"
                  style={{
                    width: (item.minWidth * 100) / totalWidth + '%',
                    minWidth: item.minWidth + 'px',
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>
            <div className="agent-login__body">
              {sortedTableData.map((call) => (
                <div key={call.uuid} className="agent-login__row agent-login__row--queue-list">
                  {filtredTableColumns.map((column) => {
                    let style = {
                      width: (column.minWidth * 100) / totalWidth + '%',
                      minWidth: column.minWidth + 'px',
                    };
                    let content = call[column.value];
                    switch (column.value) {
                      case QUEUE_LIST_COLUMN_OPTIONS.PRIORITY:
                        const priorityNo = call[column.value];
                        style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.PRIORITY_COLORS[priorityNo];
                        if (isNaN(priorityNo)) style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.PRIORITY_COLORS.default;
                        if (priorityNo <= 3 || priorityNo > 9) style.color = DEFAULTS.MODAL.QUEUE_LIST.PRIORITY_COLORS.textColorWhite;
                        break;

                      case QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE:
                        const positionNo = call[column.value];
                        style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS[positionNo];
                        if (isNaN(positionNo)) style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.default;
                        if (positionNo === 1 || positionNo >= 8) style.color = DEFAULTS.MODAL.QUEUE_LIST.PRIORITY_COLORS.textColorWhite;
                        break;

                      case QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE: {
                        const timeWaiting = call[column.value];
                        const isProgressBarShow = timeWaiting < widget.timeInQueueSLATime;
                        if (!isProgressBarShow) {
                          style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.red;
                          style.color = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.textColorWhite;
                        }
                        content = (
                          <div>
                            {isProgressBarShow && <ProgressBar width={(timeWaiting * 100) / widget.timeInQueueSLATime} />}
                            <TimeInterval seconds={timeWaiting} isStop />
                          </div>
                        );
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE: {
                        const timeAtHeadOfQueue = call[column.value];
                        const isProgressBarShow = timeAtHeadOfQueue < widget.timeAtHeadOfQueueSLATime;
                        if (!isProgressBarShow) {
                          style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.red;
                          style.color = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.textColorWhite;
                        }
                        content = (
                          <div>
                            {isProgressBarShow && <ProgressBar width={(timeAtHeadOfQueue * 100) / widget.timeAtHeadOfQueueSLATime} />}
                            <TimeInterval seconds={timeAtHeadOfQueue} isStop />
                          </div>
                        );
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED: {
                        const isCallbackRequests = call[column.value];
                        if (isCallbackRequests) {
                          style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.blue;
                          style.color = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.textColorWhite;
                          style.opacity = 0.68;
                          content = 'Yes';
                        } else content = '';
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS: {
                        const callbackAttempts = call[column.value];
                        if (!isNaN(callbackAttempts)) {
                          style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.green;
                          style.color = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS.textColorWhite;
                          style.opacity = 0.68;
                          content = callbackAttempts;
                        } else {
                          content = '';
                        }
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.OPTIONS: {
                        content = (
                          <Dropdown
                            containerClassName={'c-dropdown__container--left'}
                            closeOnClick={true}
                            trigger={<SettingsIcon className="i--settings i--settings--table" />}
                          >
                            {widget.interactivityOptions.selectedItems.includes(QUEUE_LIST_INTERACTIVITY_OPTIONS_KEYS.LISTEN_LIVE) && (
                              <div
                                onClick={() => {
                                  handleListenLive(call.agentId);
                                }}
                                className="c-dropdown__item"
                              >
                                Listen Live
                              </div>
                            )}
                          </Dropdown>
                        );
                        break;
                      }
                      default:
                        break;
                    }

                    return (
                      <div key={column.value} className="agent-login__row-item agent-login__row-item--queue-list" style={style}>
                        {content}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-message empty-message--agents">No Calls</div>
      )}
    </div>
  );
};
export default QueueListTable;
