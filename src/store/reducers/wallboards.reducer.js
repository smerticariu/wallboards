import * as types from '../actionTypes';

const initialState = '';

export const wallboardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILTERED_WALLBOARDS:
      return action.payload;
  
  default:
    return initialState;
  }
};
