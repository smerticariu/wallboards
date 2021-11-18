export const wallboardsActions = {
  HANDLE_NEW_WALLBOARD_TITLE: 'HANDLE_NEW_WALLBOARD_TITLE',
  HANDLE_SELECTED_WALLBOARD_DESCRIPTION: 'HANDLE_SELECTED_WALLBOARD_DESCRIPTION',
  LANDING_SELECTED_WALLBOARD_CATEGORY: 'LANDING_SELECTED_WALLBOARD_CATEGORY',
  SET_FILTERED_WALLBOARDS: 'SET_FILTERED_WALLBOARDS',
  SET_WALLBOARDS_BY_CATEGORY: 'SET_WALLBOARDS_BY_CATEGORY',

  FETCH_WALLBOARD_BY_ID: 'FETCH_WALLBOARD_BY_ID',
  FETCH_WALLBOARD_BY_ID_SUCCESS: 'FETCH_WALLBOARD_BY_ID_SUCCESS',
  FETCH_WALLBOARD_BY_ID_FAIL: 'FETCH_WALLBOARD_BY_ID_FAIL',

  FETCH_ALL_WALLBOARDS: 'FETCH_ALL_WALLBOARDS',
  FETCH_ALL_WALLBOARDS_SUCCESS: 'FETCH_ALL_WALLBOARDS_SUCCESS',
  FETCH_ALL_WALLBOARDS_FAIL: 'FETCH_ALL_WALLBOARDS_FAIL',

  CREATE_LOCAL_NEW_EMPTY_WALLBOARD: 'CREATE_LOCAL_NEW_EMPTY_WALLBOARD',

  SAVE_WALLBOARD: 'SAVE_WALLBOARD',
  SAVE_WALLBOARD_SUCCESS: 'SAVE_WALLBOARD_SUCCESS',
  SAVE_WALLBOARD_FAIL: 'SAVE_WALLBOARD_FAIL',
  SAVE_WALLBOARD_RESET_STATUS: 'SAVE_WALLBOARD_RESET_STATUS',

  ADD_WALLBOARD_COMPONENT: 'ADD_WALLBOARD_COMPONENT',

  WALLBOARD_GRID_LAYOUT_CHANGE: 'WALLBOARD_GRID_LAYOUT_CHANGE',

  RESET_WALLBOARD_EDIT_PAGE_DATA: 'RESET_WALLBOARD_EDIT_PAGE_DATA',

  SET_WALLBOARD_ID_FOR_DELETE: 'SET_WALLBOARD_ID_FOR_DELETE',

  DELETE_WALLBOARD_COMPONENT_BY_ID: 'DELETE_WALLBOARD_COMPONENT_BY_ID',

  WALLBOARD_UNDO: 'WALLBOARD_UNDO',
  WALLBOARD_REDO: 'WALLBOARD_REDO',

  APPLY_WALLBOARD_SETTINGS: 'APPLY_WALLBOARD_SETTINGS',

  SYNC_WIDGET_SIZE_FOR_NEW_SCREEN: 'SYNC_WIDGET_SIZE_FOR_NEW_SCREEN',
};

export const handleNewWallboardTitleAC = (title) => ({
  type: wallboardsActions.HANDLE_NEW_WALLBOARD_TITLE,
  payload: title,
});

export const handleSelectedWallboardDescriptionAC = (description) => ({
  type: wallboardsActions.HANDLE_SELECTED_WALLBOARD_DESCRIPTION,
  payload: description,
});

export const handleSelectedWallboardCategoryAC = (category) => ({
  type: wallboardsActions.LANDING_SELECTED_WALLBOARD_CATEGORY,
  payload: category,
});

export const setFiltredWallboardsAC = (wallboards) => ({
  type: wallboardsActions.SET_FILTERED_WALLBOARDS,
  payload: wallboards,
});

export const setWallboardsByCategoryAC = (wallboards) => ({
  type: wallboardsActions.SET_WALLBOARDS_BY_CATEGORY,
  payload: wallboards,
});

export const fetchWallboardByIdAC = (message) => ({
  type: wallboardsActions.FETCH_WALLBOARD_BY_ID,
  payload: message,
});
export const fetchWallboardByIdSuccessAC = (wallboard) => ({
  type: wallboardsActions.FETCH_WALLBOARD_BY_ID_SUCCESS,
  payload: wallboard,
});
export const fetchWallboardByIdFailAC = (errorMEssage, statusCode) => ({
  type: wallboardsActions.FETCH_WALLBOARD_BY_ID_FAIL,
  payload: { errorMEssage, statusCode },
});

export const fetchAllWallboardsAC = () => ({
  type: wallboardsActions.FETCH_ALL_WALLBOARDS,
});
export const fetchAllWallboardsSuccessAC = (wallboards) => ({
  type: wallboardsActions.FETCH_ALL_WALLBOARDS_SUCCESS,
  payload: wallboards,
});
export const fetchAllWallboardsFailAC = (errorMEssage) => ({
  type: wallboardsActions.FETCH_ALL_WALLBOARDS_FAIL,
  payload: errorMEssage,
});

export const createNewEmptyWallboardAC = (id) => ({
  type: wallboardsActions.CREATE_LOCAL_NEW_EMPTY_WALLBOARD,
  payload: id,
});

export const saveWallboardAC = () => ({
  type: wallboardsActions.SAVE_WALLBOARD,
});
export const saveWallboardSuccessAC = (wallboard) => ({
  type: wallboardsActions.SAVE_WALLBOARD_SUCCESS,
  payload: wallboard,
});
export const saveWallboardFailAC = (errorMEssage) => ({
  type: wallboardsActions.SAVE_WALLBOARD_FAIL,
  payload: errorMEssage,
});
export const saveWallboardResetStatusAC = (errorMEssage) => ({
  type: wallboardsActions.SAVE_WALLBOARD_RESET_STATUS,
});

export const addWallboardComponentAC = (userInfo, modalAddComponent) => ({
  type: wallboardsActions.ADD_WALLBOARD_COMPONENT,
  payload: { user: userInfo, modalAddComponent },
});

export const handleWallboardGridLayoutChangeAC = (gridLayout) => ({
  type: wallboardsActions.WALLBOARD_GRID_LAYOUT_CHANGE,
  payload: gridLayout,
});

export const resetWallboardEditPageDataAC = () => ({
  type: wallboardsActions.RESET_WALLBOARD_EDIT_PAGE_DATA,
});

export const setWallboardIdForDeleteAC = (id) => ({
  type: wallboardsActions.SET_WALLBOARD_ID_FOR_DELETE,
  payload: id,
});

export const deleteWallboardComponentByIdAC = (id) => ({
  type: wallboardsActions.DELETE_WALLBOARD_COMPONENT_BY_ID,
  payload: id,
});

export const wallboardUndoAC = () => ({
  type: wallboardsActions.WALLBOARD_UNDO,
});
export const wallboardRedoAC = () => ({
  type: wallboardsActions.WALLBOARD_REDO,
});

export const applyWallboardSettingsAC = (settings) => ({
  type: wallboardsActions.APPLY_WALLBOARD_SETTINGS,
  payload: settings,
});

export const syncWidgetsSizeForNewScreenAC = (widgets) => ({
  type: wallboardsActions.SYNC_WIDGET_SIZE_FOR_NEW_SCREEN,
  payload: widgets,
});
