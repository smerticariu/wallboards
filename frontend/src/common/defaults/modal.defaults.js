export const ADD_COMPONENT_COLUMN_OPTIONS = {
  AGENT_NAME: 'AGENT_NAME',
  AGENT_EXTENSION: 'AGENT_EXTENSION',
  CURRENT_AVAILABILITY: 'CURRENT_AVAILABILITY',
  CURRENT_PRESENCE: 'CURRENT_PRESENCE',
  NO_CALLS_OFFERED: 'NO_CALLS_OFFERED',
  NO_CALLS_ANSWERED: 'NO_CALLS_ANSWERED',
  NO_CALLS_MISSED: 'NO_CALLS_MISSED',
  TIME_CURRENT_PRESENCE: 'TIME_CURRENT_PRESENCE',
  TIME_CURRENT_AVAILABILITY: 'TIME_CURRENT_AVAILABILITY',
  TIME_CURRENT_CALL: 'TIME_CURRENT_CALL',
  TIME_CURRENT_WRAPUP: 'TIME_CURRENT_WRAPUP',
  SKILLS_AGENT_POSSESSES: 'SKILLS_AGENT_POSSESSES',
};
export const SORT_BY_VALUES = {
  AGENT_NAME: 'AGENT_NAME',
  AVAILABILITY_STATE: 'AVAILABILITY_STATE',
  PRESENCE_STATE: 'PRESENCE_STATE',
  TIME_CURRENT_CALL: 'TIME_CURRENT_CALL',
  TIME_CURRENT_AVAILABILITY_STATE: 'TIME_CURRENT_AVAILABILITY_STATE',
  TIME_PHONE_TODAY: 'TIME_PHONE_TODAY',
};
export const PRESENCE_STATE_KEYS = {
  AGENT_STATUS_INBOUND_CALL_QUEUE: 'onQCall',
  AGENT_STATUS_INBOUND_CALL_OTHER: 'inboundCall',
  AGENT_STATUS_BUSY: 'busy',
  AGENT_STATUS_OUTBOUND: 'outboundCall',
  AGENT_STATUS_RINGING: 'ringing',
  AGENT_STATUS_IN_WRAP_UP: 'inWrapUp',
  AGENT_STATUS_IDLE: 'idle',
  AGENT_STATUS_LOGGED_OFF: 'loggedoff',
};
export const CALL_DIRECTIONS = {
  RINGING: 'RINGING',
  INBOUND: 'INBOUND',
  INCOMING: 'INCOMING',
};
export const INTERACTIVITY_OPTIONS_KEYS = {
  CHANGE_AVAILABILITY_STATE: 'CHANGE_AVAILABILITY_STATE',
  LISTEN_LIVE: 'LISTEN_LIVE',
  CALL_AGENTS: 'CALL_AGENTS',
};
export const MODAL_NEW_WALLBOARD_SECITONS = {
  QUEUES: 'QUEUES',
  CALLS: 'CALLS',
  USERS: 'USERS',
};

