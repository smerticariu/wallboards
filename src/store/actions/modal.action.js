export const modalActions = {
  HANDLE_WALLBOARD_ACTIVE_MODAL: 'HANDLE_WALLBOARD_ACTIVE_MODAL',
  HANDLE_IS_NOTIFICATION_SHOW: 'HANDLE_IS_NOTIFICATION_SHOW',
  HANDLE_ADD_MODAL_COMPONENT_FORM_DATA: 'HANDLE_ADD_MODAL_COMPONENT_FORM_DATA',
  RESET_ADD_MODAL_COMPONENT_FORM_DATA: 'RESET_ADD_MODAL_COMPONENT_FORM_DATA',
  HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT: 'HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT',
  SET_WIDGET_FOR_EDIT: 'SET_WIDGET_FOR_EDIT',
  SET_WALLBOARD_COMPONENT_FOR_DELETE: 'SET_WALLBOARD_COMPONENT_FOR_DELETE',
};
export const handleWallboardActiveModalAC = (modalName) => ({
  type: modalActions.HANDLE_WALLBOARD_ACTIVE_MODAL,
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
