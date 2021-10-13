import { generateWallboardWidgetId } from 'src/common/utils/generateId';
import {
  ADD_COMPONENT_COLUMNS_NO_OPTIONS,
  ADD_COMPONENT_STATE_OPTIONS,
  CALL_QUEUE_OPTIONS,
  MAIN_VIEWING_OPTIONS,
  SORT_BY_OPTIONS,
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
  activeWallboard: {
    wallboardInitialValues: {
      name: 'My New Wallboard',
    },
    wallboard: {
      name: 'My New Wallboard',
    },
    fetchStatus: FetchStatus.NULL,
    saveStatus: FetchStatus.NULL,
  },
  allWallboards: {
    wallboards: [],
    fetchStatus: FetchStatus.NULL,
  },
  modalSelectComponent: {
    selectedElement: '',
  },
  modalAddComponent: {
    isEditMode: false,
    id: null,
    title: '',
    callQueue: CALL_QUEUE_OPTIONS[1].VALUE,
    mainViewing: MAIN_VIEWING_OPTIONS.CARD,
    sortBy: SORT_BY_OPTIONS[0].text,
    columns: ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE,
    availabilityStates: {
      selectAll: true,
      selectNone: false,
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.availabilityStates.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
    presenceStates: {
      selectAll: true,
      selectNone: false,
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.presenceStates.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
    skillsToView: {
      selectAll: true,
      selectNone: false,
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.skillsToView.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
    interactivityOptions: {
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.interactivityOptions.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
    columnsToViewOptions: {
      selectedItems: ADD_COMPONENT_STATE_OPTIONS.columnsToViewOptions.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
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
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            name: action.payload,
          },
        },
      };
    case wallboardsActions.FETCH_WALLBOARD_BY_ID:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          fetchStatus: FetchStatus.IN_PROGRESS,
        },
      };
    case wallboardsActions.FETCH_WALLBOARD_BY_ID_SUCCESS:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: action.payload,
          wallboardInitialValues: action.payload,
          fetchStatus: FetchStatus.SUCCESS,
        },
      };
    case wallboardsActions.FETCH_WALLBOARD_BY_ID_FAIL:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: [],
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
          wallboards: [],
          fetchStatus: FetchStatus.FAIL,
        },
      };

    case wallboardsActions.SAVE_WALLBOARD:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          saveStatus: FetchStatus.IN_PROGRESS,
        },
      };
    case wallboardsActions.SAVE_WALLBOARD_SUCCESS:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: action.payload,
          wallboardInitialValues: action.payload,
          saveStatus: FetchStatus.SUCCESS,
        },
      };
    case wallboardsActions.SAVE_WALLBOARD_FAIL:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          saveStatus: FetchStatus.FAIL,
        },
      };
    case wallboardsActions.SAVE_WALLBOARD_RESET_STATUS:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          saveStatus: FetchStatus.NULL,
        },
      };

    case wallboardsActions.CHANGE_WALLBOARD_COMPONENTS_ORDER:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: [...action.payload],
          },
        },
      };

    case wallboardsActions.ADD_WALLBOARD_COMPONENT: {
      const { widgets } = state.activeWallboard.wallboard;
      const newWidget = {
        name: state.modalAddComponent.title,
        queue: state.modalAddComponent.callQueue,
        view: state.modalAddComponent.mainViewing,
        sortBy: state.modalAddComponent.sortBy,
        availabilityStates: state.modalAddComponent.availabilityStates,
        presenceStates: state.modalAddComponent.presenceStates,
        interactivity: state.modalAddComponent.interactivityOptions,
        columnsToView: state.modalAddComponent.columnsToViewOptions,
        skills: state.modalAddComponent.skillsToView,
        columns: state.modalAddComponent.columns,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: state.modalAddComponent.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== state.modalAddComponent.id
                    ? widget
                    : {
                        ...newWidget,
                        id: state.modalAddComponent.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(action.payload.organisationId, action.payload) }],
          },
        },
      };
    }

    case wallboardsActions.SET_WIDGET_SIZE: {
      const { widgets } = state.activeWallboard.wallboard;
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: widgets.map((widget) =>
              widget.id === action.payload.widgetId
                ? {
                    ...widget,
                    size: action.payload.size,
                  }
                : widget
            ),
          },
        },
      };
    }

    case wallboardsActions.SET_WIDGET_FOR_EDIT: {
      const widgetForEdit = state.activeWallboard.wallboard.widgets.find((widget) => widget.id === action.payload);
      return {
        ...state,
        modalAddComponent: {
          title: widgetForEdit.name,
          callQueue: widgetForEdit.queue,
          mainViewing: widgetForEdit.view,
          sortBy: widgetForEdit.sortBy,
          columns: widgetForEdit.columns,
          availabilityStates: widgetForEdit.availabilityStates,
          presenceStates: widgetForEdit.presenceStates,
          skillsToView: widgetForEdit.skills,
          interactivityOptions: widgetForEdit.interactivity,
          columnsToViewOptions: widgetForEdit.columnsToView,
          isEditMode: true,
          id: widgetForEdit.id,
        },
      };
    }
    default:
      return state;
  }
};
