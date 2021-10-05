import { wallboardsActions } from "../actions/wallboards.action";
import * as types from "../actionTypes";

const initialState = {
  filterWallboards: [],
  activeModalName: null,
  modalSelectComponent: {
    selectedElement: "",
  },
  newWallboardData: {
    title: "My New Wallboard",
  },
};

export const wallboardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILTERED_WALLBOARDS:
      return {
        ...state,
        filtredWallboards: action.payload,
      };
    case wallboardsActions.HANDLE_WALLBOARD_ACTIVE_MODAL:
      return {
        ...state,
        activeModalName: action.payload,
      };
    case wallboardsActions.HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT:
      return {
        ...state,
        modalSelectComponent: {
          ...state.modalSelectComponent,
          selectedElement: action.payload,
        },
      };
    case types.HANDLE_NEW_WALLBOARD_TITLE:
      return {
        ...state,
        newWallboardData: {
          ...state.newWallboardData,
          title: action.payload,
        },
      };

    default:
      return state;
  }
};
