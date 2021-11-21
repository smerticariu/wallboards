export const modalActions = {
  HANDLE_ACTIVE_MODAL: 'HANDLE_ACTIVE_MODAL',

  HANDLE_ADD_MODAL_COMPONENT_FORM_DATA: 'HANDLE_ADD_MODAL_COMPONENT_FORM_DATA',
  RESET_ADD_MODAL_COMPONENT_FORM_DATA: 'RESET_ADD_MODAL_COMPONENT_FORM_DATA',

  HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT: 'HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT',

  SET_WIDGET_FOR_EDIT: 'SET_WIDGET_FOR_EDIT',

  SET_WALLBOARD_COMPONENT_FOR_DELETE: 'SET_WALLBOARD_COMPONENT_FOR_DELETE',

  HANDLE_WARNING_MESSAGE: 'HANDLE_WARNING_MESSAGE',

  HANLE_SELECTED_WALLBOARD_SETTINGS: 'HANLE_SELECTED_WALLBOARD_SETTINGS',

  SET_WALLBOARD_SETTINGS: 'SET_WALLBOARD_SETTINGS',

  HANDLE_CALL_STATUS_DATA: 'HANDLE_CALL_STATUS_DATA',

  HANDLE_QUEUE_STATUS_DATA: 'HANDLE_QUEUE_STATUS_DATA',
};
export const handleWallboardActiveModalAC = (modalName) => ({
  type: modalActions.HANDLE_ACTIVE_MODAL,
  payload: modalName,
});
export const handleModalAddComponentFormDataAC = (formData) => ({
  type: modalActions.HANDLE_ADD_MODAL_COMPONENT_FORM_DATA,
  payload: formData,
});
export const resetModalAddComponentFormDataAC = () => ({
  type: modalActions.RESET_ADD_MODAL_COMPONENT_FORM_DATA,
});
export const handleModalSelectActiveElementAC = (elementName) => ({
  type: modalActions.HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT,
  payload: elementName,
});
export const setWidgetComponentForEditAC = (widget) => ({
  type: modalActions.SET_WIDGET_FOR_EDIT,
  payload: widget,
});

export const setWallboardComponentForDeleteAC = (component) => ({
  type: modalActions.SET_WALLBOARD_COMPONENT_FOR_DELETE,
  payload: component,
});

export const handleWarningMessageAC = (message) => ({
  type: modalActions.HANDLE_WARNING_MESSAGE,
  payload: message,
});

export const handleChangeSelectedWallboardSettingsAC = (settings) => ({
  type: modalActions.HANLE_SELECTED_WALLBOARD_SETTINGS,
  payload: settings,
});
export const setSelectedWallboardSettingsAC = (activeWallboard) => ({
  type: modalActions.SET_WALLBOARD_SETTINGS,
  payload: activeWallboard,
});

export const handleCallStatusDataAC = (formData) => ({
  type: modalActions.HANDLE_CALL_STATUS_DATA,
  payload: formData,
});

export const handleQueueStatusDataAC = (formData) => ({
  type: modalActions.HANDLE_QUEUE_STATUS_DATA,
  payload: formData,
});
