import * as types from '../actionTypes';

const initialState = '';

export const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LANDING_SELECTED_WALLBOARD_FILTER:
      return action.payload;
  
  default:
    return initialState;
  }
};
