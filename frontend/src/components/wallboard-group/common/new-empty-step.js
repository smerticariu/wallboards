import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '../../../assets/static/icons/plus';
import { SettingsIcon } from '../../../assets/static/icons/settings';
import { EMPTY_STEP_SCREEN_OPTIONS, SCREEN_OPTIONS_ID } from '../../../common/defaults/wallboards.defaults';
import { removeStepForWallboardGroupAC } from '../../../store/actions/wallboards.action';
import StepPopup from './step-popup';
const NewEmptyStep = ({ isFirst, isLast, handleChangeStepTime, handleSelectedStep, onClick, step }) => {
  const [isShowStepPopup, handleIsShowStepPopup] = useState(false);
  const dispatch = useDispatch();
  const handleScreenOptionClick = (optionId) => {
    handleIsShowStepPopup(false);
    switch (optionId) {
      case SCREEN_OPTIONS_ID.CHANGE:
        handleSelectedStep(step);
        break;
      case SCREEN_OPTIONS_ID.REMOVE_STEP:
        dispatch(removeStepForWallboardGroupAC(step.stepId));
        break;
      default:
        break;
    }
  };
  return (
    <div className="step">
      <div className="new-empty-step" id={step.stepId}>
        <SettingsIcon onClick={() => handleIsShowStepPopup(true)} className="i--settings i--settings--step-card" />
        <div className="new-empty-step__plus">
          <PlusIcon onClick={() => onClick(step)} className="new-empty-step__plus-icon" />
        </div>
        <div className="new-empty-step__body">
          {(!isFirst || !isLast) && (
            <>
              {isFirst && 'Starts'}
              {isLast && 'Ends'}
            </>
          )}
          <input
            className="c-input c-input--seconds c-input--seconds--absolute"
            value={step.stepTime}
            type="number"
            onChange={(e) => {
              handleChangeStepTime(e, step.stepId);
            }}
          />
          <div className="new-empty-step__seconds">sec</div>
        </div>
      </div>
      {isShowStepPopup && (
        <StepPopup onClose={handleIsShowStepPopup}>
          <div className="step-popup__title">Screen Options</div>
          {EMPTY_STEP_SCREEN_OPTIONS.map((option) => (
            <div key={option.id} onClick={() => handleScreenOptionClick(option.id)} className="step-popup__option">
              {option.name}
            </div>
          ))}
        </StepPopup>
      )}
    </div>
  );
};

export default NewEmptyStep;
