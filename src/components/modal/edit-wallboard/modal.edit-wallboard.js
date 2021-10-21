import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleWallboardActiveModalAC,
} from 'src/store/actions/modal.action';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

import CheckBox from 'src/components/checkbox/checkbox';
import { saveWallboardThunk } from '../../../store/thunk/wallboards.thunk';
import {
  handleNewWallboardTitleAC,
  handleSelectedWallboardDescriptionAC,
  setSelectedWallboardDisplaySettingsAC,
} from '../../../store/actions/wallboards.action';

const ModalEditWallboard = ({ ...props }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const activeWallboard = useSelector(state => state.wallboards.present.activeWallboard.wallboard);

  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };

  useOnClickOutside(modalRef, () => closeModal());

  const handleActionButtons = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    const onClickSaveButton = (e) => {
      dispatch(saveWallboardThunk());
      closeModal();
    };

    return (
      <>
        <button className="c-button" onClick={onClickSaveButton}>
          Save
        </button>
        <button className="c-button" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleInputChanges = (e, inputType) => {
    switch(inputType) {
      case 'wallboardName':
        dispatch(handleNewWallboardTitleAC(e.target.value));
        break;
      case 'wallboardDescription':
        dispatch(handleSelectedWallboardDescriptionAC(e.target.value))
        break;
      default:
        return;
    }
  }

  const handleSettingsChanges = (e, inputType) => {
    switch(inputType) {
      case 'shrinkWidth':
        dispatch(setSelectedWallboardDisplaySettingsAC({
          shrinkHeight: activeWallboard.settings.display.shrinkHeight,
          shrinkWidth: e.target.checked
        }));
        break;
      case 'shrinkHeight':
        dispatch(setSelectedWallboardDisplaySettingsAC({
          shrinkHeight: e.target.checked,
          shrinkWidth: activeWallboard.settings.display.shrinkWidth,
        }));
        break;
      default:
        break;
    }
  }

  const handleCreateWallboardURL = () => {

  }

  const handleCopyLinkToClipoard = () => {}

  // useEffect(() => {
  //   console.log('aa', activeWallboard)
  // }, [activeWallboard])

  return (
    <div ref={modalRef} className={`c-modal c-modal--open`}>
      <div className="c-modal__container c-modal__container--edit-wallboard ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">Settings</div>
          </div>

          <div className="c-modal__body--edit-wallboard">
            <form className="c-modal__form">
              <div className="c-modal__section">
                <label className="c-modal__label">Wallboard Name:</label>
                <input className="c-input c-input--grey" value={activeWallboard.name} type="text" onChange={e => handleInputChanges(e, 'wallboardName')} />
              </div>

              <div className="c-modal__section">
                <label className="c-modal__label">Wallboard Description:</label>
                <textarea rows="3" className="c-input c-input--grey" value={activeWallboard.description} type="text" onChange={e => handleInputChanges(e, 'wallboardDescription')} />
              </div>

              <div className="c-modal__section">
                <label className="c-modal__label">Display Settings:</label>
                <div className="c-modal__subsection  c-modal__subsection--small">
                  <CheckBox
                    label="Shrink to fit screen width"
                    checked={activeWallboard.settings.display.shrinkWidth}
                    name="shrinkWidth"
                    onChange={e => handleSettingsChanges(e, 'shrinkWidth')} />

                  <CheckBox
                    label="Shrink to fit screen height"
                    checked={activeWallboard.settings.display.shrinkHeight}
                    name="shrinkHeight"
                    onChange={e => handleSettingsChanges(e, 'shrinkHeight')} />
                </div>
              </div>

              <div className="c-modal__section c-modal__section--read-only">
                <button onClick={handleCreateWallboardURL()} className="c-button c-button--blue">
                  Create Read-Only Wallboard URL
                </button>
              </div>

              <div className="c-modal__section c-modal__section--read-only">
                <p className="c-modal__text">
                  A read only Wallboard URL allows anyone to access this wallboard with the basic
                  Chatter Free Salesforce licence.
                  This is great for non-Salesforce users or putting
                </p>
              </div>

              <div className="c-modal__section c-modal__section--read-only c-modal__section--read-only__generate-link">
                <input className="c-input c-input--grey" value={window.location.href.replace('edit', '')} type="text" onChange={e => handleInputChanges(e, 'wallboardName')} />
                <button onClick={handleCopyLinkToClipoard()} className="c-button c-button--blue">Copy Link</button>
              </div>
            </form>
          </div>

          <div className="c-modal__buttons">
          {handleActionButtons()}
        </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEditWallboard;