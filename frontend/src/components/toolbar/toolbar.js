import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  createNewEmptyWallboardAC,
  createNewEmptyWallboardGroupAC,
  handleNewWallboardGroupTitleAC,
  handleNewWallboardTitleAC,
  setFiltredWallboardsAC,
  wallboardRedoAC,
  wallboardUndoAC,
} from '../../store/actions/wallboards.action';
import { RedoIcon } from '../../assets/static/icons/redo';
import { UndoIcon } from '../../assets/static/icons/undo';
import CustomAutosuggest from '../autosuggest/autosuggest';
import { useHistory } from 'react-router';
import { generateWallboardGroupId, generateWallboardId } from '../../common/utils/generateId';
import { handleWallboardActiveModalAC, setSelectedWallboardSettingsAC } from '../../store/actions/modal.action';
import { SettingsIcon } from '../../assets/static/icons/settings';
import { DEFAULTS } from '../../common/defaults/defaults';
import { useAuth0 } from '@auth0/auth0-react';
import AutoWidthInput from '../input/AutoWidthInput';
import { saveWallboardGroupThunk } from '../../store/thunk/wallboards.thunk';

const Toolbar = (props) => {
  const dispatch = useDispatch();
  const [wbSearchValue, setWbSearchValue] = useState('');
  const wallboards = useSelector((state) => state.landing.wallboardsByCategory);
  const { userInfo } = useSelector((state) => state.login);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const wallboardGroup = useSelector((state) => state.wallboards.present.wallboardGroup.wallboardGroup);
  const noOfSteptsForUndo = useSelector((state) => state.wallboards.noOfSteptsForUndo);
  const wallboardStates = useSelector((state) => state.wallboards);
  const history = useHistory();
  const { logout } = useAuth0();

  const heading = () => {
    return (
      <div className="c-toolbar-left__wrapper">
        <h1 className="c-toolbar-left__heading">Recent Wallboards</h1>
        <p className="c-toolbar-left__wb-no">{wallboards.length} Wallboards Items</p>
      </div>
    );
  };
  const newWallboardHeading = () => {
    const handleChangeTitle = (event) => {
      dispatch(handleNewWallboardTitleAC(event.target.value));
    };
    return (
      <div className="c-toolbar-left__wrapper">
        <AutoWidthInput onChange={handleChangeTitle} className="c-input c-input--new-walboard-title" value={activeWallboard.name} />

        <p className="c-toolbar-left__wb-no">
          Viewing as {userInfo.firstName} {userInfo.lastName}
        </p>
      </div>
    );
  };
  const newWallboardGroupHeading = () => {
    const handleChangeTitle = (event) => {
      dispatch(handleNewWallboardGroupTitleAC(event.target.value));
    };
    return (
      <div className="c-toolbar-left__wrapper">
        <AutoWidthInput onChange={handleChangeTitle} className="c-input c-input--new-walboard-title" value={wallboardGroup.name} />
      </div>
    );
  };

  const handleLeftToolbar = (template) => {
    switch (template) {
      case DEFAULTS.TOOLBAR.NAME.LANDING:
        return heading();
      case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD:
        return newWallboardHeading();
      case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP:
        return newWallboardGroupHeading();
      case DEFAULTS.TOOLBAR.NAME.WALLBOARD_READ_ONLY:
        return <h1 className="c-toolbar-left__heading c-toolbar-left__heading--new-wallboard">{props.wbName}</h1>;
      default:
        return null;
    }
  };

  const handleFilterInput = () => {
    const onChangeSearchInput = (value, name) => {
      setWbSearchValue(value);
      dispatch(setFiltredWallboardsAC(value));
    };

    let allTitlesForAutocomplete = wallboards.map(({ name }) => name);
    allTitlesForAutocomplete = [...allTitlesForAutocomplete, ...wallboards.map(({ createdBy }) => createdBy)];
    allTitlesForAutocomplete = [...new Set(allTitlesForAutocomplete)];
    return (
      <div className="c-toolbar-right__search-input">
        <CustomAutosuggest
          name="skill"
          placeholder={DEFAULTS.WALLBOARDS.PLACEHOLDER.SEARCH_WALLBOARDS}
          onChange={onChangeSearchInput}
          value={wbSearchValue}
          allTitles={allTitlesForAutocomplete}
        />
      </div>
    );
  };

  const handleNewWallboardButton = () => {
    const onNewWallboardClick = () => {
      const newWallboardId = generateWallboardId(userInfo.organisationId, userInfo.id);
      dispatch(createNewEmptyWallboardAC(newWallboardId));
      history.push(`/wallboard/${newWallboardId}/edit`);
    };
    return (
      <button onClick={onNewWallboardClick} className="c-button c-button--m-left">
        + New Wallboard
      </button>
    );
  };
  const handleNewWallboardGroupButton = () => {
    const onClickNewWallboardGroupButton = (e) => {
      const newWallboardGroupId = generateWallboardGroupId(userInfo.organisationId, userInfo.id);
      dispatch(createNewEmptyWallboardGroupAC(newWallboardGroupId));
      history.push(`/wallboard/group/${newWallboardGroupId}/edit`);
    };

    return (
      <button className="c-button c-button--m-left" onClick={onClickNewWallboardGroupButton}>
        + New Wallboard Group
      </button>
    );
  };

  const handleNewComponentButton = () => {
    const onClickNewComponentModal = () => {
      switch (props.template) {
        case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD:
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.SELECT_COMPONENT));
        default:
          break;
      }
    };

    return (
      <button onClick={onClickNewComponentModal} className="c-button c-button--blue">
        + Add Component
      </button>
    );
  };

  const handleBackToButton = () => {
    const isUndoDisabled = !wallboardStates.noOfSteptsForUndo;
    const isRedoDisabled = !wallboardStates.future.length;
    return (
      <div className="c-arrow-button c-arrow-button--m-left ">
        <button
          onClick={() => {
            dispatch(wallboardUndoAC());
          }}
          disabled={isUndoDisabled}
          className="c-arrow-button__arrow"
        >
          <UndoIcon className={`i--undo${isUndoDisabled ? '--disabled' : ''}`} />
        </button>
        <hr className="c-arrow-button__separator" />
        <button
          onClick={() => {
            dispatch(wallboardRedoAC());
          }}
          disabled={isRedoDisabled}
          className="c-arrow-button__arrow"
        >
          <RedoIcon className={`i--redo${isRedoDisabled ? '--disabled' : ''}`} />
        </button>
      </div>
    );
  };

  const handleSaveButton = () => {
    const handleClick = () => {
      switch (props.template) {
        case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD:
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.CONFIRM_SAVE_WALLBOARD));
        case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP:
          return dispatch(saveWallboardGroupThunk());
        default:
          break;
      }
    };
    return (
      <button
        onClick={() => {
          handleClick();
        }}
        className="c-button c-button--m-left"
      >
        Save
      </button>
    );
  };

  const onClickCloseButton = () => {
    if (noOfSteptsForUndo) {
      switch (props.template) {
        case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD:
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.SAVE_WALLBOARD));
        case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP:
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.SAVE_WALLBOARD));
        default:
          break;
      }
    }
    return history.push('/');
  };

  const handleCloseButton = () => {
    return (
      <button onClick={onClickCloseButton} className="c-button c-button--m-left">
        Close
      </button>
    );
  };
  const handleRunButton = () => {
    const isLinkDisabled = !activeWallboard?.widgets?.length || activeWallboard.isNewWallboard;
    return (
      <Link
        target="_blank"
        to={`/wallboard/${activeWallboard.id}`}
        className={`c-button c-button--blue c-button--m-left ${isLinkDisabled && 'c-button--disabled'}`}
      >
        Run
      </Link>
    );
  };

  const handleSettingsIcon = () => {
    const onClikEditWallboardModal = () => {
      dispatch(setSelectedWallboardSettingsAC(activeWallboard));
      dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.EDIT_WALLBOARD));
    };
    return <SettingsIcon onClick={() => onClikEditWallboardModal()} className="i--settings i--settings--toolbar" />;
  };

  const handleRightToolbar = (template) => {
    switch (template) {
      case DEFAULTS.TOOLBAR.NAME.LANDING:
        return (
          <>
            {handleFilterInput()}
            {handleNewWallboardButton()}
            {handleNewWallboardGroupButton()}
          </>
        );
      case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP:
        return (
          <>
            {handleBackToButton()}
            {handleSaveButton()}
            {handleCloseButton()}
            {handleRunButton()}
            {handleSettingsIcon()}
          </>
        );

      case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD:
        return (
          <>
            {handleNewComponentButton()}
            {handleBackToButton()}
            {handleSaveButton()}
            {handleCloseButton()}
            {handleRunButton()}
            {handleSettingsIcon()}
          </>
        );

      case DEFAULTS.TOOLBAR.NAME.ERROR:
      case DEFAULTS.TOOLBAR.NAME.WALLBOARD_READ_ONLY:
        return (
          <>
            <button className="c-button c-button--m-left" onClick={() => logout()}>
              Logout
            </button>
          </>
        );
      default:
        return;
    }
  };

  const handleBanner = () => {
    const onLogoClick = () => {
      if (props.template === DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD) {
        return onClickCloseButton();
      }
      return history.push('/');
    };
    return (
      <div className="c-banner">
        <div onClick={onLogoClick} className="c-banner-logo"></div>
        <div className="c-banner-brand"></div>
      </div>
    );
  };
  return (
    <>
      {handleBanner()}
      <div
        className={`c-toolbar ${props.template === DEFAULTS.TOOLBAR.NAME.WALLBOARD_READ_ONLY ? 'c-toolbar--wb-read-only' : ''} ${
          props.template === DEFAULTS.TOOLBAR.NAME.ERROR ? 'c-toolbar--error' : ''
        }`}
      >
        {props.children && <>{props.children}</>}
        <div className="c-toolbar-left">{handleLeftToolbar(props.template)}</div>
        <div className="c-toolbar-right">{handleRightToolbar(props.template)}</div>
      </div>
    </>
  );
};

export default Toolbar;
