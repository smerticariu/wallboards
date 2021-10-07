import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArrayFromTo } from 'src/common/utils/generateArray';
import AgentCard from 'src/components/agent-card/agent-card';
import AgentTable from 'src/components/agent-table/agent-table';
import CheckBox from 'src/components/checkbox/checkbox';
import Radio from 'src/components/radio/radio';
import {
  handleModalAddComponentFormDataAC,
  handleModalSelectActiveElementAC,
  handleWallboardActiveModalAC,
  resetModalAddComponentFormDataAC,
} from 'src/store/actions/wallboards.action';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import {
  ADD_COMPONENT_COLUMNS_NO_OPTIONS,
  ADD_COMPONENT_STATE_OPTIONS,
  CALL_QUEUE_OPTIONS,
  MAIN_VIEWING_OPTIONS,
  SORT_BY_OPTIONS,
} from './modal.add-component.defaults';

const ModalAddComponent = ({ ...props }) => {
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.wallboards.modalAddComponent);
  const isCardFormat = MAIN_VIEWING_OPTIONS.CARD === formData.mainViewing;

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
      <>
        <button className="c-button" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      dispatch(handleModalSelectActiveElementAC());
      dispatch(handleWallboardActiveModalAC(null));
    };

    return (
      <>
        <button className={`c-button c-button--m-left c-button--green`} onClick={onClickAddButton}>
          Select
        </button>
      </>
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

    const handleTableColumnsCheckbox = (event) => {
      const { name, checked } = event.target;
      return dispatch(
        handleModalAddComponentFormDataAC({
          ...formData,
          columnsToViewOptions: {
            ...formData.columnsToViewOptions,
            selectedItems: {
              ...formData.columnsToViewOptions.selectedItems,
              [name]: {
                ...formData.columnsToViewOptions.selectedItems[name],
                isChecked: checked,
              },
            },
          },
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
                selectedItems: [...ADD_COMPONENT_STATE_OPTIONS[formDataProp]],
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
                selectedItems: ADD_COMPONENT_STATE_OPTIONS[formDataProp].map((option) => ({ ...option, isChecked: false })),
              },
            })
          );
        default: {
          dispatch(
            handleModalAddComponentFormDataAC({
              ...formData,
              [formDataProp]: {
                ...formData[formDataProp],
                selectedItems: formData[formDataProp].selectedItems.map((option) =>
                  option.value.toString() !== name ? option : { ...option, isChecked: checked }
                ),
              },
            })
          );
        }
      }
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
          <div className="c-modal--add-component__input-label">Main Viewing</div>
          <Radio
            label="Card/Tile View"
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
          <>
            <div className="c-modal--add-component__input-section">
              <div className="c-modal--add-component__input-label">Select columns to view</div>

              <div className="c-modal--add-component__av-state-container c-modal--add-component__av-state-container--columns">
                {Object.keys(formData.columnsToViewOptions.selectedItems).map((optionKey) => (
                  <CheckBox
                    key={optionKey}
                    label={formData.columnsToViewOptions.selectedItems[optionKey].text}
                    name={optionKey}
                    checked={formData.columnsToViewOptions.selectedItems[optionKey].isChecked}
                    onChange={handleTableColumnsCheckbox}
                  />
                ))}
              </div>
            </div>

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
                <div className="c-modal--add-component__av-state-container">
                  {formData.skillsToView.selectedItems.map((option) => (
                    <CheckBox
                      key={option.value}
                      label={option.text}
                      name={option.value}
                      checked={option.isChecked}
                      onChange={(event) => handleCheckBoxList(event, 'skillsToView')}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Sort by</div>

          {SORT_BY_OPTIONS.map((option) => (
            <div key={option.value} className="c-modal--add-component__sort-radio">
              <Radio
                label={option.text}
                checked={+formData.sortBy === option.value}
                name={option.value}
                onChange={(e) => handleRadioButton(e, 'sortBy')}
              />
            </div>
          ))}
        </div>

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
            <div className="c-modal--add-component__av-state-container">
              {formData.availabilityStates.selectedItems.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  name={option.value}
                  checked={option.isChecked}
                  onChange={(event) => handleCheckBoxList(event, 'availabilityStates')}
                />
              ))}
            </div>
          )}
        </div>

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
              {formData.presenceStates.selectedItems.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  name={option.value}
                  checked={option.isChecked}
                  onChange={(event) => handleCheckBoxList(event, 'presenceStates')}
                />
              ))}
            </div>
          )}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Interactivity options</div>
          {formData.interactivityOptions.selectedItems.map((option) => (
            <CheckBox
              key={option.value}
              label={option.text}
              name={option.value}
              checked={option.isChecked}
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
        <div className="c-modal--add-component__input-label">Preview</div>

        <div className="c-modal--add-component__preview-container">
          <div className="c-modal--add-component__preview-title">
            <span className="c-modal--add-component__preview-title--bold">Agent List:</span> {agentListText}
          </div>
          {isCardFormat ? (
            <div className="c-modal--add-component__agent-card">
              <AgentCard
                callStatus="Inbound Call"
                callTime="--:--:--"
                ext="0000"
                name="Staff Member Name"
                status="User online status"
                totalTime="00:00:00"
              />
            </div>
          ) : (
            <div className="c-modal--add-component__agent-table">
              {createArrayFromTo(0, ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE === formData.columns ? 0 : 1).map((n) => (
                <AgentTable
                  key={n}
                  agentName={formData.columnsToViewOptions.selectedItems.agentName.isChecked}
                  agentExtNo={formData.columnsToViewOptions.selectedItems.agentExtNo.isChecked}
                  currAvaiState={formData.columnsToViewOptions.selectedItems.currAvaiState.isChecked}
                  currPresState={formData.columnsToViewOptions.selectedItems.currPresState.isChecked}
                  noCallsOffered={formData.columnsToViewOptions.selectedItems.noCallsOffered.isChecked}
                  noCallsAnswered={formData.columnsToViewOptions.selectedItems.noCallsAnswered.isChecked}
                  noCallsMissed={formData.columnsToViewOptions.selectedItems.noCallsMissed.isChecked}
                  timeInCurrentPresenceState={formData.columnsToViewOptions.selectedItems.timeInCurrentPresenceState.isChecked}
                  timeInCurrentAvailabilityState={formData.columnsToViewOptions.selectedItems.timeInCurrentAvailabilityState.isChecked}
                  timeInCurrentCall={formData.columnsToViewOptions.selectedItems.timeInCurrentCall.isChecked}
                  timeInCurrentWrapup={formData.columnsToViewOptions.selectedItems.timeInCurrentWrapup.isChecked}
                  listOfSkills={formData.columnsToViewOptions.selectedItems.listOfSkills.isChecked}
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
            <div className="c-modal__title">Add Component</div>
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
