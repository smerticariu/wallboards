import React, { useEffect, useState } from 'react';
import NewStep from './common/new-step';
import Xarrow, { Xwrapper } from 'react-xarrows';
import NewEmptyStep from './common/new-empty-step';
import { useSelector } from 'react-redux';
import ModalNewWallboard from '../modal/new-wallboard/modal.new-wallboard';
import StepWithWallboard from './common/step-with-wallboard';

const WallboardComponents = () => {
  const wallboardGroup = useSelector((state) => state.wallboards.present.wallboardGroup.wallboardGroup);
  const [selectedStep, handleSelectedStep] = useState(null);

  const [coord, setCoord] = useState([]);
  useEffect(() => {
    if (wallboardGroup.steps.length > 1)
      setCoord(
        wallboardGroup.steps.map((step, index) => {
          return {
            start: step.stepId,
            end: index + 1 === wallboardGroup.steps.length ? wallboardGroup.steps[0].stepId : wallboardGroup.steps[index + 1].stepId,
          };
        })
      );
  }, [wallboardGroup.steps]);
  return (
    <div className="wb-group">
      <div className="wb-group__title">Wallboard group configuration setup</div>
      <div className="wb-group__wallboards">
        <div className="wb-group__steps">
          <Xwrapper>
            {[...wallboardGroup.steps.slice(4, 8), ...wallboardGroup.steps.slice(0, 4).reverse()].map((step) => (
              <div key={step.stepId} className="wb-group__step">
                {step.wallboardId ? (
                  <StepWithWallboard handleSelectedStep={handleSelectedStep} step={step} />
                ) : (
                  <NewEmptyStep onClick={handleSelectedStep} step={step} />
                )}
              </div>
            ))}
            {coord.map((coord) => {
              return <Xarrow key={coord.start + ' ' + coord.end} start={`${coord.start}`} end={`${coord.end}`} path="grid" />;
            })}
          </Xwrapper>
        </div>
        <NewStep />
      </div>
      {selectedStep && (
        <ModalNewWallboard selectedWallboardId={selectedStep.wallboardId} onClose={handleSelectedStep} stepId={selectedStep.stepId} />
      )}
    </div>
  );
};

export default WallboardComponents;
