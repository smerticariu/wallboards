import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import { handleSyncWallboardSizeAC } from 'src/store/actions/wallboards.action';
import { saveWallboardThunk } from 'src/store/thunk/wallboards.thunk';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalConfirmSaveWallboard = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };

  useEffect(() => {
    dispatch(handleSyncWallboardSizeAC(true));
  }, []);
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
      dispatch(saveWallboardThunk());
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
              <span className="c-modal__title"> Wallboard</span>
            </div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--save-changes__phrase">
              Changes made so far will be lost and this version will be the final version{' '}
            </div>
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
export default ModalConfirmSaveWallboard;
