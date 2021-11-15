import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { checkIsAlphanumeric } from 'src/common/utils/alphanumeric-validation';
import { handleWallboardActiveModalAC, handleWarningMessageAC } from 'src/store/actions/modal.action';

import { saveWallboardThunk } from 'src/store/thunk/wallboards.thunk';
import { DEFAULTS } from '../../../common/defaults/defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalSaveWallboard = ({ ...props }) => {
  const modalRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
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

  const handleDiscardButton = () => {
    const onClickDiscardButton = (e) => {
      closeModal();
      history.push('/');
    };

    return (
      <>
        <button className="c-button" onClick={onClickDiscardButton}>
          Discard
        </button>
      </>
    );
  };

  const handleSaveButton = () => {
    const onClickSaveButton = (e) => {
      dispatch(handleWallboardActiveModalAC(null));
      if (!checkIsAlphanumeric(activeWallboard.name)) {
        return dispatch(handleWarningMessageAC('Wallboard name must be alphanumeric'));
      }
      dispatch(saveWallboardThunk());
      history.push('/');
    };

    return (
      <>
        <button className={`c-button c-button--m-left c-button--blue`} onClick={onClickSaveButton}>
          Save & Close
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
              {DEFAULTS.MODAL.SAVE_WALLBOARD.UNSAVED_CHANGES}
              <span className="c-modal__body--save-changes__phrase"> Wallboard. </span>

              {DEFAULTS.MODAL.SAVE_WALLBOARD.LOST_CHANGES}
            </div>
            <div className="c-modal__body--save-changes__phrase">{DEFAULTS.MODAL.SAVE_WALLBOARD.SAVE_AND_CLOSE}</div>
          </div>
          <div className="c-modal__footer">
            <div className="c-modal__footer-left-side">{handleCancelButton()}</div>
            <div className="c-modal__footer-right-side">
              {handleDiscardButton()}
              {handleSaveButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalSaveWallboard;
