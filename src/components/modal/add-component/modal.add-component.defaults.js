export const CALL_QUEUE_OPTIONS = [
  { TEXT: 'Urgent Support Queue', VALUE: 'URGENT' },
  { TEXT: 'Not urgent but somewhat important queue', VALUE: 'NOT_URGENT' },
];

export const ADD_COMPONENT_COLUMN_OPTIONS = {
  agentName: 'agentName',
  agentExtNo: 'agentExtNo',
  currAvaiState: 'currAvaiState',
  currPresState: 'currPresState',
  noCallsOffered: 'noCallsOffered',
  noCallsAnswered: 'noCallsAnswered',
  noCallsMissed: 'noCallsMissed',
  timeInCurrentPresenceState: 'timeInCurrentPresenceState',
  timeInCurrentAvailabilityState: 'timeInCurrentAvailabilityState',
  timeInCurrentCall: 'timeInCurrentCall',
  timeInCurrentWrapup: 'timeInCurrentWrapup',
  listOfSkills: 'listOfSkills',
};
export const SORT_BY_OPTIONS = [
  {
    text: 'Agent Name (Alphabetical)',
    value: 0,
  },
  {
    text: 'Availability state (Alphabetical)',
    value: 1,
  },
  {
    text: 'Presence state',
    value: 2,
  },
  {
    text: 'Time on current call (Most time on the phone first)',
    value: 10,
  },
  {
    text: 'Time spent in current availability state (Most time in the state first)',
    value: 11,
  },
  {
    text: 'Total time spent on the phone today (Most time first)',
    value: 12,
  },
];
export const ADD_COMPONENT_STATE_OPTIONS = {
  availabilityStates: [
    {
      text: "I'm currently available for calls",
      value: 0,
      isChecked: true,
    },
    {
      text: "I'm busy on calls",
      value: 1,
      isChecked: true,
    },
    {
      text: 'No calls today please',
      value: 2,
      isChecked: true,
    },
  ],
  presenceStates: [
    {
      text: 'Inbound Call',
      value: 0,
      isChecked: true,
    },
    {
      text: 'Ringing',
      value: 1,
      isChecked: true,
    },
    {
      text: 'In Wrapup',
      value: 2,
      isChecked: true,
    },
    {
      text: 'Inbound Non-Queue Call',
      value: 3,
      isChecked: true,
    },
    {
      text: 'Outbound Call',
      value: 4,
      isChecked: true,
    },
    {
      text: 'Available',
      value: 5,
      isChecked: true,
    },
    {
      text: 'Logged Off',
      value: 6,
      isChecked: true,
    },
  ],

  interactivityOptions: [
    {
      text: 'Can change availability state',
      value: 0,
      isChecked: true,
    },
    {
      text: 'Can Listen Live to agents',
      value: 1,
      isChecked: true,
    },
    {
      text: 'Can Call Agents',
      value: 2,
      isChecked: true,
    },
  ],
  skillsToView: [...new Array(10)].map((skill, index) => ({
    text: 'Skill ' + index,
    value: index,
    isChecked: true,
  })),
};

export const COLUMNS_TO_VIEW_OPTIONS = {
  agentName: {
    text: 'Agent Name',
    isChecked: true,
  },
  agentExtNo: {
    text: 'Agent Extension Number',
    isChecked: false,
  },
  currAvaiState: {
    text: 'Current Availability State',
    isChecked: true,
  },
  currPresState: {
    text: 'Current Presence State',
    isChecked: true,
  },
  noCallsOffered: {
    text: 'Number of calls offered',
    isChecked: false,
  },
  noCallsAnswered: {
    text: 'Number of calls answered',
    isChecked: false,
  },
  noCallsMissed: {
    text: 'Number of calls missed',
    isChecked: false,
  },
  timeInCurrentPresenceState: {
    text: 'Time spent in current presence state',
    isChecked: false,
  },
  timeInCurrentAvailabilityState: {
    text: 'Time spent in current availability state',
    isChecked: false,
  },
  timeInCurrentCall: {
    text: 'Time spent on current call',
    isChecked: true,
  },
  timeInCurrentWrapup: {
    text: 'Time spent on current wrapup',
    isChecked: false,
  },
  listOfSkills: {
    text: 'List of skills the agent possesses',
    isChecked: false,
  },
};

export const MAIN_VIEWING_OPTIONS = {
  CARD: 'CARD',
  TABLE: 'TABLE',
};

export const ADD_COMPONENT_COLUMNS_NO_OPTIONS = {
  ONE: '1 Column',
  TWO: '2 Columns',
};
