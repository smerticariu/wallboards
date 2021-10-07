export const wallboardsActions = {
  HANDLE_WALLBOARD_ACTIVE_MODAL: 'HANDLE_WALLBOARD_ACTIVE_MODAL',
  HANDLE_ADD_MODAL_COMPONENT_FORM_DATA: 'HANDLE_ADD_MODAL_COMPONENT_FORM_DATA',
  RESET_ADD_MODAL_COMPONENT_FORM_DATA: 'RESET_ADD_MODAL_COMPONENT_FORM_DATA',
  HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT: 'HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT',
  HANDLE_NEW_WALLBOARD_TITLE: 'HANDLE_NEW_WALLBOARD_TITLE',
  LANDING_SELECTED_WALLBOARD_CATEGORY: 'LANDING_SELECTED_WALLBOARD_CATEGORY',
  SET_FILTERED_WALLBOARDS: 'SET_FILTERED_WALLBOARDS',
  SET_WALLBOARDS_BY_CATEGORY: 'SET_WALLBOARDS_BY_CATEGORY',

  FETCH_WALLBOARD_BY_ID: 'FETCH_WALLBOARD_BY_ID',
  FETCH_WALLBOARD_BY_ID_SUCCESS: 'FETCH_WALLBOARD_BY_ID_SUCCESS',
  FETCH_WALLBOARD_BY_ID_FAIL: 'FETCH_WALLBOARD_BY_ID_FAIL',

  FETCH_ALL_WALLBOARDS: 'FETCH_ALL_WALLBOARDS',
  FETCH_ALL_WALLBOARDS_SUCCESS: 'FETCH_ALL_WALLBOARDS_SUCCESS',
  FETCH_ALL_WALLBOARDS_FAIL: 'FETCH_ALL_WALLBOARDS_FAIL',
};

export const handleWallboardActiveModalAC = (modalName) => ({
  type: wallboardsActions.HANDLE_WALLBOARD_ACTIVE_MODAL,
  payload: modalName,
});

export const handleNewWallboardTitleAC = (title) => ({
  type: wallboardsActions.HANDLE_NEW_WALLBOARD_TITLE,
  payload: title,
});

export const handleModalSelectActiveElementAC = (elementName) => ({
  type: wallboardsActions.HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT,
  payload: elementName,
});
export const handleModalAddComponentFormDataAC = (formData) => ({
  type: wallboardsActions.HANDLE_ADD_MODAL_COMPONENT_FORM_DATA,
  payload: formData,
});
export const resetModalAddComponentFormDataAC = (formData) => ({
  type: wallboardsActions.RESET_ADD_MODAL_COMPONENT_FORM_DATA,
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

export const fetchWallboardByIdAC = () => ({
  type: wallboardsActions.FETCH_WALLBOARD_BY_ID,
});
export const fetchWallboardByIdSuccessAC = (wallboard) => ({
  type: wallboardsActions.FETCH_WALLBOARD_BY_ID_SUCCESS,
  payload: wallboard,
});
export const fetchWallboardByIdFailAC = (errorMEssage) => ({
  type: wallboardsActions.FETCH_WALLBOARD_BY_ID_FAIL,
  payload: errorMEssage,
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
