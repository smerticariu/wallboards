import React from 'react';
import { useDispatch } from 'react-redux';
import { CloseIcon } from 'src/assets/static/icons/close';
import {
  handleWallboardActiveModalAC,
  setWallboardComponentForDeleteAC,
  setWidgetComponentForEditAC,
} from 'src/store/actions/modal.action';
import { SettingsIcon } from '../../assets/static/icons/settings';
import { DEFAULTS } from '../../common/defaults/defaults';
import { QUEUE_LIST_COLUMN_OPTIONS } from '../../common/defaults/modal.defaults';

const QueueListTable = ({ isEditMode, tableData, widget, ...props }) => {
  const dispatch = useDispatch();
  const filtredTableColumns = [
    ...DEFAULTS.MODAL.QUEUE_LIST.COLUMNS.filter((column) => widget.columnsToViewOptions.selectedItems.includes(column.value)),
    { value: QUEUE_LIST_COLUMN_OPTIONS.OPTIONS, text: 'Options', minWidth: 70 },
  ];
  const totalWidth = filtredTableColumns.reduce((width, column) => width + column.minWidth, 0);
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

  const handleEditIcon = () => {
    const onEditClick = () => {
      dispatch(setWidgetComponentForEditAC(widget));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.QUEUE_LIST));
    };
    return (
      <div onClick={onEditClick} className="widget__edit-icon">
        <SettingsIcon className="i--settings i--settings--call-status" />
      </div>
    );
  };
  return (
    <div className="widget">
      <div className="widget__header">
        <div className="widget__title">
          <div className="widget__title--bold">{widget.title}: </div>
          {widget.callQueue.value}
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
      {/* {tableData.length ? ( */}
      <div className="widget__body widget__body--table">
        <div className="agent-login">
          <div className="agent-login__header agent-login__header--queue-list">
            {filtredTableColumns.map((item) => (
              <div
                key={item.text}
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
            {tableData.map((call) => (
              <div key={call[QUEUE_LIST_COLUMN_OPTIONS.ID]} className="agent-login__row agent-login__row--queue-list">
                {filtredTableColumns.map((column) => {
                  return (
                    <div
                      key={column.value}
                      className="agent-login__row-item agent-login__row-item--queue-list"
                      style={{
                        width: (column.minWidth * 100) / totalWidth + '%',
                        minWidth: column.minWidth + 'px',
                      }}
                    >
                      {call[column.value]}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ) : (
        <div className="empty-message empty-message--agents">No agents</div>
      )} */}
    </div>
  );
};
export default QueueListTable;
