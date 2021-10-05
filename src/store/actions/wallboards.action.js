export const wallboardsActions = {
  HANDLE_WALLBOARD_ACTIVE_MODAL: "HANDLE_WALLBOARD_ACTIVE_MODAL",
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
