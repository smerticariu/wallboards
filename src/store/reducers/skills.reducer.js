import { skillsActions } from '../actions/skills.action';
import { FetchStatus } from './wallboards.reducer';

export const skillsInitialState = {
  allSkils: [],
  allSkillsFetchStatus: FetchStatus.NULL,
  agentsSkill: [],
  agentsSkillFetchStatus: FetchStatus.NULL,
};

export const skillsReducer = (state = skillsInitialState, action) => {
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
        agentsSkill: state.agentsSkill.some((skill) => skill.agentId === action.payload.agentId)
          ? state.agentsSkill.map((skill) => (skill.agentId !== action.payload.agentId ? skill : action.payload))
          : [...state.agentsSkill, action.payload],
        agentsSkillFetchStatus: FetchStatus.SUCCESS,
      };

    case skillsActions.FETCH_AGENTS_SKILLS_FAIL:
      return {
        ...state,
        agentsSkillFetchStatus: FetchStatus.FAIL,
      };
    default:
      return state;
  }
};
