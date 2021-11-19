export const WALLBOARDS = {
  NOTIFICATION: {
    SUCCESS: {
      DELETE: 'The wallboard was successfully deleted',
      SAVE: 'The Wallboard was successfully saved',
    },
    FAIL: {
      DELETE: 'The Wallboard was not deleted',
    },
  },
  MESSAGE: {
    LOADING: 'Wallboard loading...',
    NAME_WARNING: 'Wallboar name must contain only alphanumeric characters',
    NO_COMPONENTS: 'This wallboard has no components.',
    ADD_COMPONENTS: 'To start adding components, click the button below.',
    NOT_ALLOWED_EDIT: 'You are not allowed to edit this wallboard. Please contact your Administrator',
    NOT_ALLOWED_VIEW: "You don't have access to this wallboard! Please contact your Administrator.",
  },
  PLACEHOLDER: {
    SEARCH_WALLBOARDS: 'Search Wallboards...',
  },
  API: {
    GET: {
      ALL_WALLBOARDS_VIA_CONFIG: 'all wallboards via config',
      BY_ID: 'by id',
      ALL_WALLBOARDS: 'all wallboards',
    },
    SAVE: {
      WALLBOARD: 'save wallboard',
      SYNC_CONFIG: 'sync config',
      CREATE_CONFIG: 'create config file',
    },
    DELETE: {
      WALLBOARD: 'delete wallboard',
      ALL_WALLBOARDS: 'delete all wallboards',
    },
  },
  WIDGET_TYPE: {
    AGENT_LIST: 'AGENT_LIST',
    CALL_STATUS: 'CALL_STATUS',
  },
};