export const CALL_DIRECTION = {
  INBOUND: 'INBOUND',
  OUTBOUND: 'OUTBOUND',
  INTERNAL: 'INTERNAL',
  INCOMING: 'INCOMING',
  OUTGOING: 'OUTGOING',
  RELAYED: 'RELAYED',
  FEATURE: 'FEATURE',
  UNCATEGORISED: 'UNCATEGORISED',
};
export const MODAL = {
  MODAL_NAMES: {
    SELECT_COMPONENT: 'SELECT_COMPONENT',
    ADD_COMPONENT: 'ADD_COMPONENT',
    SAVE_WALLBOARD: 'SAVE_WALLBOARD',
    CONFIRM_SAVE_WALLBOARD: 'CONFIRM_SAVE_WALLBOARD',
    DELETE_WALLBOARD: 'DELETE_WALLBOARD',
    EDIT_WALLBOARD: 'EDIT_WALLBOARD',
    DELETE_WALLBOARD_COMPONENT: 'DELETE_WALLBOARD_COMPONENT',
    CALL_STATUS: 'CALL_STATUS',
    QUEUE_TRACKING: 'QUEUE_TRACKING',
  },
  NEW_WALLBOARD: {
    SELECT_COMPONENT: 'Select a component',
    CATEGORIES: 'Component Categories',
    SECTIONS: [
      {
        text: 'Queues',
        value: MODAL_NEW_WALLBOARD_SECITONS.QUEUES,
      },
      {
        text: 'Calls',
        value: MODAL_NEW_WALLBOARD_SECITONS.CALLS,
      },
      {
        text: 'Users',
        value: MODAL_NEW_WALLBOARD_SECITONS.USERS,
      },
    ],
  },
  ADD_COMPONENT_OPTIONS: {
    [MODAL_NEW_WALLBOARD_SECITONS.QUEUES]: [
      {
        NAME: 'Agent list',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
      {
        NAME: 'Queue list',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
      {
        NAME: 'Queue tracking',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
      {
        NAME: 'Queue status',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
    ],
    [MODAL_NEW_WALLBOARD_SECITONS.CALLS]: [
      {
        NAME: 'Call status',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
      {
        NAME: 'Call tracking',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
    ],
    [MODAL_NEW_WALLBOARD_SECITONS.USERS]: [
      {
        NAME: 'Agent login',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
      {
        NAME: 'Agent status',
        STATUS: 'Natterbox Admin',
        DATE: '19/03/2021 at 14:19',
        SERVICE: 'Customer Service Calls',
      },
    ],
  },

  ADD_COMPONENT: {
    SECTION_TITLE: {
      SKILLS: 'Select Skills to view',
      AVAILABILITY: 'Select availability states to view',
      TITLE: 'Title/Report Name',
      CALL_QUEUE: 'Call Queue',
      VIEW: 'View',
      COLUMNS: 'Select columns to view',
      SORT_BY: 'Sort by',
      PRESENCE_STATE: 'Presence states to view',
      INTERACTIVITY: 'Interactivity options',
      PREVIEW: 'Preview',
    },
    PLACEHOLDER: {
      SKILL: 'Search by Skill name',
      AVAILABILITY: 'Search by name',
      TITLE: 'Placeholder...',
      SEARCH_LIST: 'Search list…',
    },
    LABEL: {
      SELECT_ALL: 'Select all',
      SELECT_NONE: 'Select none',
    },
    SORT_BY_OPTIONS: [
      {
        text: 'Agent Name (Alphabetical)',
        value: SORT_BY_VALUES.AGENT_NAME,
      },
      {
        text: 'Availability state (Alphabetical)',
        value: SORT_BY_VALUES.AVAILABILITY_STATE,
      },
      {
        text: 'Presence state',
        value: SORT_BY_VALUES.PRESENCE_STATE,
      },
      {
        text: 'Time on current call (Most time on the phone first)',
        value: SORT_BY_VALUES.TIME_CURRENT_CALL,
      },
      {
        text: 'Time spent in current availability state (Most time in the state first)',
        value: SORT_BY_VALUES.TIME_CURRENT_AVAILABILITY_STATE,
      },
      // do not remove
      // {
      //   text: 'Total time spent on the phone today (Most time first)',
      //   value: SORT_BY_VALUES.TIME_PHONE_TODAY,
      // },
    ],
    PRESENCE_STATE_KEYS_COLOR: {
      CARD_BACKGROUND: {
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE]: 'sick-green',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP]: 'aqua',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER]: 'lighter-red',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING]: 'magenta',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE]: 'sun-yellow',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND]: 'orange',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF]: 'grey',
      },
      CARD_AVAILABILITY_STATUS_BACKGROUND: {
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE]: 'green',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP]: 'green',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER]: 'dark-blue',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING]: 'lighter-red',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE]: 'lighter-red',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND]: 'red',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF]: 'grey',
      },
      CARD_AVAILABILITY_STATUS: {
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE]: 'black',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP]: 'black',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER]: 'white',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING]: 'white',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE]: 'white',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND]: 'white',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF]: 'black',
      },
      CARD_TOTAL_TIME: {
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE]: 'black',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP]: 'black',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER]: 'white',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING]: 'white',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE]: 'black',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND]: 'white',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF]: 'black',
      },
      CARD_PRESENCE_STATE_TEXT: {
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE]: 'Available',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP]: 'In Wrap Up',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER]: 'Inbound Call',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING]: 'Ringing',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE]: 'Inbound Call (no queue)',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND]: 'Outbound Call',
        [PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF]: 'Logged Off',
      },
    },
    ADD_COMPONENT_STATE_OPTIONS: {
      presenceStates: [
        {
          text: 'Inbound Call',
          value: PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER,
          isInitialChecked: true,
        },
        {
          text: 'Ringing',
          value: PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING,
          isInitialChecked: true,
        },
        {
          text: 'In Wrapup',
          value: PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP,
          isInitialChecked: true,
        },
        {
          text: 'Inbound Non-Queue Call',
          value: PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE,
          isInitialChecked: true,
        },
        {
          text: 'Outbound Call',
          value: PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND,
          isInitialChecked: true,
        },
        {
          text: 'Available',
          value: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
          isInitialChecked: true,
        },
        {
          text: 'Logged Off',
          value: PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF,
          isInitialChecked: true,
        },
      ],

      interactivityOptions: [
        {
          text: 'Can change availability state',
          value: INTERACTIVITY_OPTIONS_KEYS.CHANGE_AVAILABILITY_STATE,
          isInitialChecked: true,
        },
        {
          text: 'Can Listen Live to agents',
          value: INTERACTIVITY_OPTIONS_KEYS.LISTEN_LIVE,
          isInitialChecked: true,
        },
        {
          text: 'Can Call Agents',
          value: INTERACTIVITY_OPTIONS_KEYS.CALL_AGENTS,
          isInitialChecked: true,
        },
      ],
      columnsToViewOptions: [
        {
          text: 'Agent Name',
          value: ADD_COMPONENT_COLUMN_OPTIONS.AGENT_NAME,
          isInitialChecked: true,
        },
        {
          text: 'Agent Extension Number',
          value: ADD_COMPONENT_COLUMN_OPTIONS.AGENT_EXTENSION,
          isInitialChecked: false,
        },
        {
          text: 'Current Availability State',
          value: ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_AVAILABILITY,
          isInitialChecked: true,
        },
        {
          text: 'Current Presence State',
          value: ADD_COMPONENT_COLUMN_OPTIONS.CURRENT_PRESENCE,
          isInitialChecked: true,
        },
        // do not remove
        // {
        //   text: 'Number of calls offered',
        //   value: ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED,
        //   isInitialChecked: false,
        // },
        // {
        //   text: 'Number of calls answered',
        //   value: ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED,
        //   isInitialChecked: false,
        // },
        // {
        //   text: 'Number of calls missed',
        //   value: ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED,
        //   isInitialChecked: false,
        // },
        // {
        //   text: 'Time spent in current presence state',
        //   value: ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE,
        //   isInitialChecked: false,
        // },
        {
          text: 'Time spent in current availability state',
          value: ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_AVAILABILITY,
          isInitialChecked: false,
        },
        {
          text: 'Time spent on current call',
          value: ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_CALL,
          isInitialChecked: true,
        },

        // do not remove
        // {
        //   text: 'Time spent on current wrapup',
        //   value: ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP,
        //   isInitialChecked: false,
        // },
        {
          text: 'List of skills the agent possesses',
          value: ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES,
          isInitialChecked: false,
        },
      ],
    },
    ADD_COMPONENT_COLUMNS_NO_OPTIONS: {
      ONE: '1 Column',
      TWO: '2 Columns',
    },
    MAIN_VIEWING_OPTIONS: {
      CARD: 'CARD',
      TABLE: 'TABLE',
    },
  },

  QUEUE_TRACKING_COLUMNS: [
    {
      text: 'Total Calls',
      value: 'Total Calls',
      isInitialChecked: true,
    },
    {
      text: 'New Calls Queued',
      value: 'New Calls Queued',
      isInitialChecked: true,
    },
    {
      text: 'Answered Calls',
      value: 'Answered Calls',
      isInitialChecked: true,
    },
    {
      text: 'Caller Abandoned',
      value: 'Caller Abandoned',
      isInitialChecked: true,
    },
    {
      text: 'Caller Timed Out',
      value: 'Caller Timed Out',
      isInitialChecked: true,
    },
    {
      text: 'Caller Exited Queue',
      value: 'Caller Exited Queue',
      isInitialChecked: true,
    },
    {
      text: 'Solid Calls',
      value: 'Solid Calls',
      isInitialChecked: true,
    },
    {
      text: 'Average Talk Time',
      value: 'Average Talk Time',
      isInitialChecked: true,
    },
    {
      text: 'Average Wait',
      value: 'Average Wait',
      isInitialChecked: true,
    },
    {
      text: 'Max Wait',
      value: 'Max Wait',
      isInitialChecked: true,
    },
  ],
  MESSAGES: {
    ALPHANUMERIC_NAME: 'Component name must be alphanumeric',
    ALPHANUMERIC_TITLE: 'Title must be alphanumeric',
    NO_RESULTS: 'No results',
  },
  DELETE_WALLBOARD_MODAL: {
    TITLE: 'Delete Wallboard',
    QUESTION: 'Are you sure you want to delete this wallboard?',
  },
  DELETE_WALLBOARD_COMPONENT_MODAL: {
    QUESTION: 'Are you sure you want to delete this component?',
  },
  EDIT_WALLBOARD: {
    SETTINGS: 'Settings',
    NAME: 'Wallboard Name:',
    DESCRIPTION: 'Wallboard Description:',
    DISPLAY_SETTINGS: 'Display Settings:',
    READ_ONLY_URL: 'Read-Only Wallboard URL',
    READ_ONLY_URL_INFO:
      'A read only Wallboard URL allows anyone to access this wallboard with the basic Chatter Free Salesforce licence. This is great for non-Salesforce users or putting wallboards on a TV',
    COPY: 'Copy Link',
  },
  CONFIRM_SAVE_WALLBOARD: {
    INFO: 'Changes made so far will be lost and this version will be the final version',
  },
  SAVE_WALLBOARD: {
    UNSAVED_CHANGES: 'There are unsaved changes in your',
    LOST_CHANGES: 'If you close the wallboard, these changes are lost.',
    SAVE_AND_CLOSE: `To preserve your changes, click Save & Close`,
  },
  WARNING: {
    TITLE: 'Warning',
  },
  CALL_STATUS: {
    MODAL_TITLE: 'Configuration Options',
    TITLE: 'Title',
    PLACEHOLDER: 'Call Status',
  },
  QUEUE_TRACKING: {
    MODAL_TITLE: 'Widget Options',
    NAMES: {
      TITLE: 'Title',
      QUEUE_TO_MONITOR: 'Call Queue to Monitor'
    },
    PLACEHOLDER: 'Queue Tracking',
  },
};
