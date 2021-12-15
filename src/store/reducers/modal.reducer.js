import { DEFAULTS } from '../../common/defaults/defaults';
import { WIDGET_TYPE } from '../../common/defaults/modal.defaults';
import { getCurrentTimezone } from '../../common/utils/getCurrentTimezone';

import { modalActions } from '../actions/modal.action';

export const modalInitialState = {
  activeModalName: null,
  warningMessage: '',
  wallboardComponentForDelete: null,
  agentList: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Agent List',
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
  wallboardGroupSettings: {
    name: {
      value: '',
      errorMessage: '',
    },
    description: {
      value: '',
      errorMessage: '',
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
  queueTracking: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Queue Tracking',
      errorMessage: '',
    },
    callQueue: {
      id: '',
      value: '',
    },
    timeZone: getCurrentTimezone(),
    period: {
      id: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].value,
    },
    startOfWeek: {
      id: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].value,
    },
    columnsToViewOptions: {
      errorMessage: '',
      selectedItems: DEFAULTS.MODAL.QUEUE_TRACKING_COLUMNS.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
    },
    abandonedCallSLA: {
      value: 4,
      isChecked: false,
      errorMessage: '',
    },
    averageWaitSLA: {
      value: '00:01:00',
      isChecked: false,
      errorMessage: '',
    },
    totalCallsSLA: {
      value: '00:02:00',
      isChecked: false,
      errorMessage: '',
    },
    //do not remove
    // solidCallsOverride: {
    //   value: '00:02:00',
    //   isChecked: false,
    //   errorMessage: '',
    // },
  },
  queueStatus: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Queue Status',
      errorMessage: '',
    },
    callQueue: {
      id: '',
      value: '',
      errorMessage: '',
    },
  },
  callTracking: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Call Tracking',
      errorMessage: '',
    },
    group: {
      id: DEFAULTS.MODAL.CALL_TRACKING.USER_GROUP.id,
      value: DEFAULTS.MODAL.CALL_TRACKING.USER_GROUP.name,
    },
    callQueue: {
      id: '',
      value: '',
    },
    callCategory: {
      id: DEFAULTS.MODAL.CALL_TRACKING.CALL_CATEGORY[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.CALL_CATEGORY[0].value,
    },
    timeZone: getCurrentTimezone(),
    period: {
      id: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].value,
    },
    startOfWeek: {
      id: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].value,
    },
  },

  agentLogin: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Agent Login',
      errorMessage: '',
    },
    group: {
      id: DEFAULTS.MODAL.CALL_TRACKING.USER_GROUP.id,
      value: DEFAULTS.MODAL.CALL_TRACKING.USER_GROUP.name,
    },
    limitResult: {
      value: 10,
      errorMessage: '',
    },
    timeZone: getCurrentTimezone(),
    period: {
      id: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].value,
    },
    from: {
      value: '',
      errorMessage: '',
    },
    to: {
      value: '',
      errorMessage: '',
    },
    startOfWeek: {
      id: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].value,
    },
  },
  agentStatus: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Agent Status',
      errorMessage: '',
    },
    profile: {
      id: DEFAULTS.MODAL.CALL_TRACKING.USER_PROFILE.id,
      value: DEFAULTS.MODAL.CALL_TRACKING.USER_PROFILE.name,
    },
    limitResult: {
      value: 10,
      errorMessage: '',
    },
    timeZone: getCurrentTimezone(),
    period: {
      id: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.PERIOD[0].value,
    },
    isShowStateName: true,
    isShowDisplayName: true,
    from: {
      value: '',
      errorMessage: '',
    },
    to: {
      value: '',
      errorMessage: '',
    },
    startOfWeek: {
      id: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].id,
      value: DEFAULTS.MODAL.CALL_TRACKING.START_WEEK[0].value,
    },
  },
  queueList: {
    isEditMode: false,
    id: null,
    title: {
      value: 'Queue List',
      errorMessage: '',
    },
    callQueue: {
      id: '',
      value: '',
    },
    isCallStatusConnected: true,
    isCallStatusWaiting: true,

    timeInQueueSLATime: {
      value: 30,
      errorMessage: '',
    },
    timeAtHeadOfQueueSLATime: {
      value: 30,
      errorMessage: '',
    },
    columnsToViewOptions: {
      errorMessage: '',
      selectedItems: DEFAULTS.MODAL.QUEUE_LIST.COLUMNS.reduce((strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr), []),
    },
    sortBy: { value: DEFAULTS.MODAL.QUEUE_LIST.SORT_BY[0].value, errorMessage: '' },
    isShowOnlyOnHover: false,
    isShowShortageOnlyOnHover: false,
    interactivityOptions: {
      selectedItems: DEFAULTS.MODAL.QUEUE_LIST.INTERACTIVIRY_OPTIONS.reduce(
        (strArr, el) => (el.isInitialChecked ? [...strArr, el.value] : strArr),
        []
      ),
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
    case modalActions.HANDLE_ADD_MODAL_COMPONENT_FORM_DATA:
      return {
        ...state,
        agentList: {
          ...state.agentList,
          ...action.payload,
        },
      };
    case modalActions.RESET_ADD_MODAL_COMPONENT_FORM_DATA:
      return {
        ...state,
        agentList: { ...modalInitialState.agentList },
        callStatus: { ...modalInitialState.callStatus },
        callTracking: { ...modalInitialState.callTracking },
        queueStatus: { ...modalInitialState.queueStatus },
        queueTracking: { ...modalInitialState.queueTracking },
        agentLogin: { ...modalInitialState.agentLogin },
        queueList: { ...modalInitialState.queueList },
        agentStatus: { ...modalInitialState.agentStatus },
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
        case WIDGET_TYPE.AGENT_LIST: {
          return {
            ...state,
            agentList: {
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
        case WIDGET_TYPE.CALL_STATUS: {
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

        case WIDGET_TYPE.QUEUE_STATUS: {
          return {
            ...state,
            queueStatus: {
              title: {
                value: widgetForEdit.title,
                errorMessage: '',
              },
              callQueue: {
                value: widgetForEdit.callQueue.value,
                id: widgetForEdit.callQueue.id,
                errorMessage: '',
              },
              isEditMode: true,
              size: widgetForEdit.size,
              id: widgetForEdit.id,
            },
          };
        }
        case WIDGET_TYPE.QUEUE_TRACKING: {
          return {
            ...state,
            queueTracking: {
              title: {
                value: widgetForEdit.title,
                errorMessage: '',
              },
              callQueue: {
                id: widgetForEdit.callQueue.id,
                value: widgetForEdit.callQueue.value,
              },

              timeZone: {
                id: widgetForEdit.timeZone.id,
                value: widgetForEdit.timeZone.value,
              },
              period: {
                id: widgetForEdit.period.id,
                value: widgetForEdit.period.value,
              },
              startOfWeek: {
                id: widgetForEdit.startOfWeek.id,
                value: widgetForEdit.startOfWeek.value,
              },
              columnsToViewOptions: {
                selectedItems: [...widgetForEdit.columnsToViewOptions.selectedItems],
                errorMessage: '',
              },
              abandonedCallSLA: {
                value: widgetForEdit.abandonedCallSLA.value,
                isChecked: widgetForEdit.abandonedCallSLA.isChecked,
                errorMessage: '',
              },
              averageWaitSLA: {
                value: widgetForEdit.averageWaitSLA.value,
                isChecked: widgetForEdit.averageWaitSLA.isChecked,
              },
              totalCallsSLA: {
                value: widgetForEdit.totalCallsSLA.value,
                isChecked: widgetForEdit.totalCallsSLA.isChecked,
              },
              //do not remove
              // solidCallsOverride: {
              //   value: widgetForEdit.solidCallsOverride.value,
              //   isChecked: widgetForEdit.solidCallsOverride.isChecked,
              // },
              isEditMode: true,
              size: widgetForEdit.size,
              id: widgetForEdit.id,
            },
          };
        }
        case WIDGET_TYPE.CALL_TRACKING: {
          return {
            ...state,
            callTracking: {
              title: {
                value: widgetForEdit.title,
                errorMessage: '',
              },
              group: {
                id: widgetForEdit.group.id,
                value: widgetForEdit.group.value,
              },
              callQueue: {
                id: widgetForEdit.callQueue.id,
                value: widgetForEdit.callQueue.value,
              },
              callCategory: {
                id: widgetForEdit.callCategory.id,
                value: widgetForEdit.callCategory.value,
              },
              timeZone: {
                id: widgetForEdit.timeZone.id,
                value: widgetForEdit.timeZone.value,
              },
              period: {
                id: widgetForEdit.period.id,
                value: widgetForEdit.period.value,
              },
              startOfWeek: {
                id: widgetForEdit.startOfWeek.id,
                value: widgetForEdit.startOfWeek.value,
              },
              isEditMode: true,
              size: widgetForEdit.size,
              id: widgetForEdit.id,
            },
          };
        }
        case WIDGET_TYPE.AGENT_LOGIN: {
          return {
            ...state,
            agentLogin: {
              title: {
                value: widgetForEdit.title,
                errorMessage: '',
              },
              group: {
                id: widgetForEdit.group.id,
                value: widgetForEdit.group.value,
              },
              limitResult: {
                value: widgetForEdit.limitResult.value,
                errorMessage: '',
              },
              timeZone: {
                id: widgetForEdit.timeZone.id,
                value: widgetForEdit.timeZone.value,
              },
              period: {
                id: widgetForEdit.period.id,
                value: widgetForEdit.period.value,
              },
              from: {
                value: widgetForEdit.from.value,
                errorMessage: '',
              },
              to: {
                value: widgetForEdit.to.value,
                errorMessage: '',
              },
              startOfWeek: {
                id: widgetForEdit.startOfWeek.id,
                value: widgetForEdit.startOfWeek.value,
              },
              isEditMode: true,
              size: widgetForEdit.size,
              id: widgetForEdit.id,
            },
          };
        }
        case WIDGET_TYPE.AGENT_STATUS: {
          return {
            ...state,
            agentStatus: {
              title: {
                value: widgetForEdit.title,
                errorMessage: '',
              },
              profile: {
                id: widgetForEdit.profile.id,
                value: widgetForEdit.profile.value,
              },
              limitResult: {
                value: widgetForEdit.limitResult.value,
                errorMessage: '',
              },
              timeZone: {
                id: widgetForEdit.timeZone.id,
                value: widgetForEdit.timeZone.value,
              },
              period: {
                id: widgetForEdit.period.id,
                value: widgetForEdit.period.value,
              },
              isShowStateName: widgetForEdit.isShowStateName,
              isShowDisplayName: widgetForEdit.isShowDisplayName,
              from: {
                value: widgetForEdit.from.value,
                errorMessage: '',
              },
              to: {
                value: widgetForEdit.to.value,
                errorMessage: '',
              },
              startOfWeek: {
                id: widgetForEdit.startOfWeek.id,
                value: widgetForEdit.startOfWeek.value,
              },
              isEditMode: true,
              size: widgetForEdit.size,
              id: widgetForEdit.id,
            },
          };
        }
        case WIDGET_TYPE.QUEUE_LIST: {
          return {
            ...state,
            queueList: {
              title: {
                value: widgetForEdit.title,
                errorMessage: '',
              },
              callQueue: {
                id: widgetForEdit.callQueue.id,
                value: widgetForEdit.callQueue.value,
              },
              isCallStatusConnected: widgetForEdit.isCallStatusConnected,
              isCallStatusWaiting: widgetForEdit.isCallStatusWaiting,

              timeInQueueSLATime: {
                value: widgetForEdit.timeInQueueSLATime,
                errorMessage: '',
              },
              timeAtHeadOfQueueSLATime: {
                value: widgetForEdit.timeAtHeadOfQueueSLATime,
                errorMessage: '',
              },
              columnsToViewOptions: widgetForEdit.columnsToViewOptions,
              sortBy: {
                value: widgetForEdit.sortBy,
              },
              isShowOnlyOnHover: widgetForEdit.isShowOnlyOnHover,
              isShowShortageOnlyOnHover: widgetForEdit.isShowShortageOnlyOnHover,
              interactivityOptions: widgetForEdit.interactivityOptions,

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
    case modalActions.SET_WALLBOARD_GROUP_SETTINGS: {
      const wallboard = action.payload;
      return {
        ...state,
        wallboardGroupSettings: {
          ...state.wallboardGroupSettings,
          name: {
            value: wallboard.name,
            errorMessage: '',
          },
          description: {
            value: wallboard.description,
            errorMessage: '',
          },
          link: {
            isReadOnlyEnabled: wallboard.settings.link.isReadOnlyEnabled,
          },
        },
      };
    }

    case modalActions.HANLE_WALLBOARD_SETTINGS: {
      return {
        ...state,
        wallboardSettings: {
          ...state.wallboardSettings,
          ...action.payload,
        },
      };
    }
    case modalActions.HANLE_WALLBOARD_GROUP_SETTINGS: {
      return {
        ...state,
        wallboardGroupSettings: {
          ...state.wallboardGroupSettings,
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
    case modalActions.HANDLE_QUEUE_STATUS_DATA: {
      return {
        ...state,
        queueStatus: {
          ...action.payload,
        },
      };
    }
    case modalActions.HANDLE_CALL_TRACKING_DATA: {
      return {
        ...state,
        callTracking: {
          ...state.callTracking,
          ...action.payload,
        },
      };
    }
    case modalActions.HANDLE_AGENT_LOGIN_DATA: {
      return {
        ...state,
        agentLogin: {
          ...state.agentLogin,
          ...action.payload,
        },
      };
    }
    case modalActions.HANDLE_AGENT_STATUS_DATA: {
      return {
        ...state,
        agentStatus: {
          ...state.agentStatus,
          ...action.payload,
        },
      };
    }
    case modalActions.HANDLE_QUEUE_TRACKING_DATA:
      return {
        ...state,
        queueTracking: {
          ...state.queueTracking,
          ...action.payload,
        },
      };
    case modalActions.HANDLE_QUEUE_LIST_DATA:
      return {
        ...state,
        queueList: {
          ...state.queueList,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
