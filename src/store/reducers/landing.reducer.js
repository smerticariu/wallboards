import { wallboardsActions } from '../actions/wallboards.action';

export const landingInitialState = {
  category: 'Wallboards',
  searchedWallboards: '',
  wallboardsByCategory: [],
};

export const landingReducer = (state = landingInitialState, action) => {
  switch (action.type) {
    case wallboardsActions.LANDING_SELECTED_WALLBOARD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case wallboardsActions.SET_FILTERED_WALLBOARDS:
      return {
        ...state,
        searchedWallboards: action.payload,
      };
    case wallboardsActions.SET_WALLBOARDS_BY_CATEGORY:
      return {
        ...state,
        wallboardsByCategory: action.payload,
      };

    default:
      return state;
  }
};
