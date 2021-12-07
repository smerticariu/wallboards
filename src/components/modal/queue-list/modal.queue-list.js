import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

import { addWallboardQueueListAC } from '../../../store/actions/wallboards.action';
import { handleQueueListDataAC, handleWallboardActiveModalAC, resetNewWidgetModalFormDataAC } from '../../../store/actions/modal.action';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { fetchUserGroupsThunk } from '../../../store/thunk/agents.thunk';
import CheckBox from '../../checkbox/checkbox';
import QueueListTable from '../../tables/table.queue-list';

const ModalQueueList = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { queueList } = useSelector((state) => state.modal);
  const { allCallsQueues } = useSelector((state) => state.callsQueues);
  const { userInfo } = useSelector((state) => state.login);
  useEffect(() => {
    if (queueList.isEditMode) return;
    if (allCallsQueues.length) {
      dispatch(
        handleQueueListDataAC({
          callQueue: {
            id: allCallsQueues[0].id,
            value: allCallsQueues[0].name,
            errorMessage: '',
          },
        })
      );
    }
    // eslint-disable-next-line
  }, [allCallsQueues]);
  useEffect(() => {
    dispatch(fetchUserGroupsThunk());
    // eslint-disable-next-line
  }, []);
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
    dispatch(resetNewWidgetModalFormDataAC());
  };

  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    return (
      <button className="c-button" onClick={onClickCancelButton}>
        Cancel
      </button>
    );
  };

  const checkIfExistErrors = () => {
    let isError = false;
    let queueListDataCopy = {
      ...queueList,
    };
    if (!checkIsAlphanumeric(queueListDataCopy.title.value)) {
      queueListDataCopy.title.errorMessage = DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE;
      isError = true;
    }
    if (+queueListDataCopy.timeInQueueSLATime.value < 1) {
      queueListDataCopy.timeInQueueSLATime.errorMessage = DEFAULTS.MODAL.MESSAGES.MIN_SLA_TIME;
      isError = true;
    }
    if (+queueListDataCopy.timeAtHeadOfQueueSLATime.value < 1) {
      queueListDataCopy.timeAtHeadOfQueueSLATime.errorMessage = DEFAULTS.MODAL.MESSAGES.MIN_SLA_TIME;
      isError = true;
    }
    if (isError) {
      dispatch(handleQueueListDataAC(queueListDataCopy));
    }
    return isError;
  };

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      if (checkIfExistErrors()) return;
      dispatch(addWallboardQueueListAC(queueList, userInfo));
      closeModal();
    };

    return (
      <button className={`c-button c-button--m-left c-button--blue`} onClick={onClickAddButton}>
        {queueList.isEditMode ? 'Save' : 'Add'}
      </button>
    );
  };

  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event, inputType, checkboxGroup) => {
      const { name, value, checked } = event.target;
      switch (inputType) {
        case 'input':
          return dispatch(
            handleQueueListDataAC({
              [name]: {
                ...queueList[name],
                value,
                errorMessage: '',
              },
            })
          );
        case 'select':
          return dispatch(
            handleQueueListDataAC({
              [name]: {
                ...queueList[name],
                id: event.target.selectedOptions[0].value,
                value: event.target.selectedOptions[0].label,
                errorMessage: '',
              },
            })
          );
        case 'multimple-checkbox':
          return dispatch(
            handleQueueListDataAC({
              [checkboxGroup]: {
                selectedItems: checked
                  ? [...queueList[checkboxGroup].selectedItems, name]
                  : queueList[checkboxGroup].selectedItems.filter((option) => option !== name),
              },
            })
          );
        case 'checkbox':
          return dispatch(
            handleQueueListDataAC({
              [name]: checked,
            })
          );

        default:
          break;
      }
    };

    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.COMPONENT_NAME}</div>
          <input
            className="c-input c-input--grey"
            placeholder={DEFAULTS.MODAL.QUEUE_LIST.PLACEHOLDER.COMPONENT_NAME}
            name="title"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={queueList.title.value}
          />
          {queueList.title.errorMessage && <div className="c-input__error-message">{queueList.title.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.CALL_QUEUE}</div>
          <select name="callQueue" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={queueList.callQueue.id}>
            {allCallsQueues.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.DISPLAY_CALL_STATUS}</div>
          <CheckBox
            label={DEFAULTS.MODAL.QUEUE_LIST.LABEL.CONNECTED}
            name={'isCallStatusConnected'}
            className="c-checkbox--margin-bottom"
            checked={queueList.isCallStatusConnected}
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
          />
          <CheckBox
            label={DEFAULTS.MODAL.QUEUE_LIST.LABEL.WAITING}
            name={'isCallStatusWaiting'}
            className="c-checkbox--margin-bottom"
            checked={queueList.isCallStatusWaiting}
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
          />
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.TIME_IN_QUEUE}</div>
          <div className="input-seconds">
            <input
              className="c-input c-input--grey"
              name="timeInQueueSLATime"
              type="number"
              min="1"
              onChange={(e) => handleInputAndSelect(e, 'input')}
              value={queueList.timeInQueueSLATime.value}
            />
            Seconds
          </div>
          {queueList.timeInQueueSLATime.errorMessage && (
            <div className="c-input__error-message">{queueList.timeInQueueSLATime.errorMessage}</div>
          )}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.TIME_AT_HEAD}</div>
          <div className="input-seconds">
            <input
              className="c-input c-input--grey"
              name="timeAtHeadOfQueueSLATime"
              type="number"
              min="1"
              onChange={(e) => handleInputAndSelect(e, 'input')}
              value={queueList.timeAtHeadOfQueueSLATime.value}
            />
            Seconds
          </div>
          {queueList.timeAtHeadOfQueueSLATime.errorMessage && (
            <div className="c-input__error-message">{queueList.timeAtHeadOfQueueSLATime.errorMessage}</div>
          )}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.SHOW_COLUMNS}</div>
          {DEFAULTS.MODAL.QUEUE_LIST.COLUMNS.map((option) => (
            <CheckBox
              key={option.value}
              label={option.text}
              name={option.value}
              className="c-checkbox--margin-bottom"
              checked={queueList.columnsToViewOptions.selectedItems.includes(option.value)}
              onChange={(event) => handleInputAndSelect(event, 'multimple-checkbox', 'columnsToViewOptions')}
            />
          ))}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.SORT_BY}</div>
          <select
            name="sortBy"
            className="c-select"
            onChange={(event) => handleInputAndSelect(event, 'input')}
            value={queueList.sortBy.value}
          >
            {DEFAULTS.MODAL.QUEUE_LIST.SORT_BY.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.DISPLAY_OPTIONS}</div>
          <CheckBox
            label={DEFAULTS.MODAL.QUEUE_LIST.LABEL.SHOW_SKILLS_ONLY_ON_HOVER}
            name="isShowOnlyOnHover"
            className="c-checkbox--margin-bottom"
            checked={queueList.isShowOnlyOnHover}
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
          />
          <CheckBox
            label={DEFAULTS.MODAL.QUEUE_LIST.LABEL.SHOW_SKILLS_SHORTAGE_ONLY_ON_HOVER}
            name="isShowShortageOnlyOnHover"
            className="c-checkbox--margin-bottom"
            checked={queueList.isShowShortageOnlyOnHover}
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
          />
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_LIST.NAMES.INTERACTIVITY_OPTIONS}</div>
          {DEFAULTS.MODAL.QUEUE_LIST.INTERACTIVIRY_OPTIONS.map((option) => (
            <CheckBox
              key={option.value}
              label={option.text}
              name={option.value}
              className="c-checkbox--queue-tracking"
              checked={queueList.interactivityOptions.selectedItems.includes(option.value)}
              onChange={(event) => handleInputAndSelect(event, 'multimple-checkbox', 'interactivityOptions')}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label c-modal--add-component__input-label--grey">
          {DEFAULTS.MODAL.QUEUE_LIST.NAMES.PREVIEW}
        </div>
        <div>
          <div className="c-modal__preview-section">
            <QueueListTable
              isPreviewMode={true}
              tableData={DEFAULTS.MODAL.QUEUE_LIST.MOCK_DATA}
              widget={{
                title: queueList.title.value,
                sortBy: queueList.sortBy.value,
                columnsToViewOptions: queueList.columnsToViewOptions,
                interactivityOptions: queueList.interactivityOptions,
                callQueue: queueList.callQueue,
                timeAtHeadOfQueueSLATime: queueList.timeAtHeadOfQueueSLATime.value,
                timeInQueueSLATime: queueList.timeInQueueSLATime.value,
                isCallStatusWaiting: queueList.isCallStatusWaiting,
                isCallStatusConnected: queueList.isCallStatusConnected,
              }}
            />
          </div>
        </div>
        <div className="c-modal__buttons">
          {handleCancelButton()}
          {handleAddButton()}
        </div>
      </div>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--add-component ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">{DEFAULTS.MODAL.QUEUE_LIST.MODAL_TITLE}</div>
          </div>
          <div className="c-modal__body--add-component">
            {handleModalLeftSide()}
            {handleModalRightSide()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalQueueList;
