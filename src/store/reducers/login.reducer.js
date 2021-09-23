import * as types from '../actionTypes';

const initialState = {}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_GET_DATA_FROM_SALESFORCE:
      return {
        ...state,
        ...action.payload,
      };

      case types.SET_SIGN_IN:
        return state;
      
      case types.SET_SIGN_OUT:
        return state;
      
      case types.AUTH_TOKEN:
        return state;
      
      case types.AUTH_TOKEN_EXPIRY:
        return state;
    
    default:
      return state;
  }
};
