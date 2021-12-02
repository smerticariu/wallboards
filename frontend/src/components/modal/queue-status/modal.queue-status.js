import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { handleQueueStatusDataAC, handleWallboardActiveModalAC, resetNewWidgetModalFormDataAC } from '../../../store/actions/modal.action';
import { addWallboardQueueStatusAC } from '../../../store/actions/wallboards.action';
const ModalQueueStatus = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { queueStatus } = useSelector((state) => state.modal);
  const { userInfo } = useSelector((state) => state.login);
  const { allCallsQueues } = useSelector((state) => state.callsQueues);
  useEffect(() => {
    if (queueStatus.isEditMode) return;
    if (allCallsQueues.length) {
      dispatch(
        handleQueueStatusDataAC({
          ...queueStatus,
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
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
    dispatch(resetNewWidgetModalFormDataAC());
  };

  useOnClickOutside(modalRef, () => closeModal());

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

  const handleSaveButton = () => {
    const onClickDeleteButton = () => {
      if (!checkIsAlphanumeric(queueStatus.title.value)) {
        dispatch(
          handleQueueStatusDataAC({
            ...queueStatus,
            title: {
              ...queueStatus.title,
              errorMessage: DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE,
            },
          })
        );
        return alert(DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE);
      }
      dispatch(addWallboardQueueStatusAC(queueStatus, userInfo));
      closeModal();
    };

    return (
      <button className="c-button c-button--white" onClick={onClickDeleteButton}>
        Save
      </button>
    );
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'title':
        return dispatch(
          handleQueueStatusDataAC({
            ...queueStatus,
            [name]: {
              ...queueStatus[name],
              value,
              errorMessage: '',
            },
          })
        );
      case 'callQueue':
        return dispatch(
          handleQueueStatusDataAC({
            ...queueStatus,
            [name]: {
              ...queueStatus[name],
              id: e.target.selectedOptions[0].value,
              value: e.target.selectedOptions[0].label,
              errorMessage: '',
            },
          })
        );
      default:
        return;
    }
  };
  const handleTitleInput = () => {
    return (
      <div className="c-modal--add-component__input-section">
        <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_STATUS.MODAL_TITLE}</div>
        <input
          className="c-input c-input--grey"
          placeholder={DEFAULTS.MODAL.QUEUE_STATUS.PLACEHOLDER.TITLE}
          name="title"
          onChange={onInputChange}
          value={queueStatus.title.value}
        />
        {queueStatus.title.errorMessage && <div className="c-input__error-message">{queueStatus.title.errorMessage}</div>}
      </div>
    );
  };
  const handleCallQueueInput = () => {
    return (
      <div className="c-modal--add-component__input-section">
        <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.QUEUE_STATUS.CALL_QUEUE}</div>
        <select name="callQueue" className="c-select" onChange={onInputChange} value={queueStatus.callQueue.id}>
          {allCallsQueues.map((option) => (
            <option key={option.id} value={option.id} name={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {queueStatus.callQueue.errorMessage && <div className="c-input__error-message">{queueStatus.callQueue.errorMessage}</div>}
      </div>
    );
  };
  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--call-status">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">{DEFAULTS.MODAL.CALL_STATUS.MODAL_TITLE}</div>
          </div>
          <div className="c-modal__body c-modal__body--call-status">
            {handleTitleInput()}
            {handleCallQueueInput()}
            <div className="c-modal__buttons">
              {handleSaveButton()}
              {handleCancelButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalQueueStatus;
