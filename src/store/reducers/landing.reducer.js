import * as types from "../actionTypes";

const initialState = {
  category: "Most Recent",
  filterWallboards: "",
  wallboardsByCategory: [],
};

export const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LANDING_SELECTED_WALLBOARD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case types.SET_FILTERED_WALLBOARDS:
      return {
        ...state,
        filterWallboards: action.payload,
      };
    case types.SET_WALLBOARDS_BY_CATEGORY:
      return {
        ...state,
        wallboardsByCategory: action.payload,
      };

    default:
      return state;
  }
};
