import React from 'react';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '../../../assets/static/icons/plus';
import { addStepForWallboardGroupAC } from '../../../store/actions/wallboards.action';

const NewStep = () => {
  const dispatch = useDispatch();
  const handleNewStepClick = () => {
    dispatch(addStepForWallboardGroupAC());
  };
  return (
    <div onClick={handleNewStepClick} className="new-step">
      <PlusIcon className="new-empty-step__plus-icon" />
      <div className="new-step__text">Add New Step</div>
    </div>
  );
};

export default NewStep;
