import { skillsActions } from '../actions/skills.action';
import { FetchStatus } from './wallboards.reducer';

const initialState = {
  allSkils: [],
  allSkillsFetchStatus: FetchStatus.NULL,
};

export const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case skillsActions.FETCH_ALL_SKILS:
      return {
        ...state,
        allSkillsFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case skillsActions.FETCH_ALL_SKILS_SUCCESS:
      return {
        ...state,
        allSkils: action.payload,
        allSkillsFetchStatus: FetchStatus.SUCCESS,
      };

    case skillsActions.FETCH_ALL_SKILS_FAIL:
      return {
        ...state,
        allSkillsFetchStatus: FetchStatus.FAIL,
      };

    default:
      return state;
  }
};
