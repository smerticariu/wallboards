import { loginActions } from '../actions/login.action';

export const loginInitialState = {
  token: null,
  userInfo: null,
  userTokenInfo: null,
};

export const loginReducer = (state = loginInitialState, action) => {
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
        userInfo: {
          ...action.payload,
          isAdmin: action.payload.scopes.includes('wallboards:admin'),
          isTeamLeader: action.payload.scopes.includes('wallboards:teamleader'),
        },
      };
    case loginActions.HANDLE_LOGOUT:
      return {
        ...state,
        userInfo: null,
      };

    case loginActions.SET_USERS_AVATARS: {
      return {
        ...state,
        usersAvatars: action.payload,
      };
    }

    default:
      return state;
  }
};
