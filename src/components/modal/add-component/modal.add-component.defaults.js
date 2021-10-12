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

export const ADD_COMPONENT_STATE_OPTIONS = {
  availabilityStates: [
    {
      text: "I'm currently available for calls",
      value: 'CURRENTLY_AVAILABLE',
      isInitialChecked: true,
    },
    {
      text: "I'm busy on calls",
      value: 'BUSY_ON_CALLS',
      isInitialChecked: true,
    },
    {
      text: 'No calls today please',
      value: 'NO_CALLS_TODAY',
      isInitialChecked: true,
    },
  ],
  presenceStates: [
    {
      text: 'Inbound Call',
      value: 'INBOUND_CALL',
      isInitialChecked: true,
    },
    {
      text: 'Ringing',
      value: 'RINGING',
      isInitialChecked: true,
    },
    {
      text: 'In Wrapup',
      value: 'IN_WRAPUP',
      isInitialChecked: true,
    },
    {
      text: 'Inbound Non-Queue Call',
      value: 'INBOUND_NON_QUEUE',
      isInitialChecked: true,
    },
    {
      text: 'Outbound Call',
      value: 'OUTBOUND_CALL',
      isInitialChecked: true,
    },
    {
      text: 'Available',
      value: 'AVAILABLE',
      isInitialChecked: true,
    },
    {
      text: 'Logged Off',
      value: 'LOGGED_OFF',
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
  skillsToView: [...new Array(10)].map((skill, index) => ({
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
