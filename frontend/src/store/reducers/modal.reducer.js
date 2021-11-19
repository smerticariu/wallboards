import { DEFAULTS } from '../../common/defaults/defaults';

import { modalActions } from '../actions/modal.action';

export const modalInitialState = {
  activeModalName: null,
  warningMessage: '',
  modalSelectComponent: {
    selectedElement: '',
  },
  wallboardComponentForDelete: null,
  modalAddComponent: {
    isEditMode: false,
    id: null,
    title: {
      value: '',
      errorMessage: '',
    },
    callQueue: { id: '', name: '', errorMessage: '' },
    mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.CARD,
    sortBy: { value: DEFAULTS.MODAL.ADD_COMPONENT.SORT_BY_OPTIONS[0].value, errorMessage: '' },
    columns: DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_COLUMNS_NO_OPTIONS.ONE,
    availabilityStates: {
      selectAll: true,
      selectNone: false,
      selectedItems: [],
    },
    presenceStates: {
      selectAll: true,
      selectNone: false,
      selectedItems: DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_STATE_OPTIONS.presenceStates.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
    skillsToView: {
      selectAll: true,
      selectNone: false,
      selectedItems: [],
    },
    interactivityOptions: {
      selectedItems: DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_STATE_OPTIONS.interactivityOptions.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
    columnsToViewOptions: {
      selectedItems: DEFAULTS.MODAL.ADD_COMPONENT.ADD_COMPONENT_STATE_OPTIONS.columnsToViewOptions.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
  },
  wallboardSettings: {
    name: {
      value: '',
      errorMessage: '',
    },
    description: {
      value: '',
      errorMessage: '',
    },
    display: {
      shrinkHeight: false,
      shrinkWidth: false,
    },
    link: {
      isReadOnlyEnabled: false,
    },
  },
  callStatus: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Call Status',
      errorMessage: '',
    },
  },
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case modalActions.HANDLE_ACTIVE_MODAL:
      return {
        ...state,
        activeModalName: action.payload,
      };
    case modalActions.HANDLE_MODAL_SELECT_COMPONENT_ACTIVE_ELEMENT:
      return {
        ...state,
        modalSelectComponent: {
          ...state.modalSelectComponent,
          selectedElement: action.payload,
        },
        modalAddComponent: {
          ...state.modalAddComponent,
          title: { value: action.payload, errorMessage: '' },
        },
      };
    case modalActions.HANDLE_ADD_MODAL_COMPONENT_FORM_DATA:
      return {
        ...state,
        modalAddComponent: {
          ...state.modalAddComponent,
          ...action.payload,
        },
      };
    case modalActions.RESET_ADD_MODAL_COMPONENT_FORM_DATA:
      return {
        ...state,
        modalAddComponent: { ...modalInitialState.modalAddComponent },
      };
    case modalActions.SET_WALLBOARD_COMPONENT_FOR_DELETE:
      return {
        ...state,
        wallboardComponentForDelete: action.payload,
      };
    case modalActions.HANDLE_WARNING_MESSAGE:
      return {
        ...state,
        warningMessage: action.payload,
      };

    case modalActions.SET_WIDGET_FOR_EDIT: {
      const widgetForEdit = action.payload;
      switch (widgetForEdit.type) {
        case DEFAULTS.WALLBOARDS.WIDGET_TYPE.AGENT_LIST: {
          return {
            ...state,
            modalAddComponent: {
              title: {
                value: widgetForEdit.name,
                errorMessage: '',
              },
              callQueue: {
                id: widgetForEdit.callQueue.id,
                name: widgetForEdit.callQueue.name,
                errorMessage: '',
              },
              mainViewing: widgetForEdit.view,
              sortBy: { value: widgetForEdit.sortBy, errorMessage: '' },
              columns: widgetForEdit.columns,
              availabilityStates: widgetForEdit.availabilityStates,
              presenceStates: widgetForEdit.presenceStates,
              skillsToView: widgetForEdit.skills,
              interactivityOptions: widgetForEdit.interactivity,
              columnsToViewOptions: widgetForEdit.columnsToView,
              isEditMode: true,
              size: widgetForEdit.size,
              id: widgetForEdit.id,
            },
          };
        }
        case DEFAULTS.WALLBOARDS.WIDGET_TYPE.CALL_STATUS: {
          return {
            ...state,
            callStatus: {
              title: {
                value: widgetForEdit.title,
                errorMessage: '',
              },

              isEditMode: true,
              size: widgetForEdit.size,
              id: widgetForEdit.id,
            },
          };
        }
        default:
          return state;
      }
    }

    case modalActions.SET_WALLBOARD_SETTINGS: {
      const wallboard = action.payload;
      return {
        ...state,
        wallboardSettings: {
          ...state.wallboardSettings,
          name: {
            value: wallboard.name,
            errorMessage: '',
          },
          description: {
            value: wallboard.description,
            errorMessage: '',
          },
          display: {
            shrinkHeight: wallboard.settings.display.shrinkHeight,
            shrinkWidth: wallboard.settings.display.shrinkWidth,
          },
          link: {
            isReadOnlyEnabled: wallboard.settings.link.isReadOnlyEnabled,
          },
        },
      };
    }

    case modalActions.HANLE_SELECTED_WALLBOARD_SETTINGS: {
      return {
        ...state,
        wallboardSettings: {
          ...state.wallboardSettings,
          ...action.payload,
        },
      };
    }

    case modalActions.HANDLE_CALL_STATUS_DATA: {
      return {
        ...state,
        callStatus: {
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};
