import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SettingsIcon } from '../../assets/static/icons/settings';
import { DEFAULTS } from '../../common/defaults/defaults';
import { QUEUE_LIST_COLUMN_OPTIONS, QUEUE_LIST_INTERACTIVITY_OPTIONS_KEYS } from '../../common/defaults/modal.defaults';
import { sortQueueList } from '../../common/sort/sort.queue-list';
import { findCountruByPhoneNo } from '../../common/utils/findCountruByPhoneNo';
import { listenLiveThunk } from '../../store/thunk/agents.thunk';
import Dropdown from '../dropdown/dropdown';
import WidgetContainer from '../grid/widgets/widget-container';
import { ProgressBar } from '../progress-bar/progress-bar';
import TimeInterval from '../time-interval/time-interval';

const QueueListTable = ({ isPreviewMode, isEditMode, tableData, widget, ...props }) => {
  const dispatch = useDispatch();
  const [sortByOption, handleSortByOption] = useState({ sortBy: widget.sortBy, descending: false });
  const sortedTableData = useMemo(() => sortQueueList(sortByOption, tableData), [sortByOption, tableData]);

  useEffect(() => {
    handleSortByOption({ sortBy: widget.sortBy, descending: false });
  }, [widget.sortBy]);
  let filtredTableColumns = [
    ...DEFAULTS.MODAL.QUEUE_LIST.COLUMNS.filter((column) => widget.columnsToViewOptions.selectedItems.includes(column.value)),
  ];
  if (widget.interactivityOptions.selectedItems.length) {
    filtredTableColumns.push({ value: QUEUE_LIST_COLUMN_OPTIONS.OPTIONS, text: 'Options', minWidth: 70, sortBy: false });
  }
  const totalWidth = filtredTableColumns.reduce((width, column) => width + column.minWidth, 0);
  const handleListenLive = (agentId) => {
    if (isPreviewMode) return;
    dispatch(listenLiveThunk(agentId));
  };

  return (
    <WidgetContainer widget={widget} isEditMode={isEditMode}>
      {tableData.length && widget.columnsToViewOptions.selectedItems.length ? (
        <div className="widget__body widget__body--table">
          <div className="agent-login">
            <div className="agent-login__header agent-login__header--queue-list">
              {filtredTableColumns.map((item) => (
                <div
                  key={item.value}
                  className="agent-login__header-item"
                  onClick={() => {
                    handleSortByOption({
                      sortBy: item.value,
                      descending: sortByOption.sortBy === item.value ? !sortByOption.descending : false,
                    });
                  }}
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
                    const isStatusConnected = call[QUEUE_LIST_COLUMN_OPTIONS.STATUS] === 'connected';
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
                        if (isStatusConnected) {
                          content = 'Connected';
                          style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.PRIORITY_COLORS.default;
                        } else if (positionNo === 1 || positionNo >= 8)
                          style.color = DEFAULTS.MODAL.QUEUE_LIST.PRIORITY_COLORS.textColorWhite;
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
                            {isProgressBarShow && !isStatusConnected && (
                              <ProgressBar width={(timeWaiting * 100) / widget.timeInQueueSLATime} />
                            )}
                            <TimeInterval seconds={timeWaiting} isStop={isStatusConnected} isInfinit={isPreviewMode} />
                          </div>
                        );
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.CALLER_NUMBER: {
                        const callerNumber = call[column.value];
                        content = (
                          <div>
                            <div>{callerNumber}</div>
                            <div>{findCountruByPhoneNo(callerNumber)}</div>
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
                            <TimeInterval seconds={timeAtHeadOfQueue} isStop={isStatusConnected} isInfinit={isPreviewMode} />
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
                          style.backgroundColor = DEFAULTS.MODAL.QUEUE_LIST.QUEUE_POSITION_COLORS[callbackAttempts];
                          if (callbackAttempts <= 1 || callbackAttempts >= 8)
                            style.color = DEFAULTS.MODAL.QUEUE_LIST.PRIORITY_COLORS.textColorWhite;

                          style.opacity = 0.68;
                          content = callbackAttempts;
                        } else {
                          content = '';
                        }
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.SKILLS_REQUESTED: {
                        content = content ? 'true' : 'false';
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.FLAGS: {
                        content = content ? 'true' : 'false';
                        break;
                      }
                      case QUEUE_LIST_COLUMN_OPTIONS.SKILLS_SHORTAGE: {
                        content = content ? 'true' : 'false';
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
    </WidgetContainer>
  );
};
export default QueueListTable;
