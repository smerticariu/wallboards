import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { handleWallboardActiveModalAC } from '../../../store/actions/modal.action';
import { deleteWallboardThunk } from '../../../store/thunk/wallboards.thunk';

const ModalDeleteWallboard = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { wallboardIdForDelete } = useSelector((state) => state.wallboards.present);
  const isWallboardGroup = wallboardIdForDelete.includes(DEFAULTS.WALLBOARDS.WALLBOARD_GROUP_SEPARATOR);
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

  const handleDeleteButton = () => {
    const onClickDeleteButton = () => {
      dispatch(deleteWallboardThunk(wallboardIdForDelete, isWallboardGroup));
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
            <div className="c-modal__title c-modal__title--bold">
              {isWallboardGroup ? DEFAULTS.MODAL.DELETE_WALLBOARD_GROUP_MODAL.TITLE : DEFAULTS.MODAL.DELETE_WALLBOARD_MODAL.TITLE}
            </div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--save-changes__phrase">
              {isWallboardGroup ? DEFAULTS.MODAL.DELETE_WALLBOARD_GROUP_MODAL.QUESTION : DEFAULTS.MODAL.DELETE_WALLBOARD_MODAL.QUESTION}
            </div>
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
export default ModalDeleteWallboard;
