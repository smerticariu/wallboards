import * as types from '../actionTypes';

const initialState = {}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_GET_DATA_FROM_SALESFORCE:
      return {
        ...state,
        ...action.payload,
      };
    
    default:
      return state;
  }
};
