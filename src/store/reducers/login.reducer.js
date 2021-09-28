import * as types from '../actionTypes';

const initialState = {}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
      case types.SET_USER_INFO:
        return {
          ...state,
          userInfo: action.payload,
        };
      
      // case types.SET_SIGN_OUT:
      //   return state;
      
      // case types.AUTH_TOKEN:
      //   return state;
      
      // case types.AUTH_TOKEN_EXPIRY:
      //   return state;
    
    default:
      return initialState;
  }
};
