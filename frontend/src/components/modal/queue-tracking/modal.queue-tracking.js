import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

import { addWallboardQueueTrackingAC } from '../../../store/actions/wallboards.action';
import {
  handleQueueTrackingDataAC,
  handleWallboardActiveModalAC,
  resetModalAddComponentFormDataAC,
} from '../../../store/actions/modal.action';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { fetchUserGroupsThunk } from '../../../store/thunk/agents.thunk';
import { CALL_STATISTIC_PERIOD } from '../../../common/defaults/modal.defaults';
import CheckBox from '../../checkbox/checkbox';
import TimePicker from '../../time-picker/time-picker';
import GridQueueTracking from '../../grid/widgets/queue-tracking';

const ModalqueueTracking = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { queueTracking } = useSelector((state) => state.modal);
  const { allCallsQueues } = useSelector((state) => state.callsQueues);
  const { userInfo } = useSelector((state) => state.login);
  useEffect(() => {
    if (queueTracking.isEditMode) return;
    if (allCallsQueues.length) {
      dispatch(
        handleQueueTrackingDataAC({
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
    dispatch(resetModalAddComponentFormDataAC());
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

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      if (!checkIsAlphanumeric(queueTracking.title.value)) {
        dispatch(
          handleQueueTrackingDataAC({
            title: {
              ...queueTracking.title,
              errorMessage: DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE,
            },
          })
        );

        return alert(DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE);
      }
      dispatch(addWallboardQueueTrackingAC(queueTracking, userInfo));
      closeModal();
    };

    return (
      <button className={`c-button c-button--m-left c-button--blue`} onClick={onClickAddButton}>
        {queueTracking.isEditMode ? 'Save' : 'Add'}
      </button>
    );
  };

  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event, inputType) => {
      const { name, value, checked } = event.target;
      switch (inputType) {
        case 'input':
          return dispatch(
            handleQueueTrackingDataAC({
              [name]: {
                ...queueTracking[name],
                value,
                errorMessage: '',
              },
            })
          );
        case 'select':
          return dispatch(
            handleQueueTrackingDataAC({
              [name]: {
                ...queueTracking[name],
                id: event.target.selectedOptions[0].value,
                value: event.target.selectedOptions[0].label,
                errorMessage: '',
              },
            })
          );
        case 'multimple-checkbox':
          return dispatch(
            handleQueueTrackingDataAC({
              columnsToViewOptions: {
                selectedItems: checked
                  ? [...queueTracking.columnsToViewOptions.selectedItems, name]
                  : queueTracking.columnsToViewOptions.selectedItems.filter((option) => option !== name),
              },
            })
          );
        case 'checkbox':
          return dispatch(
            handleQueueTrackingDataAC({
              [name]: {
                ...queueTracking[name],
                isChecked: checked,
              },
            })
          );

        default:
          break;
      }
    };

    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.TITLE}</div>
          <input
            className="c-input c-input--grey"
            placeholder={DEFAULTS.MODAL.QUEUE_TRACKING.PLACEHOLDER}
            name="title"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={queueTracking.title.value}
          />
          {queueTracking.title.errorMessage && <div className="c-input__error-message">{queueTracking.title.errorMessage}</div>}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.QUEUE_TO_MONITOR}</div>
          <select
            name="callQueue"
            className="c-select"
            onChange={(e) => handleInputAndSelect(e, 'select')}
            value={queueTracking.callQueue.id}
          >
            {allCallsQueues.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.TIME_ZONE}</div>
          <select
            name="timeZone"
            className="c-select"
            onChange={(e) => handleInputAndSelect(e, 'select')}
            value={queueTracking.timeZone.id}
          >
            {DEFAULTS.MODAL.CALL_TRACKING.TIME_ZONE.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.PERIOD}</div>
          <select name="period" className="c-select" onChange={(e) => handleInputAndSelect(e, 'select')} value={queueTracking.period.id}>
            {DEFAULTS.MODAL.CALL_TRACKING.PERIOD.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        {queueTracking.period.id === CALL_STATISTIC_PERIOD.WEEK && (
          <div className="c-modal--add-component__input-section">
            <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.START_WEEK}</div>
            <select
              name="startOfWeek"
              className="c-select"
              onChange={(e) => handleInputAndSelect(e, 'select')}
              value={queueTracking.startOfWeek.id}
            >
              {DEFAULTS.MODAL.CALL_TRACKING.START_WEEK.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.SHOW_COLUMNS}</div>
          {DEFAULTS.MODAL.QUEUE_TRACKING_COLUMNS.map((option) => (
            <CheckBox
              key={option.value}
              label={option.text}
              name={option.value}
              className="c-checkbox--queue-tracking"
              checked={queueTracking.columnsToViewOptions.selectedItems.includes(option.value)}
              onChange={(event) => handleInputAndSelect(event, 'multimple-checkbox')}
            />
          ))}
        </div>
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.ABANDONATED_CALL_SLA}</div>
          <CheckBox
            className="c-checkbox--margin-bottom"
            checked={queueTracking.abandonedCallSLA.isChecked}
            name="abandonedCallSLA"
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
            label={DEFAULTS.MODAL.QUEUE_TRACKING.LABEL.ABANDONATED_CALL_SLA}
          />
          <input
            className="c-input c-input--small-size c-input--grey"
            name="abandonedCallSLA"
            type="number"
            min="1"
            max="100"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={queueTracking.abandonedCallSLA.value}
          />
          <span className="input-percent">%</span>
          {queueTracking.abandonedCallSLA.errorMessage && (
            <div className="c-input__error-message">{queueTracking.abandonedCallSLA.errorMessage}</div>
          )}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.AVERAGE_WAIT_SLA}</div>
          <CheckBox
            className="c-checkbox--margin-bottom"
            checked={queueTracking.averageWaitSLA.isChecked}
            name="averageWaitSLA"
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
            label={DEFAULTS.MODAL.QUEUE_TRACKING.LABEL.AVERAGE_WAIT_SLA}
          />
          <TimePicker
            isOnTop
            name="averageWaitSLA"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={queueTracking.averageWaitSLA.value}
          />
          {queueTracking.averageWaitSLA.errorMessage && (
            <div className="c-input__error-message">{queueTracking.averageWaitSLA.errorMessage}</div>
          )}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.SOLID_CALLS_OVERRIDE}</div>
          <CheckBox
            className="c-checkbox--margin-bottom"
            checked={queueTracking.solidCallsOverride.isChecked}
            name="solidCallsOverride"
            onChange={(event) => handleInputAndSelect(event, 'checkbox')}
            label={DEFAULTS.MODAL.QUEUE_TRACKING.LABEL.SOLID_CALLS_OVERRIDE}
          />
          <TimePicker
            isOnTop
            name="solidCallsOverride"
            onChange={(e) => handleInputAndSelect(e, 'input')}
            value={queueTracking.solidCallsOverride.value}
          />
          {queueTracking.solidCallsOverride.errorMessage && (
            <div className="c-input__error-message">{queueTracking.solidCallsOverride.errorMessage}</div>
          )}
        </div>
      </div>
    );
  };

  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label c-modal--add-component__input-label--grey">
          {DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.PREVIEW}
        </div>
        <div>
          <div className="c-modal__preview-section">
            <GridQueueTracking isPreview={true} widget={{ ...queueTracking, title: queueTracking.title.value }} />
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
            <div className="c-modal__title">{DEFAULTS.MODAL.QUEUE_TRACKING.MODAL_TITLE}</div>
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
export default ModalqueueTracking;
