import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import {
  handleCallStatusDataAC,
  handleWallboardActiveModalAC,
  resetModalAddComponentFormDataAC,
} from '../../../store/actions/modal.action';
import { addWallboardCallStatusAC } from '../../../store/actions/wallboards.action';

const ModalCallStatus = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { callStatus } = useSelector((state) => state.modal);
  const { userInfo } = useSelector((state) => state.login);

  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
    dispatch(resetModalAddComponentFormDataAC());
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
      if (!checkIsAlphanumeric(callStatus.title.value)) {
        dispatch(
          handleCallStatusDataAC({
            ...callStatus,
            title: {
              ...callStatus.title,
              errorMessage: DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE,
            },
          })
        );
        return alert(DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE);
      }
      dispatch(addWallboardCallStatusAC(callStatus, userInfo));
      closeModal();
    };

    return (
      <button className="c-button c-button--white" onClick={onClickDeleteButton}>
        Save
      </button>
    );
  };
  const handleTitleInput = () => {
    const onInputChange = (e) => {
      const { name, value } = e.target;
      dispatch(
        handleCallStatusDataAC({
          ...callStatus,
          [name]: {
            ...callStatus[name],
            value,
            errorMessage: '',
          },
        })
      );
    };
    return (
      <div className="c-modal--add-component__input-section">
        <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.CALL_STATUS.TITLE}</div>
        <input
          className="c-input c-input--grey"
          placeholder={DEFAULTS.MODAL.CALL_STATUS.PLACEHOLDER}
          name="title"
          onChange={onInputChange}
          value={callStatus.title.value}
        />
        {callStatus.title.errorMessage && <div className="c-input__error-message">{callStatus.title.errorMessage}</div>}
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
export default ModalCallStatus;
