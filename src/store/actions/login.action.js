export const loginActions = {
  SET_USER_TOKEN_INFO: 'SET_USER_TOKEN_INFO',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_USERS_AVATARS: 'SET_USERS_AVATARS',
  HANDLE_LOGOUT: 'HANDLE_LOGOUT',
};

export const setUserTokenInfoAC = (userInfo) => ({
  type: loginActions.SET_USER_TOKEN_INFO,
  payload: userInfo,
});

export const setUserInfoAC = (userInfo) => ({
  type: loginActions.SET_USER_INFO,
  payload: userInfo,
});

export const setAccessTokenAC = (accesToken) => ({
  type: loginActions.SET_ACCESS_TOKEN,
  payload: accesToken,
});

export const setUsersAvatarsAC = (usersAvatars) => ({
  type: loginActions.SET_USERS_AVATARS,
  payload: usersAvatars,
});

export const handleLogoutAC = (accesToken) => ({
  type: loginActions.HANDLE_LOGOUT,
  payload: accesToken,
});
