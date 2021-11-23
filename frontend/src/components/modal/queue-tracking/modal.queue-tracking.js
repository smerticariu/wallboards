import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import CheckBox from '../../checkbox/checkbox';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { handleQueueTrackingDataAC, handleWallboardActiveModalAC } from '../../../store/actions/modal.action';
import { addWallboardQueueTrackingAC } from '../../../store/actions/wallboards.action';

const ModalQueueTracking = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { queueTracking } = useSelector((state) => state.modal);
  const { userInfo } = useSelector((state) => state.login);
  const { allCallsQueues } = useSelector((state) => state.callsQueues);
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };
console.log(queueTracking)
  useOnClickOutside(modalRef, () => closeModal());
  useEffect(() => {
    if (queueTracking.isEditMode) return;
    if (allCallsQueues.length) {
      dispatch(
        handleQueueTrackingDataAC({
          ...queueTracking,
          callQueue: {
            id: allCallsQueues[0].id,
            name: allCallsQueues[0].name,
            errorMessage: '',
          },
        })
      );
    }
    // eslint-disable-next-line
  }, [allCallsQueues]);
  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    return (
      <button className="c-button c-button--grey c-button--m-left" onClick={onClickCancelButton}>
        Cancel
      </button>
    );
  };



  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event) => {
      const { name, value } = event.target;
      switch (name) {
        case 'callQueue':
          const callQueue = allCallsQueues.find((queue) => queue.id === value);
          return dispatch(
            handleQueueTrackingDataAC({
              ...queueTracking,
              callQueue: {
                ...callQueue,
                errorMessage: '',
              },
            })
          );
        default:
          dispatch(
            handleQueueTrackingDataAC({
              ...queueTracking,
              [name]: {
                value,
                errorMessage: '',
              },
            })
          );
      }
    };


    const handleCheckBoxList = (event, formDataProp) => {
      const { name, checked } = event.target;
      switch (name) {
        

        default: {
          dispatch(
            handleQueueTrackingDataAC({
              ...queueTracking,
              [formDataProp]: {
                ...queueTracking[formDataProp],
                selectedItems: checked
                  ? [...queueTracking[formDataProp].selectedItems, name]
                  : queueTracking[formDataProp].selectedItems.filter((value) => value !== name),
              },
            })
          );
        }
      }
    };



    const checkIsCheckboxChecked = (optionArr, optionName) => {
      return optionArr.includes(optionName);
    };

    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.TITLE}</div>
          <input
            className="c-input c-input--grey"
            placeholder={DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.TITLE}
            name="title"
            onChange={e => {handleInputAndSelect(e)}}
            value={queueTracking.title.value}
          />
          {queueTracking.title.errorMessage && <div className="c-input__error-message">{queueTracking.title.errorMessage}</div>}
        </div>
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_TRACKING.NAMES.QUEUE_TO_MONITOR}:</div>
          <select name="callQueue" className="c-select" onChange={e => handleInputAndSelect(e)} value={queueTracking.callQueue.id}>
            {allCallsQueues.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="c-modal--add-component__av-state-container"> */}
          {DEFAULTS.MODAL.QUEUE_TRACKING_COLUMNS.map((option) => (
            <CheckBox
              key={option.value}
              label={option.text}
              name={option.value}
              className="c-checkbox--queue-tracking"
              checked={checkIsCheckboxChecked(queueTracking.columnsToViewOptions.selectedItems, option.value)}
              onChange={(event) => handleCheckBoxList(event, 'columnsToViewOptions')}
            />
          ))}
        {/* </div> */}
      </div>
    );
  };



  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--add-component ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">{queueTracking.isEditMode ? 'Edit' : 'Add'} Component</div>
          </div>

          <div className="c-modal__body--add-component">
            {handleModalLeftSide()}
            {/* {handleModalRightSide()} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalQueueTracking;
