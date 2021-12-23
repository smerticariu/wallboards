import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import { saveWallboardGroupThunk } from 'src/store/thunk/wallboards.thunk';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalConfirmSaveWallboardGroup = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };

  useOnClickOutside(modalRef, () => closeModal());

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    return (
      <>
        <button className="c-button" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleConfirmSaveButton = () => {
    const onConfirmSaveButton = (e) => {
      dispatch(saveWallboardGroupThunk());
      dispatch(handleWallboardActiveModalAC(null));
    };

    return (
      <>
        <button className={`c-button c-button--m-left c-button--blue`} onClick={onConfirmSaveButton}>
          Save
        </button>
      </>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--save-changes ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">
              Save
              <span className="c-modal__title"> Wallboard Group</span>
            </div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--save-changes__phrase">{DEFAULTS.MODAL.CONFIRM_SAVE_WALLBOARD.INFO} </div>
          </div>
          <div className="c-modal__footer">
            <div className="c-modal__footer-left-side">{handleCancelButton()}</div>
            <div className="c-modal__footer-right-side">{handleConfirmSaveButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirmSaveWallboardGroup;
