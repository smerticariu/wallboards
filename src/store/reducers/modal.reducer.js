import { modalActions } from '../actions/modal.action';
import {
  ADD_COMPONENT_COLUMNS_NO_OPTIONS,
  ADD_COMPONENT_STATE_OPTIONS,
  CALL_QUEUE_OPTIONS,
  MAIN_VIEWING_OPTIONS,
  SORT_BY_OPTIONS,
} from 'src/components/modal/add-component/modal.add-component.defaults';
const initialState = {
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
    callQueue: { value: CALL_QUEUE_OPTIONS[1].VALUE, errorMessage: '' },
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

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case modalActions.HANDLE_WALLBOARD_ACTIVE_MODAL:
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
        modalAddComponent: { ...initialState.modalAddComponent },
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
      return {
        ...state,
        modalAddComponent: {
          title: { value: widgetForEdit.name, errorMessage: '' },
          callQueue: { value: widgetForEdit.queue, errorMessage: '' },
          mainViewing: widgetForEdit.view,
          sortBy: widgetForEdit.sortBy,
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
    default:
      return state;
  }
};
