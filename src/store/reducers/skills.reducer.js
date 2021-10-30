import { skillsActions } from '../actions/skills.action';
import { FetchStatus } from './wallboards.reducer';

const initialState = {
  allSkils: [],
  allSkillsFetchStatus: FetchStatus.NULL,
  agentsSkill: [],
  agentsSkillFetchStatus: FetchStatus.NULL,
};

export const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case skillsActions.FETCH_ALL_SKILLS:
      return {
        ...state,
        allSkillsFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case skillsActions.FETCH_ALL_SKILLS_SUCCESS:
      return {
        ...state,
        allSkils: action.payload,
        allSkillsFetchStatus: FetchStatus.SUCCESS,
      };

    case skillsActions.FETCH_ALL_SKILLS_FAIL:
      return {
        ...state,
        allSkillsFetchStatus: FetchStatus.FAIL,
      };
    case skillsActions.FETCH_AGENTS_SKILLS:
      return {
        ...state,
        agentsSkillFetchStatus: FetchStatus.IN_PROGRESS,
      };

    case skillsActions.FETCH_AGENTS_SKILLS_SUCCESS:
      return {
        ...state,
        agentsSkill: [...state.agentsSkill, action.payload],
        agentsSkillFetchStatus: FetchStatus.SUCCESS,
      };

    case skillsActions.FETCH_AGENTS_SKILLS_FAIL:
      return {
        ...state,
        agentsSkill: [...state.agentsSkill, action.payload],
        agentsSkillFetchStatus: FetchStatus.FAIL,
      };
    default:
      return state;
  }
};
