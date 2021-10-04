import * as types from '../actionTypes';

const initialState = {
  filterWallboards: '',
};

export const wallboardsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.SET_FILTERED_WALLBOARDS:
    //   return {
    //     ...state,
    //     filterWallboards: action.payload,
    //   }
  
  default:
    return initialState;
  }
};
