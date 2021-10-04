import * as types from "../actionTypes";

const initialState = {
  selectedSection: "Most Recent",
};

export const landingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LANDING_SELECTED_WALLBOARD_CATEGORY:
      return action.payload;

    default:
      return initialState;
  }
};
