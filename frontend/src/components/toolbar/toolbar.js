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
  handleSelectedWallboardCategoryAC,
} from '../../store/actions/wallboards.action';
import { RedoIcon } from '../../assets/static/icons/redo';
import { UndoIcon } from '../../assets/static/icons/undo';
import CustomAutosuggest from '../autosuggest/autosuggest';
import { useHistory } from 'react-router';
import { generateWallboardGroupId, generateWallboardId } from '../../common/utils/generateId';
import {
  handleWallboardActiveModalAC,
  setSelectedWallboardGroupSettingsAC,
  setSelectedWallboardSettingsAC,
} from '../../store/actions/modal.action';
import { SettingsIcon } from '../../assets/static/icons/settings';
import { DEFAULTS } from '../../common/defaults/defaults';
import { useAuth0 } from '@auth0/auth0-react';
import AutoWidthInput from '../input/AutoWidthInput';
const Toolbar = (props) => {
  const dispatch = useDispatch();
  const [wbSearchValue, setWbSearchValue] = useState('');
  const wallboards = useSelector((state) => state.landing.wallboardsByCategory);
  const { category } = useSelector((state) => state.landing);
  const { userInfo } = useSelector((state) => state.login);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const wallboardGroup = useSelector((state) => state.wallboards.present.wallboardGroup.wallboardGroup);
  const noOfSteptsForUndo = useSelector((state) => state.wallboards.noOfSteptsForUndo);
  const wallboardStates = useSelector((state) => state.wallboards);
  const history = useHistory();
  const { logout } = useAuth0();
  const isGroupsCategory = category === 'All Wallboard Groups';

  const heading = () => {
    return (
      <div className="c-toolbar-left__wrapper">
        <h1 className="c-toolbar-left__heading">Recent {isGroupsCategory ? 'Groups' : 'Wallboards'}</h1>
        <p className="c-toolbar-left__wb-no">
          {wallboards.length} {isGroupsCategory ? 'Groups' : 'Wallboards'} Items
        </p>
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
    allTitlesForAutocomplete = [...allTitlesForAutocomplete, ...wallboards.map(({ createdBy }) => createdBy ?? '')];
    allTitlesForAutocomplete = [...new Set(allTitlesForAutocomplete)];
    return (
      <div className="c-toolbar-right__search-input">
        <CustomAutosuggest
          name="skill"
          placeholder={isGroupsCategory ? DEFAULTS.WALLBOARDS.PLACEHOLDER.SEARCH_GROUPS : DEFAULTS.WALLBOARDS.PLACEHOLDER.SEARCH_WALLBOARDS}
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
      history.push(`/group/${newWallboardGroupId}/edit`);
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

  const handleSaveButton = (functionForDispatch, isBtnDisabled) => {
    const handleClick = () => {
      return dispatch(functionForDispatch());
    };

    return (
      <button
        onClick={() => {
          handleClick();
        }}
        disabled={isBtnDisabled}
        className={`c-button c-button--m-left ${isBtnDisabled ? 'c-button--disabled' : ''}`}
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
          const isBtnDisabled = !wallboardGroup.steps?.some((step) => step.wallboardId);
          if (!isBtnDisabled) return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.SAVE_WALLBOARD_GROUP));
          break;
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
  const handleRunButton = (isLinkDisabled, url) => {
    return (
      <Link target="_blank" to={url} className={`c-button c-button--blue c-button--m-left ${isLinkDisabled ? 'c-button--disabled' : ''}`}>
        Run
      </Link>
    );
  };

  const handleSettingsIcon = () => {
    const onClikEditWallboardModal = () => {
      switch (props.template) {
        case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD: {
          dispatch(setSelectedWallboardSettingsAC(activeWallboard));
          dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.EDIT_WALLBOARD));
          break;
        }
        case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP: {
          dispatch(setSelectedWallboardGroupSettingsAC(wallboardGroup));
          dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.EDIT_WALLBOARD_GROUP));
          break;
        }
        default:
          break;
      }
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
      case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP: {
        const isRunLinkDisabled =
          !wallboardGroup?.steps?.filter((step) => step.wallboardId)?.length || wallboardGroup.isNewWallboard || !!noOfSteptsForUndo;
        const runUrl = '/group/' + wallboardGroup.id;

        const isSaveBtnDisabled = !wallboardGroup.steps?.some((step) => step.wallboardId);
        return (
          <>
            {handleBackToButton()}
            {handleSaveButton(
              () => handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.CONFIRM_SAVE_WALLBOARD_GROUP),
              isSaveBtnDisabled
            )}
            {handleCloseButton()}
            {handleRunButton(isRunLinkDisabled, runUrl)}
            {handleSettingsIcon()}
          </>
        );
      }

      case DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD: {
        const isRunLinkDisabled = !activeWallboard?.widgets?.length || activeWallboard.isNewWallboard;
        const runUrl = '/wallboard/' + activeWallboard.id;
        return (
          <>
            {handleNewComponentButton()}
            {handleBackToButton()}
            {handleSaveButton(() => handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.CONFIRM_SAVE_WALLBOARD))}
            {handleCloseButton()}
            {handleRunButton(isRunLinkDisabled, runUrl)}
            {handleSettingsIcon()}
          </>
        );
      }
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
      if (props.template === DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD || props.template === DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP) {
        dispatch(handleSelectedWallboardCategoryAC('All Wallboards'));
        dispatch(setFiltredWallboardsAC(''));
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
