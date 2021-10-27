import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleChangeSelectedWallboardSettingsAC, handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

import CheckBox from 'src/components/checkbox/checkbox';
import { applyWallboardSettingsAC } from '../../../store/actions/wallboards.action';
import TextArea from 'src/components/textarea/textarea';
import { handleIsNotificationShowAC } from 'src/store/actions/notification.action';
import config from '../../../config/auth';

const ModalEditWallboard = ({ ...props }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { wallboardSettings } = useSelector((state) => state.modal);
  const activeWallboardId = useSelector((state) => state.wallboards.present.activeWallboard.wallboard.id);

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
      dispatch(applyWallboardSettingsAC(wallboardSettings));
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
      handleChangeSelectedWallboardSettingsAC({
        ...wallboardSettings,
        [name]: {
          value: value,
          errorMessage: '',
        },
      })
    );
  };

  const handleSettingsChanges = (e, inputType) => {
    switch (inputType) {
      case 'shrinkWidth':
        dispatch(
          handleChangeSelectedWallboardSettingsAC({
            ...wallboardSettings,
            display: {
              shrinkHeight: wallboardSettings.display.shrinkHeight,
              shrinkWidth: e.target.checked,
            },
          })
        );
        break;
      case 'shrinkHeight':
        dispatch(
          handleChangeSelectedWallboardSettingsAC({
            ...wallboardSettings,
            display: {
              shrinkHeight: e.target.checked,
              shrinkWidth: wallboardSettings.display.shrinkWidth,
            },
          })
        );
        break;
      default:
        break;
    }
  };

  const handleCreateWallboardURL = (e) => {
    e.preventDefault();

    dispatch(
      handleChangeSelectedWallboardSettingsAC({
        ...wallboardSettings,
        link: {
          isReadOnlyEnabled: !wallboardSettings.link.isReadOnlyEnabled,
        },
      })
    );
  };

  const handleCopyLinkToClipoard = (e) => {
    e.preventDefault();
    dispatch(handleIsNotificationShowAC(true, false, 'Link was successfully copied'));
    navigator.clipboard.writeText(wallboardLink);
  };

  // const wallboardLink = window.location.href.replace('edit', '');
  const currentDate = new Date().getTime();
  const wallboardLink = `${config.redirectUri}#/wallboard/${activeWallboardId}?d=${currentDate}`;
  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--edit-wallboard ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">Settings</div>
          </div>

          <div className="c-modal__body--edit-wallboard">
            <form className="c-modal__form">
              <div className="c-modal__section">
                <label className="c-modal__label">Wallboard Name:</label>
                <input
                  className="c-input c-input--grey"
                  value={wallboardSettings.name.value}
                  type="text"
                  name="name"
                  onChange={handleInputChanges}
                />
              </div>

              <div className="c-modal__section">
                <label className="c-modal__label">Wallboard Description:</label>
                <TextArea
                  className="c-textarea"
                  value={wallboardSettings.description.value}
                  type="text"
                  name="description"
                  onChange={handleInputChanges}
                />
              </div>

              <div className="c-modal__section">
                <label className="c-modal__label">Display Settings:</label>
                <div className="c-modal__subsection  c-modal__subsection--small">
                  <CheckBox
                    className="c-checkbox--grey"
                    isGrey
                    label="Shrink to fit screen width"
                    checked={wallboardSettings.display.shrinkWidth}
                    name="shrinkWidth"
                    onChange={(e) => handleSettingsChanges(e, 'shrinkWidth')}
                  />

                  <CheckBox
                    className="c-checkbox--grey"
                    isGrey
                    label="Shrink to fit screen height"
                    checked={wallboardSettings.display.shrinkHeight}
                    name="shrinkHeight"
                    onChange={(e) => handleSettingsChanges(e, 'shrinkHeight')}
                  />
                </div>
              </div>

              <div className="c-modal__section c-modal__section--read-only">
                <button
                  onClick={handleCreateWallboardURL}
                  className={`c-button c-button--blue ${wallboardSettings.link.isReadOnlyEnabled ? 'c-button--grey' : ''}`}
                >
                  {wallboardSettings.link.isReadOnlyEnabled ? 'Disable ' : 'Create '}
                  Read-Only Wallboard URL
                </button>
              </div>

              <div className="c-modal__section c-modal__section--read-only">
                <p className="c-modal__text">
                  A read only Wallboard URL allows anyone to access this wallboard with the basic Chatter Free Salesforce licence. This is
                  great for non-Salesforce users or putting wallboards on a TV
                </p>
              </div>

              <div className="c-modal__section c-modal__section--read-only c-modal__section--read-only__generate-link">
                <input
                  onChange={() => {}}
                  className="c-input c-input--grey"
                  value={wallboardSettings.link.isReadOnlyEnabled ? wallboardLink : ''}
                  type="text"
                />
                <button
                  onClick={handleCopyLinkToClipoard}
                  disabled={!wallboardSettings.link.isReadOnlyEnabled}
                  className={`c-button c-button--blue ${!wallboardSettings.link.isReadOnlyEnabled ? 'c-button--disabled' : ''}`}
                >
                  Copy Link
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

export default ModalEditWallboard;
