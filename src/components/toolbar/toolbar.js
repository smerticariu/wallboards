import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actionTypes';

const Toolbar = props => {
  const [wbFilter, setWbFilter] = useState('');
  const dispatch = useDispatch();
  const heading = () => {
    return (
      <div className="c-toolbar-left__wrapper">
        <h1 className="c-toolbar-left__heading">Recent Wallboards</h1>
        <p className="c-toolbar-left__wb-no">10 Wallboards Items</p>
      </div>
    )
  }

  const handleLeftToolbar = template => {
    switch(template) {
      case 'landing':
        return heading();
      
      default:
        return null;
    }
  }

  const handleFilterInput = () => {
    
    const updateFilterInput = e => {
      setWbFilter(e.target.value);
      dispatch({ type: actionTypes.SET_FILTERED_WALLBOARDS, payload: e.target.value });
    }

    return <input className="c-toolbar-right__search" placeholder="Search Wallboards..." value={wbFilter} type="text" onChange={e => updateFilterInput(e)}/>    
  }
  
  const handleRightToolbar = template => {
    switch(template) {
      case 'landing':
        return handleFilterInput()
    }
  }

  return (
    <div className="c-toolbar">
      <div className="c-toolbar-left">{handleLeftToolbar(props.template)}</div>
      <div className="c-toolbar-right">{handleRightToolbar(props.template)}</div>
    </div>
  );
}

export default Toolbar;