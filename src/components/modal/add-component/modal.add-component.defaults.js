import { createArrayFromTo } from '../../../common/utils/generateArray';

export const CALL_QUEUE_OPTIONS = [
  { TEXT: 'Urgent Support Queue', VALUE: 'URGENT' },
  { TEXT: 'Not urgent but somewhat important queue', VALUE: 'NOT_URGENT' },
];

export const SORT_BY_OPTIONS = [
  {
    text: 'Agent Name (Alphabetical)',
    value: 'AGENT_NAME',
  },
  {
    text: 'Availability state (Alphabetical)',
    value: 'AVAILABILITY_STATE',
  },
  {
    text: 'Presence state',
    value: 'PRESENCE_STATE',
  },
  {
    text: 'Time on current call (Most time on the phone first)',
    value: 'TIME_CURRENT_CALL',
  },
  {
    text: 'Time spent in current availability state (Most time in the state first)',
    value: 'TIME_CURRENT_AVAILABILITY_STATE',
  },
  {
    text: 'Total time spent on the phone today (Most time first)',
    value: 'TIME_PHONE_TODAY',
  },
];

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
export const PRESENCE_STATE_KEYS = {
  AGENT_STATUS_INBOUND_CALL_QUEUE: 'onQCall',
  AGENT_STATUS_INBOUND_CALL_OTHER: 'inboundCall',
  AGENT_STATUS_OUTBOUND: 'outboundCall',
  AGENT_STATUS_RINGING: 'ringing',
  AGENT_STATUS_IN_WRAP_UP: 'inWrapUp',
  AGENT_STATUS_IDLE: 'idle',
  AGENT_STATUS_LOGGED_OFF: 'loggedOff',
};

export const PRESENCE_STATE_KEYS_COLOR = {
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
    [PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE]: 'Inbound Call (no queue call)',
    [PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND]: 'Outbound Call',
    [PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF]: 'Logged Off',
  },
};

export const ADD_COMPONENT_STATE_OPTIONS = {
  //in the future it may be needed
  // availabilityStates: [
  //   {
  //     text: "I'm currently available for calls",
  //     value: 'CURRENTLY_AVAILABLE',
  //     isInitialChecked: true,
  //   },
  //   {
  //     text: "I'm busy on calls",
  //     value: 'BUSY_ON_CALLS',
  //     isInitialChecked: true,
  //   },
  //   {
  //     text: 'No calls today please',
  //     value: 'NO_CALLS_TODAY',
  //     isInitialChecked: true,
  //   },
  // ],
  availabilityStates: createArrayFromTo(0, 20).map((el) => ({
    text: `Profile Name ${el - (el % 2)} - State ${el % 4}`,
    value: `P_${el}_S_${el}`,
    isInitialChecked: true,
  })),
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
      value: 'CHANGE_AVAILABILITY_STATE',
      isInitialChecked: true,
    },
    {
      text: 'Can Listen Live to agents',
      value: 'LISTEN_LIVE',
      isInitialChecked: true,
    },
    {
      text: 'Can Call Agents',
      value: 'CALL_AGENTS',
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
    {
      text: 'Number of calls offered',
      value: ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_OFFERED,
      isInitialChecked: false,
    },
    {
      text: 'Number of calls answered',
      value: ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_ANSWERED,
      isInitialChecked: false,
    },
    {
      text: 'Number of calls missed',
      value: ADD_COMPONENT_COLUMN_OPTIONS.NO_CALLS_MISSED,
      isInitialChecked: false,
    },
    {
      text: 'Time spent in current presence state',
      value: ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_PRESENCE,
      isInitialChecked: false,
    },
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
    {
      text: 'Time spent on current wrapup',
      value: ADD_COMPONENT_COLUMN_OPTIONS.TIME_CURRENT_WRAPUP,
      isInitialChecked: false,
    },
    {
      text: 'List of skills the agent possesses',
      value: ADD_COMPONENT_COLUMN_OPTIONS.SKILLS_AGENT_POSSESSES,
      isInitialChecked: false,
    },
  ],
  skillsToView: [...new Array(100)].map((skill, index) => ({
    text: 'Skill ' + index,
    value: `SKILL_${index}`,
    isInitialChecked: true,
  })),
};

export const MAIN_VIEWING_OPTIONS = {
  CARD: 'CARD',
  TABLE: 'TABLE',
};

export const ADD_COMPONENT_COLUMNS_NO_OPTIONS = {
  ONE: '1 Column',
  TWO: '2 Columns',
};
