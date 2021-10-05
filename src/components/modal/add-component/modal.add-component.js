import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AgentCard from "src/components/agent-card/agent-card";
import CheckBox from "src/components/checkbox/checkbox";
import Radio from "src/components/radio/radio";
import {
  handleModalAddComponentFormDataAC,
  handleModalSelectActiveElementAC,
  handleWallboardActiveModalAC,
} from "src/store/actions/wallboards.action";
import useOnClickOutside from "../../../common/hooks/useOnClickOutside";
import {
  AVAILABILITY_STATES_OPTIONS,
  CALL_QUEUE_OPTIONS,
  INTERACTIVITY_OPTIONS,
  MAIN_VIEWING_OPTIONS,
  PRESENCE_STATES_OPTIONS,
  SORT_BY_OPTIONS,
} from "./modal.add-component.defaults";

const ModalAddComponent = ({ ...props }) => {
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.wallboards.modalAddComponent);
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

  const handleAddButton = () => {
    const onClickAddButton = (e) => {
      dispatch(handleModalSelectActiveElementAC());
      dispatch(handleWallboardActiveModalAC(null));
    };

    return (
      <>
        <button
          className={`c-button c-button--m-left c-button--green`}
          onClick={onClickAddButton}
        >
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

    const handleCheckBoxList = (event, formDataProp) => {
      const { name } = event.target;
      switch (name) {
        case "selectAll":
        case "selectNone":
          return dispatch(
            handleModalAddComponentFormDataAC({
              ...formData,
              [formDataProp]: {
                ...formData[formDataProp],
                [name]: event.target.checked,
              },
            })
          );
        default: {
          dispatch(
            handleModalAddComponentFormDataAC({
              ...formData,
              [formDataProp]: {
                ...formData[formDataProp],
                selectedItems: formData[formDataProp].selectedItems.includes(
                  +name
                )
                  ? formData[formDataProp].selectedItems.filter(
                      (el) => el !== +name
                    )
                  : [...formData[formDataProp].selectedItems, +name],
              },
            })
          );
        }
      }
    };

    return (
      <div className="c-modal--add-component__left-side">
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">
            Title/Report Name
          </div>
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
          <select
            name="callQueue"
            className="c-select"
            onChange={handleInputAndSelect}
            value={formData.callQueue}
          >
            {CALL_QUEUE_OPTIONS.map((option) => (
              <option key={option.VALUE} value={option.VALUE}>
                {option.TEXT}
              </option>
            ))}
          </select>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">
            Main Viewing
          </div>
          <Radio
            label="Card/Tile View"
            name={MAIN_VIEWING_OPTIONS.CARD}
            checked={MAIN_VIEWING_OPTIONS.CARD === formData.mainViewing}
            onChange={(e) => handleRadioButton(e, "mainViewing")}
          />
          <div className="c-modal--add-component__main-radio">
            <Radio
              label="Table View"
              name={MAIN_VIEWING_OPTIONS.TABLE}
              checked={MAIN_VIEWING_OPTIONS.TABLE === formData.mainViewing}
              onChange={(e) => handleRadioButton(e, "mainViewing")}
            />
          </div>
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">Sort by</div>

          {SORT_BY_OPTIONS.map((option) => (
            <div
              key={option.value}
              className="c-modal--add-component__sort-radio"
            >
              <Radio
                label={option.text}
                checked={+formData.sortBy === option.value}
                name={option.value}
                onChange={(e) => handleRadioButton(e, "sortBy")}
              />
            </div>
          ))}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">
            Select availability states to view
          </div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox
              label="Select all"
              checked={formData.availabilityStates.selectAll}
              name={"selectAll"}
              onChange={(event) =>
                handleCheckBoxList(event, "availabilityStates")
              }
            />
            <CheckBox
              label="Select none"
              className="c-checkbox--m-left"
              checked={formData.availabilityStates.selectNone}
              name={"selectNone"}
              onChange={(event) =>
                handleCheckBoxList(event, "availabilityStates")
              }
            />
          </div>

          {true && (
            <div className="c-modal--add-component__av-state-container">
              {AVAILABILITY_STATES_OPTIONS.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  name={option.value}
                  checked={formData.availabilityStates.selectedItems.includes(
                    option.value
                  )}
                  onChange={(event) =>
                    handleCheckBoxList(event, "availabilityStates")
                  }
                />
              ))}
            </div>
          )}
        </div>
        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">
            Presence states to view
          </div>

          <div className="c-modal--add-component__select-checkbox">
            <CheckBox label="Select all" checked={false} />
            <CheckBox
              label="Select none"
              checked={false}
              className="c-checkbox--m-left"
            />
          </div>
          {true && (
            <div className="c-modal--add-component__av-state-container">
              {PRESENCE_STATES_OPTIONS.map((option) => (
                <CheckBox
                  key={option.value}
                  label={option.text}
                  checked={false}
                />
              ))}
            </div>
          )}
        </div>

        <div className="c-modal--add-component__input-section">
          <div className="c-modal--add-component__input-label">
            Interactivity options
          </div>
          {INTERACTIVITY_OPTIONS.map((option) => (
            <CheckBox key={option.value} label={option.text} checked={true} />
          ))}
        </div>
      </div>
    );
  };
  const handleModalRightSide = () => {
    return (
      <div className="c-modal--add-component__right-side">
        <div className="c-modal--add-component__input-label">Preview</div>

        <div className="c-modal--add-component__preview-container">
          <div className="c-modal--add-component__preview-title">
            <span className="c-modal--add-component__preview-title--bold">
              Agent List:
            </span>{" "}
            Not urgent but somewhat important queue
          </div>
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
      <div
        ref={modalRef}
        className="c-modal__container c-modal__container--add-component "
      >
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
