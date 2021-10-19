import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import { deleteWallboardThunk } from 'src/store/thunk/wallboards.thunk';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalDeleteWallboard = ({ ...props }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { wallboardIdForDelete } = useSelector((state) => state.wallboards.present);
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
      dispatch(deleteWallboardThunk(wallboardIdForDelete));
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
            <div className="c-modal__title c-modal__title--bold">Delete Wallboard</div>
          </div>
          <div className="c-modal__body c-modal__body--save-changes">
            <div className="c-modal__body--save-changes__phrase">Are you sure you want to delete this wallboard?</div>
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
