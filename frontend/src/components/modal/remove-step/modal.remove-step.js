import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { handleWallboardActiveModalAC } from '../../../store/actions/modal.action';

const ModalDeleteStep = ({ onOkClick, id, onClose, ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };

  useOnClickOutside(modalRef, () => onClose());

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      onClose();
    };
    return (
      <>
        <button className="c-button" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleDeleteButton = () => {
    const onClickDeleteButton = () => {
      dispatch(onOkClick(id));
      closeModal();
    };

    return (
      <>
        <button className={`c-button c-button--m-left c-button--blue`} onClick={onClickDeleteButton}>
          Delete
        </button>
      </>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--save-changes ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title c-modal__title--bold">{DEFAULTS.MODAL.REMOVE_STEP_MODAL.TITLE}</div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--save-changes__phrase">{DEFAULTS.MODAL.REMOVE_STEP_MODAL.QUESTION}</div>
          </div>
          <div className="c-modal__footer">
            <div className="c-modal__footer-left-side" />
            <div className="c-modal__footer-right-side">
              {handleCancelButton()}
              {handleDeleteButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalDeleteStep;
