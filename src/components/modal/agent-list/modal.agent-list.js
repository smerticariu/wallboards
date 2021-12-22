import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArrayFromTo } from '../../../common/utils/generateArray';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

import { addWallboardAgentListAC } from '../../../store/actions/wallboards.action';
import CheckBox from '../../checkbox/checkbox';
import CustomAutosuggest from '../../autosuggest/autosuggest';
import Radio from '../../radio/radio';
import AgentCard from '../../agent-card/agent-card';
import {
  handleModalAgentListDataAC,
  handleWallboardActiveModalAC,
  resetNewWidgetModalFormDataAC,
} from '../../../store/actions/modal.action';
import { checkIsAlphanumeric } from '../../../common/utils/alphanumeric-validation';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { ADD_COMPONENT_COLUMN_OPTIONS, INTERACTIVITY_OPTIONS_KEYS, PRESENCE_STATE_KEYS } from '../../../common/defaults/modal.defaults';
import AgentListTablePreview from '../../tables/agent-table.preview';

const ModalAgentList = ({ ...props }) => {
  const modalRef = useRef(null);
  const [searchInputValues, setSearchInputValues] = useState({
    skill: '',
    availabilityStates: '',
  });
  const dispatch = useDispatch();
  const agentList = useSelector((state) => state.modal.agentList);
  const { allSkils } = useSelector((state) => state.skills);
  const { allCallsQueues } = useSelector((state) => state.callsQueues);
  const isCardFormat = DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.CARD === agentList.mainViewing;
  const { userInfo } = useSelector((state) => state.login);
  const { availabilityStates, availabilityProfiles } = useSelector((state) => state.agents);
  const [availabilityStatesList, handleAvailabilityStatesList] = useState([]);

  useEffect(() => {
    if (availabilityStates.length && availabilityProfiles.length) {
      handleAvailabilityStatesList(
        availabilityProfiles.reduce((availabilityList, availabilityProfile) => {
          const list = [];
          const availabilityState = availabilityStates.find((state) => state.availabilityProfileId === availabilityProfile.id);
          if (availabilityState) {
            availabilityState.states.forEach((state) =>
              list.push({
                availabilityProfileId: availabilityProfile.id,
                availabilityProfileName: availabilityProfile.name,
                availabilityStateId: state.id,
                availabilityStateDisplayName: state.displayName,
              })
            );
          }
          return [...availabilityList, ...list];
        }, [])
      );
    }
  }, [availabilityProfiles, availabilityStates]);
  useEffect(() => {
    if (agentList.isEditMode) return;
    if (allCallsQueues.length) {
      dispatch(
        handleModalAgentListDataAC({
          ...agentList,
          callQueue: {
            id: allCallsQueues[0].id,
            name: allCallsQueues[0].name,
            errorMessage: '',
          },
        })
      );
    }
    // eslint-disable-next-line
  }, [allCallsQueues]);
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
    dispatch(resetNewWidgetModalFormDataAC());
  };

  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    return (
      <button className="c-button" onClick={onClickCancelButton}>
        Cancel
      </button>
    );
  };

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      if (!checkIsAlphanumeric(agentList.title.value)) {
        dispatch(
          handleModalAgentListDataAC({
            ...agentList,
            title: {
              ...agentList.title,
              errorMessage: DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE,
            },
          })
        );

        return alert(DEFAULTS.MODAL.MESSAGES.ALPHANUMERIC_TITLE);
      }
      dispatch(addWallboardAgentListAC(userInfo, agentList));
      closeModal();
    };

    return (
      <button className={`c-button c-button--m-left c-button--blue`} onClick={onClickAddButton}>
        {agentList.isEditMode ? 'Save' : 'Add'}
      </button>
    );
  };

  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event) => {
      const { name, value } = event.target;
      switch (name) {
        case 'callQueue':
          const callQueue = allCallsQueues.find((queue) => queue.id === value);
          return dispatch(
            handleModalAgentListDataAC({
              ...agentList,
              callQueue: {
                ...callQueue,
                errorMessage: '',
              },
            })
          );
        default:
          dispatch(
            handleModalAgentListDataAC({
              ...agentList,
              [name]: {
                value,
                errorMessage: '',
              },
            })
          );
      }
    };

    const handleRadioButton = (event, agentListProp) => {
      const { name } = event.target;
      dispatch(
        handleModalAgentListDataAC({
          ...agentList,
          [agentListProp]: name,
        })
      );
    };

    const handleCheckBoxList = (event, agentListProp) => {
      const { name, checked } = event.target;
      switch (name) {
        case 'selectAll':
          return dispatch(
            handleModalAgentListDataAC({
              ...agentList,
              [agentListProp]: {
                ...agentList[agentListProp],
                selectAll: checked,
                selectNone: false,
                selectedItems: [...DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_STATE_OPTIONS[agentListProp].map((option) => option.value)],
              },
            })
          );

        case 'selectNone':
          return dispatch(
            handleModalAgentListDataAC({
              ...agentList,
              [agentListProp]: {
                ...agentList[agentListProp],
                selectNone: checked,
                selectAll: false,
                selectedItems: [],
              },
            })
          );

        default: {
          dispatch(
            handleModalAgentListDataAC({
              ...agentList,
              [agentListProp]: {
                ...agentList[agentListProp],
                selectedItems: checked
                  ? [...agentList[agentListProp].selectedItems, name]
                  : agentList[agentListProp].selectedItems.filter((value) => value !== name),
              },
            })
          );
        }
      }
    };

    const handleChangeSkillList = (event) => {
      const { name, checked } = event.target;
      let selectedItems = [];
      let selectAll = false;
      let selectNone = false;
      switch (name) {
        case 'selectAll': {
          selectedItems = allSkils.map((skill) => skill.name);
          selectAll = checked;
          selectNone = false;
          break;
        }
        case 'selectNone': {
          selectAll = false;
          selectNone = checked;
          break;
        }
        default: {
          selectedItems = checked
            ? [...agentList.skillsToView.selectedItems, name]
            : agentList.skillsToView.selectedItems.filter((value) => value !== name);
        }
      }
      dispatch(
        handleModalAgentListDataAC({
          ...agentList,
          skillsToView: {
            ...agentList.skillsToView,
            selectNone,
            selectAll,
            selectedItems,
          },
        })
      );
    };

    const handleChangeAvailabilityList = (event, availabilityStateId, availabilityProfileId) => {
      const { name, checked } = event.target;
      let selectedItems = [];
      let selectAll = false;
      let selectNone = false;
      switch (name) {
        case 'selectAll': {
          selectedItems = availabilityStatesList.map(({ availabilityStateId, availabilityProfileId }) => ({
            availabilityStateId,
            availabilityProfileId,
          }));
          selectAll = checked;
          selectNone = false;
          break;
        }
        case 'selectNone': {
          selectAll = false;
          selectNone = checked;
          break;
        }
        default: {
          selectedItems = checked
            ? [...agentList.availabilityStates.selectedItems, { availabilityStateId, availabilityProfileId }]
            : agentList.availabilityStates.selectedItems.filter(
                (option) => !(option.availabilityStateId === availabilityStateId && option.availabilityProfileId === availabilityProfileId)
              );
        }
      }
      dispatch(
        handleModalAgentListDataAC({
          ...agentList,
          availabilityStates: {
            ...agentList.availabilityStates,
            selectNone,
            selectAll,
            selectedItems,
          },
        })
      );
    };

    const checkIsCheckboxChecked = (optionArr, optionName) => {
      return optionArr.includes(optionName);
    };
    const checkIsAvailabilityCheckboxChecked = (optionArr, availabilityStateId, availabilityProfileId) => {
      return optionArr.some(
        (option) => option.availabilityStateId === availabilityStateId && option.availabilityProfileId === availabilityProfileId
      );
    };

    const onChangeSearchInput = (value, name) => {
      setSearchInputValues({
        ...searchInputValues,
        [name]: value,
      });
    };

    const handleSkillsToView = () => {
      const allTitlesForAutocomplete = allSkils.map(({ description }) => description);

      return (
        <div className="c-modal--add-component__input-section c-modal--add-component__input-section--skills">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.SKILLS}</div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox
              label={DEFAULTS.MODAL.ADD_COMPONENT.LABEL.SELECT_ALL}
              checked={agentList.skillsToView.selectAll}
              name={'selectAll'}
              onChange={handleChangeSkillList}
            />
            <CheckBox
              label={DEFAULTS.MODAL.ADD_COMPONENT.LABEL.SELECT_NONE}
              className="c-checkbox--m-left"
              checked={agentList.skillsToView.selectNone}
              name="selectNone"
              onChange={handleChangeSkillList}
            />
          </div>

          {!(agentList.skillsToView.selectAll || agentList.skillsToView.selectNone) && (
            <>
              <CustomAutosuggest
                name="skill"
                onChange={onChangeSearchInput}
                value={searchInputValues.skill}
                allTitles={allTitlesForAutocomplete}
                isSmallSize
                placeholder={DEFAULTS.MODAL.ADD_COMPONENT.PLACEHOLDER.SKILL}
              />
              <div className="c-modal--add-component__av-state-container">
                {allSkils
                  .filter((skill) => skill.description ? skill.description.toLowerCase().includes(searchInputValues.skill.toLowerCase()) : skill)
                  .map((skill) => (
                    <CheckBox
                      key={skill.id}
                      label={skill.description}
                      name={skill.name}
                      className="c-checkbox--margin-top-bottom"
                      checked={checkIsCheckboxChecked(agentList.skillsToView.selectedItems, skill.name)}
                      onChange={handleChangeSkillList}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      );
    };

    const handleAvailabilityStatesToView = () => {
      const allTitlesForAutocomplete = availabilityStatesList.map(
        (state) => `${state.availabilityProfileName} - ${state.availabilityStateDisplayName}`
      );

      return (
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.AVAILABILITY}</div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox
              label={DEFAULTS.MODAL.ADD_COMPONENT.LABEL.SELECT_ALL}
              checked={agentList.availabilityStates.selectAll}
              name={'selectAll'}
              onChange={handleChangeAvailabilityList}
            />
            <CheckBox
              label={DEFAULTS.MODAL.ADD_COMPONENT.LABEL.SELECT_NONE}
              className="c-checkbox--m-left"
              checked={agentList.availabilityStates.selectNone}
              name={'selectNone'}
              onChange={handleChangeAvailabilityList}
            />
          </div>

          {!(agentList.availabilityStates.selectAll || agentList.availabilityStates.selectNone) && (
            <>
              <CustomAutosuggest
                name="availabilityStates"
                onChange={onChangeSearchInput}
                value={searchInputValues.availabilityStates}
                allTitles={allTitlesForAutocomplete}
                isSmallSize
                placeholder={DEFAULTS.MODAL.ADD_COMPONENT.PLACEHOLDER.AVAILABILITY}
              />
              <div className="c-modal--add-component__av-state-container">
                {availabilityStatesList
                  .filter((option) =>
                    `${option.availabilityProfileName} - ${option.availabilityStateDisplayName}`
                      .toLowerCase()
                      .includes(searchInputValues.availabilityStates.toLowerCase())
                  )
                  .map((option, index) => (
                    <CheckBox
                      key={index}
                      label={`${option.availabilityProfileName}  -  ${option.availabilityStateDisplayName}`}
                      className="c-checkbox--margin-top-bottom"
                      checked={checkIsAvailabilityCheckboxChecked(
                        agentList.availabilityStates.selectedItems,
                        option.availabilityStateId,
                        option.availabilityProfileId
                      )}
                      onChange={(event) => handleChangeAvailabilityList(event, option.availabilityStateId, option.availabilityProfileId)}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      );
    };

    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.TITLE}</div>
          <input
            className="c-input c-input--grey"
            placeholder={DEFAULTS.MODAL.ADD_COMPONENT.PLACEHOLDER.TITLE}
            name="title"
            onChange={handleInputAndSelect}
            value={agentList.title.value}
          />
          {agentList.title.errorMessage && <div className="c-input__error-message">{agentList.title.errorMessage}</div>}
        </div>
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.CALL_QUEUE}</div>
          <select name="callQueue" className="c-select" onChange={handleInputAndSelect} value={agentList.callQueue.id}>
            {allCallsQueues.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section c-modal--add-component__input-section--view">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.VIEW}</div>
          <Radio
            label="Card View"
            name={DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.CARD}
            checked={isCardFormat}
            onChange={(e) => handleRadioButton(e, 'mainViewing')}
          />
          <div className="c-modal--add-component__main-radio">
            <Radio
              label="Table View"
              name={DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE}
              checked={!isCardFormat}
              onChange={(e) => handleRadioButton(e, 'mainViewing')}
            />
          </div>
          {!isCardFormat && (
            <div>
              <Radio
                label={DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE}
                name={DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE}
                checked={DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE === agentList.columns}
                onChange={(e) => handleRadioButton(e, 'columns')}
              />
              <div className="c-modal--add-component__main-radio">
                <Radio
                  label={DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO}
                  name={DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO}
                  checked={DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO === agentList.columns}
                  onChange={(e) => handleRadioButton(e, 'columns')}
                />
              </div>
            </div>
          )}
        </div>

        {!isCardFormat && (
          <div className="c-modal--add-component__input-section c-modal--add-component__input-section--columns">
            <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.COLUMNS}</div>

            <div className="c-modal--add-component__av-state-container">
              {DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_STATE_OPTIONS.columnsToViewOptions.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  name={option.value}
                  className="c-checkbox--margin-top-bottom"
                  checked={checkIsCheckboxChecked(agentList.columnsToViewOptions.selectedItems, option.value)}
                  onChange={(event) => handleCheckBoxList(event, 'columnsToViewOptions')}
                />
              ))}
            </div>
          </div>
        )}
        {!isCardFormat && handleSkillsToView()}
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.SORT_BY}</div>

          <select name="sortBy" className="c-select" onChange={handleInputAndSelect} value={agentList.sortBy.value}>
            {DEFAULTS.MODAL.ADD_COMPONENT.SORT_BY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        {handleAvailabilityStatesToView()}

        <div className="c-modal--add-component__input-section c-modal--add-component__input-section--presence-state">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.PRESENCE_STATE}</div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox
              checked={agentList.presenceStates.selectAll}
              label={DEFAULTS.MODAL.ADD_COMPONENT.LABEL.SELECT_ALL}
              name="selectAll"
              onChange={(event) => handleCheckBoxList(event, 'presenceStates')}
            />
            <CheckBox
              label={DEFAULTS.MODAL.ADD_COMPONENT.LABEL.SELECT_NONE}
              name="selectNone"
              checked={agentList.presenceStates.selectNone}
              className="c-checkbox--m-left"
              onChange={(event) => handleCheckBoxList(event, 'presenceStates')}
            />
          </div>

          {!(agentList.presenceStates.selectAll || agentList.presenceStates.selectNone) && (
            <div className="c-modal--add-component__av-state-container">
              {DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_STATE_OPTIONS.presenceStates.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  name={option.value}
                  className="c-checkbox--margin-top-bottom"
                  checked={checkIsCheckboxChecked(agentList.presenceStates.selectedItems, option.value)}
                  onChange={(event) => handleCheckBoxList(event, 'presenceStates')}
                />
              ))}
            </div>
          )}
        </div>

        <div className="c-modal--add-component__input-section c-modal--add-component__input-section--interactivity">
          <div className="c-modal--add-component__input-label">{DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.INTERACTIVITY}</div>
          {DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_STATE_OPTIONS.interactivityOptions.map((option) => (
            <CheckBox
              key={option.value}
              label={option.text}
              name={option.value}
              className="c-checkbox--margin-top-bottom"
              checked={checkIsCheckboxChecked(agentList.interactivityOptions.selectedItems, option.value)}
              onChange={(event) => handleCheckBoxList(event, 'interactivityOptions')}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label c-modal--add-component__input-label--grey">
          {DEFAULTS.MODAL.ADD_COMPONENT.SECTION_TITLE.PREVIEW}
        </div>

        <div className="c-modal--add-component__preview-container">
          <div className="c-modal--add-component__preview-title">
            <span className="c-modal--add-component__preview-title--bold">{agentList.title.value}:</span> {agentList.callQueue.name}
          </div>
          {isCardFormat ? (
            <div className="c-modal--add-component__agent-card">
              <AgentCard
                callStatus="Inbound Call"
                callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER}
                callTime={0}
                ext="0000"
                name="Staff Member Name"
                status="User online status"
                totalTime={0}
                isPreview={true}
              />
            </div>
          ) : (
            <div className="c-modal--add-component__agent-table">
              {createArrayFromTo(0, DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE === agentList.columns ? 0 : 1).map(
                (index) => (
                  <AgentListTablePreview
                    key={index}
                    canCallAgents={agentList.interactivityOptions.selectedItems.includes(INTERACTIVITY_OPTIONS_KEYS.CALL_AGENTS)}
                    canListenLive={agentList.interactivityOptions.selectedItems.includes(INTERACTIVITY_OPTIONS_KEYS.LISTEN_LIVE)}
                    agentName={agentList.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME)}
                    agentExtNo={agentList.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_EXTENSION)}
                    currAvaiState={agentList.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY)}
                    currPresState={agentList.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_PRESENCE)}
                    noCallsOffered={agentList.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED)}
                    noCallsAnswered={agentList.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED)}
                    noCallsMissed={agentList.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED)}
                    timeInCurrentPresenceState={agentList.columnsToViewOptions.selectedItems.includes(
                      ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE
                    )}
                    timeInCurrentAvailabilityState={agentList.columnsToViewOptions.selectedItems.includes(
                      ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_AVAILABILITY
                    )}
                    timeInCurrentCall={agentList.columnsToViewOptions.selectedItems.includes(
                      ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_CALL
                    )}
                    timeInCurrentWrapup={agentList.columnsToViewOptions.selectedItems.includes(
                      ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP
                    )}
                    listOfSkills={agentList.columnsToViewOptions.selectedItems.includes(
                      ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES
                    )}
                  />
                )
              )}
            </div>
          )}
        </div>
        <div className="c-modal__buttons">
          {handleCancelButton()}
          {handleAddButton()}
        </div>
      </div>
    );
  };

  return (
    <div className={`c-modal c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--add-component ">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">{agentList.isEditMode ? 'Edit' : 'Add'} Component</div>
          </div>

          <div className="c-modal__body--add-component">
            {handleModalLeftSide()}
            {handleModalRightSide()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalAgentList;
