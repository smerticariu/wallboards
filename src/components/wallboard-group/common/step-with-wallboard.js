import React, { useState } from 'react';
import { SettingsIcon } from '../../../assets/static/icons/settings';
import { SCREEN_OPTIONS } from '../../../common/defaults/wallboards.defaults';
import StepPopup from './step-popup';
import StepWallboard from './step-wallboard';
const StepWithWallboard = ({ handleChangeStepTime, handleScreenOptionClick, step }) => {
  const [isShowStepPopup, handleIsShowStepPopup] = useState(false);
  return (
    <div className="step" id={step.stepId}>
      <div className="step__container">
        <StepWallboard />
        <div className="step__footer">
          <div className="step__footer-walboard">
            <div className="step__footer-wallboard-name">{step.wallboardName}</div>
            <div className="step__footer-wallboard-description">{step.wallboardDescription}</div>
          </div>
          <div className="step__footer-input-cog">
            <div className="step__footer-input-container">
              <input
                className="c-input c-input--seconds"
                type="number"
                min={1}
                value={step.stepTime}
                onChange={(e) => handleChangeStepTime(e, step.stepId)}
              />
              <div className="step__footer-seconds">sec</div>
            </div>
            <SettingsIcon onClick={() => handleIsShowStepPopup(true)} className="i--settings" />
          </div>
        </div>
      </div>
      {isShowStepPopup && (
        <StepPopup onClose={handleIsShowStepPopup}>
          <div className="step-popup__title">Screen Options</div>
          {SCREEN_OPTIONS.map((option) => (
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

export default StepWithWallboard;
