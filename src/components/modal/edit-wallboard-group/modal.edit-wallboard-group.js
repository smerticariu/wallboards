import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleWallboardGroupSettingsAC, handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { applyWallboardGroupSettingsAC } from '../../../store/actions/wallboards.action';
import TextArea from 'src/components/textarea/textarea';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { handleIsNotificationShowAC } from '../../../store/actions/notification.action';
import config from '../../../config/auth/authConfig';

const ModalEditWallboardGroup = ({ ...props }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { wallboardGroupSettings } = useSelector((state) => state.modal);
  const activeWallboardGroupId = useSelector((state) => state.wallboards.present.wallboardGroup.wallboardGroup.id);

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
  const handleCreateWallboardURL = (e) => {
    e.preventDefault();

    dispatch(
      handleWallboardGroupSettingsAC({
        ...wallboardGroupSettings,
        link: {
          isReadOnlyEnabled: !wallboardGroupSettings.link.isReadOnlyEnabled,
        },
      })
    );
  };

  const handleCopyLinkToClipoard = (e) => {
    e.preventDefault();
    dispatch(handleIsNotificationShowAC(true, false, 'Link was successfully copied'));
    navigator.clipboard.writeText(wallboardLink);
  };

  const currentDate = new Date().getTime();
  const groupId = btoa(`${activeWallboardGroupId}?d=${currentDate}`);
  const host = process.env.REACT_APP_ENV === 'LOCAL' ? config.localHost : config.envHost;
  const wallboardLink = `${host}#/group/${groupId}`;

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--edit-wallboard ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">{DEFAULTS.MODAL.EDIT_WALLBOARD_GROUP.SETTINGS}</div>
          </div>

          <div className="c-modal__body--edit-wallboard">
            <form className="c-modal__form">
              <div className="c-modal__section">
                <label className="c-modal__label">{DEFAULTS.MODAL.EDIT_WALLBOARD_GROUP.NAME}</label>
                <input
                  className="c-input c-input--grey"
                  value={wallboardGroupSettings.name.value}
                  type="text"
                  name="name"
                  onChange={handleInputChanges}
                />
              </div>

              <div className="c-modal__section">
                <label className="c-modal__label">{DEFAULTS.MODAL.EDIT_WALLBOARD_GROUP.DESCRIPTION}</label>
                <TextArea
                  className="c-textarea"
                  value={wallboardGroupSettings.description.value}
                  type="text"
                  name="description"
                  onChange={handleInputChanges}
                />
              </div>
              <div className="c-modal__section c-modal__section--read-only">
                <button
                  onClick={handleCreateWallboardURL}
                  className={`c-button c-button--blue ${wallboardGroupSettings.link.isReadOnlyEnabled ? 'c-button--grey' : ''}`}
                >
                  {wallboardGroupSettings.link.isReadOnlyEnabled ? 'Disable ' : 'Create '}
                  {DEFAULTS.MODAL.EDIT_WALLBOARD_GROUP.READ_ONLY_URL}
                </button>
              </div>

              <div className="c-modal__section c-modal__section--read-only">
                <p className="c-modal__text">{DEFAULTS.MODAL.EDIT_WALLBOARD_GROUP.READ_ONLY_URL}</p>
              </div>

              <div className="c-modal__section c-modal__section--read-only c-modal__section--read-only__generate-link">
                <input
                  onChange={() => {}}
                  className="c-input c-input--grey"
                  value={wallboardGroupSettings.link.isReadOnlyEnabled ? wallboardLink : ''}
                  type="text"
                />
                <button
                  onClick={handleCopyLinkToClipoard}
                  disabled={!wallboardGroupSettings.link.isReadOnlyEnabled}
                  className={`c-button c-button--blue ${!wallboardGroupSettings.link.isReadOnlyEnabled ? 'c-button--disabled' : ''}`}
                >
                  {DEFAULTS.MODAL.EDIT_WALLBOARD_GROUP.COPY}
                </button>
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
