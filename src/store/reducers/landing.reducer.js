import * as types from "../actionTypes";

const initialState = {
  selectedCategory: "Most Recent",
};

export const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LANDING_SELECTED_WALLBOARD_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }

    default:
      return { ...state };
  }
};
