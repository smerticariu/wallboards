import { loginActions } from '../actions/login.action';

const initialState = {
  token: null,
  userInfo: null,
  userTokenInfo: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginActions.SET_ACCESS_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case loginActions.SET_USER_TOKEN_INFO:
      return {
        ...state,
        userTokenInfo: action.payload,
      };
    case loginActions.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case loginActions.HANDLE_LOGOUT:
      return {
        ...state,
        userInfo: null,
      };

    // case types.SET_SIGN_OUT:
    //   return state;

    // case types.AUTH_TOKEN:
    //   return state;

    // case types.AUTH_TOKEN_EXPIRY:
    //   return state;

    default:
      return state;
  }
};
