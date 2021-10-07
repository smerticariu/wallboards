import {
  ADD_COMPONENT_COLUMNS_NO_OPTIONS,
  ADD_COMPONENT_STATE_OPTIONS,
  CALL_QUEUE_OPTIONS,
  COLUMNS_TO_VIEW_OPTIONS,
  MAIN_VIEWING_OPTIONS,
} from 'src/components/modal/add-component/modal.add-component.defaults';
import { wallboardsActions } from '../actions/wallboards.action';
export const FetchStatus = {
  NULL: null,
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};
const initialState = {
  filterWallboards: [],
  activeModalName: null,
  wallboardPage: {
    wallboard: null,
    fetchStatus: FetchStatus.NULL,
  },
  allWallboards: {
    wallboards: [],
    fetchStatus: FetchStatus.NULL,
  },
  modalSelectComponent: {
    selectedElement: '',
  },
  modalAddComponent: {
    title: '',
    callQueue: CALL_QUEUE_OPTIONS[1].VALUE,
    mainViewing: MAIN_VIEWING_OPTIONS.CARD,
    sortBy: '',
    columns: ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE,
    availabilityStates: {
      selectAll: true,
      selectNone: false,
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.availabilityStates,
    },
    presenceStates: {
      selectAll: true,
      selectNone: false,
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.presenceStates,
    },
    skillsToView: {
      selectAll: true,
      selectNone: false,
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.skillsToView,
    },
    interactivityOptions: {
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.interactivityOptions,
    },
    columnsToViewOptions: {
      selectedItems: {
        ...COLUMNS_TO_VIEW_OPTIONS,
      },
    },
  },
  newWallboardData: {
    title: 'My New Wallboard',
  },
};

export const wallboardsReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
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
        modalAddComponent: {
          ...state.modalAddComponent,
          title: action.payload,
        },
      };
    case wallboardsActions.HANDLE_ADD_MODAL_COMPONENT_FORM_DATA:
      return {
        ...state,
        modalAddComponent: {
          ...state.modalAddComponent,
          ...action.payload,
        },
      };
    case wallboardsActions.RESET_ADD_MODAL_COMPONENT_FORM_DATA:
      return {
        ...state,
        modalAddComponent: { ...initialState.modalAddComponent },
      };
    case wallboardsActions.HANDLE_NEW_WALLBOARD_TITLE:
      return {
        ...state,
        newWallboardData: {
          ...state.newWallboardData,
          title: action.payload,
        },
      };
    case wallboardsActions.FETCH_WALLBOARD_BY_ID:
      return {
        ...state,
        wallboardPage: {
          ...state.wallboardPage,
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    case wallboardsActions.FETCH_WALLBOARD_BY_ID_SUCCESS:
      return {
        ...state,
        wallboardPage: {
          ...state.wallboardPage,
          wallboard: action.payload,
          fetchStatus: FetchStatus.SUCCESS,
        },
      };
    case wallboardsActions.FETCH_WALLBOARD_BY_ID_FAIL:
      return {
        ...state,
        wallboardPage: {
          ...state.wallboardPage,
          wallboard: null,
          fetchStatus: FetchStatus.FAIL,
        },
      };

    case wallboardsActions.FETCH_ALL_WALLBOARDS:
      return {
        ...state,
        allWallboards: {
          ...state.allWallboards,
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    case wallboardsActions.FETCH_ALL_WALLBOARDS_SUCCESS:
      return {
        ...state,
        allWallboards: {
          ...state.allWallboards,
          wallboards: action.payload,
          fetchStatus: FetchStatus.SUCCESS,
        },
      };
    case wallboardsActions.FETCH_ALL_WALLBOARDS_FAIL:
      return {
        ...state,
        allWallboards: {
          ...state.allWallboards,
          wallboards: null,
          fetchStatus: FetchStatus.FAIL,
        },
      };

    default:
      return state;
  }
};
