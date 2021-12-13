import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleWallboardGroupSettingsAC, handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { applyWallboardGroupSettingsAC } from '../../../store/actions/wallboards.action';
import TextArea from 'src/components/textarea/textarea';
import { DEFAULTS } from '../../../common/defaults/defaults';

const ModalEditWallboardGroup = ({ ...props }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { wallboardGroupSettings } = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };

  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  const handleActionButtons = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    const onClickSaveButton = (e) => {
      dispatch(applyWallboardGroupSettingsAC(wallboardGroupSettings));
      closeModal();
    };

    return (
      <>
        <button className="c-button" onClick={onClickSaveButton}>
          Save
        </button>
        <button className="c-button c-button--m-left" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleInputChanges = (e) => {
    const { value, name } = e.target;
    dispatch(
      handleWallboardGroupSettingsAC({
        ...wallboardGroupSettings,
        [name]: {
          value: value,
          errorMessage: '',
        },
      })
    );
  };
  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--edit-wallboard ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">{DEFAULTS.MODAL.EDIT_WALLBOARD.SETTINGS}</div>
          </div>

          <div className="c-modal__body--edit-wallboard">
            <form className="c-modal__form">
              <div className="c-modal__section">
                <label className="c-modal__label">{DEFAULTS.MODAL.EDIT_WALLBOARD.NAME}</label>
                <input
                  className="c-input c-input--grey"
                  value={wallboardGroupSettings.name.value}
                  type="text"
                  name="name"
                  onChange={handleInputChanges}
                />
              </div>

              <div className="c-modal__section">
                <label className="c-modal__label">{DEFAULTS.MODAL.EDIT_WALLBOARD.DESCRIPTION}</label>
                <TextArea
                  className="c-textarea"
                  value={wallboardGroupSettings.description.value}
                  type="text"
                  name="description"
                  onChange={handleInputChanges}
                />
              </div>
            </form>
          </div>

          <div className="c-modal__buttons c-modal__buttons--settings">{handleActionButtons()}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditWallboardGroup;
