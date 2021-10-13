import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArrayFromTo } from 'src/common/utils/generateArray';
import AgentCard from 'src/components/agent-card/agent-card';
import AgentTablePreview from 'src/components/agent-table/agent-table.preview';
import CustomAutosuggest from 'src/components/autosuggest/autosuggest';
import CheckBox from 'src/components/checkbox/checkbox';
import Radio from 'src/components/radio/radio';
import {
  addWallboardComponentAC,
  handleModalAddComponentFormDataAC,
  handleWallboardActiveModalAC,
  resetModalAddComponentFormDataAC,
} from 'src/store/actions/wallboards.action';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import {
  ADD_COMPONENT_COLUMNS_NO_OPTIONS,
  ADD_COMPONENT_COLUMN_OPTIONS,
  ADD_COMPONENT_STATE_OPTIONS,
  CALL_QUEUE_OPTIONS,
  MAIN_VIEWING_OPTIONS,
  PRESENCE_STATE_KEYS,
  SORT_BY_OPTIONS,
} from './modal.add-component.defaults';

const ModalAddComponent = ({ ...props }) => {
  const modalRef = useRef(null);
  const [searchInputValues, setSearchInputValues] = useState({
    skill: '',
    availabilityStates: '',
  });
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.wallboards.modalAddComponent);
  const isCardFormat = MAIN_VIEWING_OPTIONS.CARD === formData.mainViewing;
  const { userInfo } = useSelector((state) => state.login);
  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
    dispatch(resetModalAddComponentFormDataAC());
  };

  useOnClickOutside(modalRef, () => closeModal());

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
      dispatch(addWallboardComponentAC(userInfo));
      closeModal();
    };

    return (
      <button className={`c-button c-button--m-left c-button--green`} onClick={onClickAddButton}>
        {formData.isEditMode ? 'Edit' : 'Add'}
      </button>
    );
  };

  const handleModalLeftSide = () => {
    const handleInputAndSelect = (event) => {
      const { name, value } = event.target;
      dispatch(
        handleModalAddComponentFormDataAC({
          ...formData,
          [name]: value,
        })
      );
    };

    const handleRadioButton = (event, formDataProp) => {
      const { name } = event.target;
      dispatch(
        handleModalAddComponentFormDataAC({
          ...formData,
          [formDataProp]: name,
        })
      );
    };

    const handleCheckBoxList = (event, formDataProp) => {
      const { name, checked } = event.target;
      switch (name) {
        case 'selectAll':
          return dispatch(
            handleModalAddComponentFormDataAC({
              ...formData,
              [formDataProp]: {
                ...formData[formDataProp],
                selectAll: checked,
                selectNone: false,
                selectedItems: [...ADD_COMPONENT_STATE_OPTIONS[formDataProp].map((option) => option.value)],
              },
            })
          );

        case 'selectNone':
          return dispatch(
            handleModalAddComponentFormDataAC({
              ...formData,
              [formDataProp]: {
                ...formData[formDataProp],
                selectNone: checked,
                selectAll: false,
                selectedItems: [],
              },
            })
          );
        default: {
          dispatch(
            handleModalAddComponentFormDataAC({
              ...formData,
              [formDataProp]: {
                ...formData[formDataProp],
                selectedItems: checked
                  ? [...formData[formDataProp].selectedItems, name]
                  : formData[formDataProp].selectedItems.filter((value) => value !== name),
              },
            })
          );
        }
      }
    };

    const checkIsCheckboxChecked = (optionArr, optionName) => {
      return optionArr.includes(optionName);
    };

    const onChangeSearchInput = (value, name) => {
      setSearchInputValues({
        ...searchInputValues,
        [name]: value,
      });
    };

    const handleSkillsToView = () => {
      const allTitlesForAutocomplete = ADD_COMPONENT_STATE_OPTIONS.skillsToView.map(({ text }) => text);

      return (
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Select Skills to view</div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox
              label="Select all"
              checked={formData.skillsToView.selectAll}
              name={'selectAll'}
              onChange={(event) => handleCheckBoxList(event, 'skillsToView')}
            />
            <CheckBox
              label="Select none"
              className="c-checkbox--m-left"
              checked={formData.skillsToView.selectNone}
              name={'selectNone'}
              onChange={(event) => handleCheckBoxList(event, 'skillsToView')}
            />
          </div>

          {!(formData.skillsToView.selectAll || formData.skillsToView.selectNone) && (
            <>
              <CustomAutosuggest
                name="skill"
                onChange={onChangeSearchInput}
                value={searchInputValues.skill}
                allTitles={allTitlesForAutocomplete}
                isSmallSize
                placeholder="Search by Skill name"
              />
              <div className="c-modal--add-component__av-state-container">
                {ADD_COMPONENT_STATE_OPTIONS.skillsToView
                  .filter((option) => option.text.toLowerCase().includes(searchInputValues.skill.toLowerCase()))
                  .map((option) => (
                    <CheckBox
                      key={option.value}
                      label={option.text}
                      name={option.value}
                      className="c-checkbox--margin-top-bottom"
                      checked={checkIsCheckboxChecked(formData.skillsToView.selectedItems, option.value)}
                      onChange={(event) => handleCheckBoxList(event, 'skillsToView')}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      );
    };

    const handleAvailabilityStatesToView = () => {
      const allTitlesForAutocomplete = ADD_COMPONENT_STATE_OPTIONS.availabilityStates.map(({ text }) => text);

      return (
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Select availability states to view</div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox
              label="Select all"
              checked={formData.availabilityStates.selectAll}
              name={'selectAll'}
              onChange={(event) => handleCheckBoxList(event, 'availabilityStates')}
            />
            <CheckBox
              label="Select none"
              className="c-checkbox--m-left"
              checked={formData.availabilityStates.selectNone}
              name={'selectNone'}
              onChange={(event) => handleCheckBoxList(event, 'availabilityStates')}
            />
          </div>

          {!(formData.availabilityStates.selectAll || formData.availabilityStates.selectNone) && (
            <>
              <CustomAutosuggest
                name="availabilityStates"
                onChange={onChangeSearchInput}
                value={searchInputValues.availabilityStates}
                allTitles={allTitlesForAutocomplete}
                isSmallSize
                placeholder="Search by name"
              />
              <div className="c-modal--add-component__av-state-container">
                {ADD_COMPONENT_STATE_OPTIONS.availabilityStates
                  .filter((option) => option.text.toLowerCase().includes(searchInputValues.availabilityStates.toLowerCase()))
                  .map((option) => (
                    <CheckBox
                      key={option.value}
                      label={option.text}
                      name={option.value}
                      className="c-checkbox--margin-top-bottom"
                      checked={checkIsCheckboxChecked(formData.availabilityStates.selectedItems, option.value)}
                      onChange={(event) => handleCheckBoxList(event, 'availabilityStates')}
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
          <div className="c-modal--add-component__input-label">Title/Report Name</div>
          <input
            className="c-input c-input--grey"
            placeholder="Placeholder..."
            name="title"
            onChange={handleInputAndSelect}
            value={formData.title}
          />
        </div>
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Call Queue</div>
          <select name="callQueue" className="c-select" onChange={handleInputAndSelect} value={formData.callQueue}>
            {CALL_QUEUE_OPTIONS.map((option) => (
              <option key={option.VALUE} value={option.VALUE}>
                {option.TEXT}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">View</div>
          <Radio
            label="Card View"
            name={MAIN_VIEWING_OPTIONS.CARD}
            checked={isCardFormat}
            onChange={(e) => handleRadioButton(e, 'mainViewing')}
          />
          <div className="c-modal--add-component__main-radio">
            <Radio
              label="Table View"
              name={MAIN_VIEWING_OPTIONS.TABLE}
              checked={!isCardFormat}
              onChange={(e) => handleRadioButton(e, 'mainViewing')}
            />
          </div>
          {!isCardFormat && (
            <div>
              <Radio
                label={ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE}
                name={ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE}
                checked={ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE === formData.columns}
                onChange={(e) => handleRadioButton(e, 'columns')}
              />
              <div className="c-modal--add-component__main-radio">
                <Radio
                  label={ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO}
                  name={ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO}
                  checked={ADD_COMPONENT_COLUMNS_NO_OPTIONS.TWO === formData.columns}
                  onChange={(e) => handleRadioButton(e, 'columns')}
                />
              </div>
            </div>
          )}
        </div>

        {!isCardFormat && (
          <div className="c-modal--add-component__input-section">
            <div className="c-modal--add-component__input-label">Select columns to view</div>

            <div className="c-modal--add-component__av-state-container">
              {ADD_COMPONENT_STATE_OPTIONS.columnsToViewOptions.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  name={option.value}
                  className="c-checkbox--margin-top-bottom"
                  checked={checkIsCheckboxChecked(formData.columnsToViewOptions.selectedItems, option.value)}
                  onChange={(event) => handleCheckBoxList(event, 'columnsToViewOptions')}
                />
              ))}
            </div>
          </div>
        )}
        {!isCardFormat && handleSkillsToView()}
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Sort by</div>

          <select name="sortBy" className="c-select" onChange={handleInputAndSelect} value={formData.sortBy}>
            {SORT_BY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

        {handleAvailabilityStatesToView()}

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Presence states to view</div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox
              checked={formData.presenceStates.selectAll}
              label="Select all"
              name="selectAll"
              onChange={(event) => handleCheckBoxList(event, 'presenceStates')}
            />
            <CheckBox
              label="Select none"
              name="selectNone"
              checked={formData.presenceStates.selectNone}
              className="c-checkbox--m-left"
              onChange={(event) => handleCheckBoxList(event, 'presenceStates')}
            />
          </div>
          {!(formData.presenceStates.selectAll || formData.presenceStates.selectNone) && (
            <div className="c-modal--add-component__av-state-container">
              {ADD_COMPONENT_STATE_OPTIONS.presenceStates.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  name={option.value}
                  className="c-checkbox--margin-top-bottom"
                  checked={checkIsCheckboxChecked(formData.presenceStates.selectedItems, option.value)}
                  onChange={(event) => handleCheckBoxList(event, 'presenceStates')}
                />
              ))}
            </div>
          )}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Interactivity options</div>
          {ADD_COMPONENT_STATE_OPTIONS.interactivityOptions.map((option) => (
            <CheckBox
              key={option.value}
              label={option.text}
              name={option.value}
              className="c-checkbox--margin-top-bottom"
              checked={checkIsCheckboxChecked(formData.interactivityOptions.selectedItems, option.value)}
              onChange={(event) => handleCheckBoxList(event, 'interactivityOptions')}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleModalRightSide = () => {
    const agentListText = CALL_QUEUE_OPTIONS.find((option) => option.VALUE === formData.callQueue)?.TEXT ?? '';

    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label c-modal--add-component__input-label--grey">Preview</div>

        <div className="c-modal--add-component__preview-container">
          <div className="c-modal--add-component__preview-title">
            <span className="c-modal--add-component__preview-title--bold">Agent List:</span> {agentListText}
          </div>
          {isCardFormat ? (
            <div className="c-modal--add-component__agent-card">
              <AgentCard
                callStatus="Inbound Call"
                callStatusKey={PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER}
                callTime="--:--:--"
                ext="0000"
                name="Staff Member Name"
                status="User online status"
                totalTime="00:00:00"
              />
            </div>
          ) : (
            <div className="c-modal--add-component__agent-table">
              {createArrayFromTo(0, ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE === formData.columns ? 0 : 1).map((index) => (
                <AgentTablePreview
                  key={index}
                  agentName={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME)}
                  agentExtNo={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.AGENT_EXTENSION)}
                  currAvaiState={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY)}
                  currPresState={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_PRESENCE)}
                  noCallsOffered={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED)}
                  noCallsAnswered={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED)}
                  noCallsMissed={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED)}
                  timeInCurrentPresenceState={formData.columnsToViewOptions.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE
                  )}
                  timeInCurrentAvailabilityState={formData.columnsToViewOptions.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_AVAILABILITY
                  )}
                  timeInCurrentCall={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_CALL)}
                  timeInCurrentWrapup={formData.columnsToViewOptions.selectedItems.includes(
                    ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP
                  )}
                  listOfSkills={formData.columnsToViewOptions.selectedItems.includes(ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES)}
                />
              ))}
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
            <div className="c-modal__title">{formData.isEditMode ? 'Edit' : 'Add'} Component</div>
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
export default ModalAddComponent;
