import * as types from "../actionTypes";

const initialState = {
  filtredWallboards: [],
  isAddComponentModalShow: false,
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
    case types.HANDLE_ADD_COMPONENT_MODAL_SHOW_STATUS:
      return {
        ...state,
        isAddComponentModalShow: !state.isAddComponentModalShow,
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
      return initialState;
  }
};
