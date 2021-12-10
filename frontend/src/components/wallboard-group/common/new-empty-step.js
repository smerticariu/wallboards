import React, { useState } from 'react';
import { PlusIcon } from '../../../assets/static/icons/plus';
import { SettingsIcon } from '../../../assets/static/icons/settings';
import { EMPTY_STEP_SCREEN_OPTIONS } from '../../../common/defaults/wallboards.defaults';
import StepPopup from './step-popup';
const NewEmptyStep = ({ isFirst, isLast, handleChangeStepTime, handleScreenOptionClick, onPlusClick, step }) => {
  const [isShowStepPopup, handleIsShowStepPopup] = useState(false);

  return (
    <div className="step">
      <div className="new-empty-step" id={step.stepId}>
        <SettingsIcon onClick={() => handleIsShowStepPopup(true)} className="i--settings i--settings--step-card" />
        <div className="new-empty-step__plus">
          <PlusIcon onClick={() => onPlusClick(step)} className="new-empty-step__plus-icon" />
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
            <div
              key={option.id}
              onClick={() => {
                handleIsShowStepPopup(false);
                handleScreenOptionClick(option.id, step);
              }}
              className="step-popup__option"
            >
              {option.name}
            </div>
          ))}
        </StepPopup>
      )}
    </div>
  );
};

export default NewEmptyStep;
