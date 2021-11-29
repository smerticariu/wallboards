import { WIDGET_TYPE } from '../../common/defaults/modal.defaults';
import { generateWallboardWidgetId } from '../../common/utils/generateId';

import { wallboardsActions } from '../actions/wallboards.action';
export const FetchStatus = {
  NULL: null,
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

const wallboardInitialValues = {
  name: 'My New Wallboard',
  id: null,
  description: 'New Wallboard Description',
  widgets: [],
  settings: {
    display: {
      shrinkHeight: false,
      shrinkWidth: false,
    },
    link: {
      isReadOnlyEnabled: false,
    },
  },
  isNewWallboard: null,
};
export const wallboardsInitialState = {
  wallboardIdForDelete: null,
  searchedWallboards: [],
  activeWallboard: {
    wallboardInitialValues: wallboardInitialValues,
    wallboard: wallboardInitialValues,
    fetchStatus: FetchStatus.NULL,
    fetchMessage: '',
    statusCode: '',
    saveStatus: FetchStatus.NULL,
  },
  allWallboards: {
    wallboards: [],
    fetchStatus: FetchStatus.NULL,
  },
};

export const wallboardsReducer = (state = { ...wallboardsInitialState }, action) => {
  switch (action.type) {
    case wallboardsActions.FETCH_WALLBOARD_BY_ID:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          fetchStatus: FetchStatus.IN_PROGRESS,
          fetchMessage: action.payload,
          statusCode: '',
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
          statusCode: '',
        },
      };
    case wallboardsActions.FETCH_WALLBOARD_BY_ID_FAIL:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: { ...wallboardInitialValues },
          fetchStatus: FetchStatus.FAIL,
          fetchMessage: action.payload.errorMEssage,
          statusCode: action.payload.statusCode,
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

    case wallboardsActions.CREATE_LOCAL_NEW_EMPTY_WALLBOARD:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: { ...wallboardsInitialState.activeWallboard.wallboard, id: action.payload, isNewWallboard: true },
          saveStatus: FetchStatus.SUCCESS,
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
          fetchStatus: FetchStatus.SUCCESS,
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

    case wallboardsActions.ADD_WALLBOARD_AGENT_LIST: {
      const { widgets } = state.activeWallboard.wallboard;
      const { agentList, userInfo } = action.payload;

      const newWidget = {
        name: agentList.title.value,
        callQueue: {
          id: agentList.callQueue.id,
          name: agentList.callQueue.name,
        },
        view: agentList.mainViewing,
        sortBy: agentList.sortBy.value,
        availabilityStates: agentList.availabilityStates,
        presenceStates: agentList.presenceStates,
        interactivity: agentList.interactivityOptions,
        columnsToView: agentList.columnsToViewOptions,
        skills: agentList.skillsToView,
        columns: agentList.columns,
        size: agentList.isEditMode ? agentList.size : null,
        type: WIDGET_TYPE.AGENT_LIST,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: agentList.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== agentList.id
                    ? widget
                    : {
                        ...newWidget,
                        id: agentList.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(userInfo.organisationId, userInfo.id) }],
          },
        },
      };
    }

    case wallboardsActions.ADD_WALLBOARD_CALL_STATUS: {
      const { widgets } = state.activeWallboard.wallboard;
      const { callStatus, userInfo } = action.payload;
      const newWidget = {
        title: callStatus.title.value,
        type: WIDGET_TYPE.CALL_STATUS,
        size: callStatus.isEditMode ? callStatus.size : null,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: callStatus.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== callStatus.id
                    ? widget
                    : {
                        ...newWidget,
                        id: callStatus.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(userInfo.organisationId, userInfo.id) }],
          },
        },
      };
    }

    case wallboardsActions.ADD_WALLBOARD_QUEUE_STATUS: {
      const { widgets } = state.activeWallboard.wallboard;
      const { queueStatus, userInfo } = action.payload;
      const newWidget = {
        title: queueStatus.title.value,
        callQueue: {
          id: queueStatus.callQueue.id,
          value: queueStatus.callQueue.value,
        },
        type: WIDGET_TYPE.QUEUE_STATUS,
        size: queueStatus.isEditMode ? queueStatus.size : null,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: queueStatus.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== queueStatus.id
                    ? widget
                    : {
                        ...newWidget,
                        id: queueStatus.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(userInfo.organisationId, userInfo.id) }],
          },
        },
      };
    }
    case wallboardsActions.ADD_WALLBOARD_QUEUE_TRACKING: {
      const { widgets } = state.activeWallboard.wallboard;
      const { queueTracking, userInfo } = action.payload;
      const newWidget = {
        title: queueTracking.title.value,
        type: WIDGET_TYPE.QUEUE_TRACKING,
        callQueue: {
          id: queueTracking.callQueue.id,
          value: queueTracking.callQueue.value,
        },
        timeZone: {
          id: +queueTracking.timeZone.id,
          value: queueTracking.timeZone.value,
        },
        period: {
          id: queueTracking.period.id,
          value: queueTracking.period.value,
        },
        startOfWeek: {
          id: +queueTracking.startOfWeek.id,
          value: queueTracking.startOfWeek.value,
        },
        columnsToViewOptions: {
          selectedItems: [...queueTracking.columnsToViewOptions.selectedItems],
        },
        abandonedCallSLA: {
          value: queueTracking.abandonedCallSLA.value,
          isChecked: queueTracking.abandonedCallSLA.isChecked,
        },
        averageWaitSLA: {
          value: queueTracking.averageWaitSLA.value,
          isChecked: queueTracking.averageWaitSLA.isChecked,
        },
        totalCallsSLA: {
          value: queueTracking.totalCallsSLA.value,
          isChecked: queueTracking.totalCallsSLA.isChecked,
        },
        solidCallsOverride: {
          value: queueTracking.solidCallsOverride.value,
          isChecked: queueTracking.solidCallsOverride.isChecked,
        },
        size: queueTracking.isEditMode ? queueTracking.size : null,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: queueTracking.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== queueTracking.id
                    ? widget
                    : {
                        ...newWidget,
                        id: queueTracking.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(userInfo.organisationId, userInfo.id) }],
          },
        },
      };
    }

    case wallboardsActions.ADD_WALLBOARD_QUEUE_LIST: {
      const { widgets } = state.activeWallboard.wallboard;
      const { queueList, userInfo } = action.payload;
      const newWidget = {
        title: queueList.title.value,
        type: WIDGET_TYPE.QUEUE_LIST,
        callQueue: {
          id: queueList.callQueue.id,
          value: queueList.callQueue.value,
        },
        isCallStatusConnected: queueList.isCallStatusConnected,
        isCallStatusWaiting: queueList.isCallStatusWaiting,
        columnsToViewOptions: {
          selectedItems: [...queueList.columnsToViewOptions.selectedItems],
        },
        interactivityOptions: {
          selectedItems: [...queueList.interactivityOptions.selectedItems],
        },
        timeInQueueSLATime: queueList.timeInQueueSLATime.value,
        timeAtHeadOfQueueSLATime: queueList.timeAtHeadOfQueueSLATime.value,
        sortBy: queueList.sortBy.value,
        isShowOnlyOnHover: queueList.isShowOnlyOnHover,
        isShowShortageOnlyOnHover: queueList.isShowShortageOnlyOnHover,
        interactivity: queueList.interactivityOptions,
        size: queueList.isEditMode ? queueList.size : null,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: queueList.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== queueList.id
                    ? widget
                    : {
                        ...newWidget,
                        id: queueList.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(userInfo.organisationId, userInfo.id) }],
          },
        },
      };
    }

    case wallboardsActions.ADD_WALLBOARD_CALL_TRACKING: {
      const { widgets } = state.activeWallboard.wallboard;
      const { callTracking, userInfo } = action.payload;
      const newWidget = {
        title: callTracking.title.value,
        group: {
          id: +callTracking.group.id,
          value: callTracking.group.value,
        },
        callQueue: {
          id: callTracking.callQueue.id,
          value: callTracking.callQueue.value,
        },
        callCategory: {
          id: callTracking.callCategory.id,
          value: callTracking.callCategory.value,
        },
        timeZone: {
          id: +callTracking.timeZone.id,
          value: callTracking.timeZone.value,
        },
        period: {
          id: callTracking.period.id,
          value: callTracking.period.value,
        },
        startOfWeek: {
          id: +callTracking.startOfWeek.id,
          value: callTracking.startOfWeek.value,
        },
        type: WIDGET_TYPE.CALL_TRACKING,
        size: callTracking.isEditMode ? callTracking.size : null,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: callTracking.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== callTracking.id
                    ? widget
                    : {
                        ...newWidget,
                        id: callTracking.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(userInfo.organisationId, userInfo.id) }],
          },
        },
      };
    }
    case wallboardsActions.ADD_WALLBOARD_AGENT_LOGIN: {
      const { widgets } = state.activeWallboard.wallboard;
      const { agentLogin, userInfo } = action.payload;
      const newWidget = {
        title: agentLogin.title.value,
        group: {
          id: +agentLogin.group.id,
          value: agentLogin.group.value,
        },
        limitResult: {
          value: +agentLogin.limitResult.value,
        },
        timeZone: {
          id: +agentLogin.timeZone.id,
          value: agentLogin.timeZone.value,
        },
        period: {
          id: agentLogin.period.id,
          value: agentLogin.period.value,
        },
        from: {
          value: agentLogin.from.value,
        },
        to: {
          value: agentLogin.to.value,
        },
        startOfWeek: {
          id: +agentLogin.startOfWeek.id,
          value: agentLogin.startOfWeek.value,
        },
        type: WIDGET_TYPE.AGENT_LOGIN,
        size: agentLogin.isEditMode ? agentLogin.size : null,
      };
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: agentLogin.isEditMode
              ? widgets.map((widget) =>
                  widget.id !== agentLogin.id
                    ? widget
                    : {
                        ...newWidget,
                        id: agentLogin.id,
                      }
                )
              : [...widgets, { ...newWidget, id: generateWallboardWidgetId(userInfo.organisationId, userInfo.id) }],
          },
        },
      };
    }
    case wallboardsActions.DELETE_WALLBOARD_COMPONENT_BY_ID: {
      const { widgets } = state.activeWallboard.wallboard;

      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            widgets: widgets.filter((widget) => widget.id !== action.payload),
          },
        },
      };
    }

    case wallboardsActions.WALLBOARD_GRID_LAYOUT_CHANGE: {
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
    }
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

    case wallboardsActions.HANDLE_SELECTED_WALLBOARD_DESCRIPTION:
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            description: action.payload,
          },
        },
      };
    case wallboardsActions.APPLY_WALLBOARD_SETTINGS:
      const settings = action.payload;
      return {
        ...state,
        activeWallboard: {
          ...state.activeWallboard,
          wallboard: {
            ...state.activeWallboard.wallboard,
            description: settings.description.value,
            name: settings.name.value,
            settings: {
              display: settings.display,
              link: settings.link,
            },
          },
        },
      };

    case wallboardsActions.RESET_WALLBOARD_EDIT_PAGE_DATA: {
      return {
        ...state,
        activeWallboard: {
          ...wallboardsInitialState.activeWallboard,
        },
      };
    }

    case wallboardsActions.SET_WALLBOARD_ID_FOR_DELETE: {
      return {
        ...state,
        wallboardIdForDelete: action.payload,
      };
    }
    case wallboardsActions.SYNC_WIDGET_SIZE_FOR_NEW_SCREEN: {
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
    }

    default:
      return state;
  }
};
