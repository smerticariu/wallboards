import React, { useEffect } from 'react';
import { PlusIcon } from '../../../assets/static/icons/plus';
import { useXarrow } from 'react-xarrows';
const NewEmptyStep = ({ onClick, step }) => {
  const updateXarrow = useXarrow();
  useEffect(() => {
    updateXarrow();
  }, [step]);
  return (
    <div className="new-empty-step" id={step.stepId}>
      <div onClick={() => onClick(step)} className="new-empty-step__plus">
        <PlusIcon className="new-empty-step__plus-icon" />
      </div>
      <div className="new-empty-step__body">
        Starts
        <input className="c-input c-input--seconds c-input--seconds--absolute" value={30} onChange={() => {}} />
        <div className="new-empty-step__seconds">sec</div>
      </div>
    </div>
  );
};

export default NewEmptyStep;
