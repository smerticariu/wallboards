import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleWarningMessageAC } from 'src/store/actions/modal.action';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalWarning = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { warningMessage } = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(handleWarningMessageAC(''));
  };

  useOnClickOutside(modalRef, () => closeModal());

  const handleConfirmSaveButton = () => {
    return (
      <>
        <button className={`c-button c-button--m-left c-button--blue`} onClick={closeModal}>
          Ok
        </button>
      </>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--save-changes ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">Warning</div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--save-changes__phrase">{warningMessage}</div>
          </div>
          <div className="c-modal__footer">
            <div className="c-modal__footer-left-side" />

            <div className="c-modal__footer-right-side">{handleConfirmSaveButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalWarning;
