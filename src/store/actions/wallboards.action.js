export const wallboardsActions = {
  HANDLE_WALLBOARD_ACTIVE_MODAL: "HANDLE_WALLBOARD_ACTIVE_MODAL",
  HANDLE_ADD_MODAL_COMPONENT_FORM_DATA: "HANDLE_ADD_MODAL_COMPONENT_FORM_DATA",
  RESET_ADD_MODAL_COMPONENT_FORM_DATA: "RESET_ADD_MODAL_COMPONENT_FORM_DATA",
  HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT:
    "HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT",
};

export const handleWallboardActiveModalAC = (modalName) => ({
  type: wallboardsActions.HANDLE_WALLBOARD_ACTIVE_MODAL,
  payload: modalName,
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
