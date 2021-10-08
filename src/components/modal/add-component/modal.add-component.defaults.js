export const CALL_QUEUE_OPTIONS = [
  { TEXT: "Urgent Support Queue", VALUE: "URGENT" },
  { TEXT: "Not urgent but somewhat important queue", VALUE: "NOT_URGENT" },
];

export const ADD_COMPONENT_COLUMN_OPTIONS = {
  agentName: "agentName",
  agentExtNo: "agentExtNo",
  currAvaiState: "currAvaiState",
  currPresState: "currPresState",
  noCallsOffered: "noCallsOffered",
  noCallsAnswered: "noCallsAnswered",
  noCallsMissed: "noCallsMissed",
  timeInCurrentPresenceState: "timeInCurrentPresenceState",
  timeInCurrentAvailabilityState: "timeInCurrentAvailabilityState",
  timeInCurrentCall: "timeInCurrentCall",
  timeInCurrentWrapup: "timeInCurrentWrapup",
  listOfSkills: "listOfSkills",
};
export const SORT_BY_OPTIONS = [
  {
    text: "Agent Name (Alphabetical)",
    value: 0,
  },
  {
    text: "Availability state (Alphabetical)",
    value: 1,
  },
  {
    text: "Presence state",
    value: 2,
  },
  {
    text: "Inbound Call",
    value: 3,
  },
  {
    text: "Ringing",
    value: 4,
  },
  {
    text: "In Wrapup",
    value: 5,
  },
  {
    text: "Inbound Non-Queue Call",
    value: 6,
  },
  {
    text: "Outbound Call",
    value: 7,
  },
  {
    text: "Available",
    value: 8,
  },
  {
    text: "Logged Off",
    value: 9,
  },
  {
    text: "Time on current call (Most time on the phone first)",
    value: 10,
  },
  {
    text: "Time spent in current availability state (Most time in the state first)",
    value: 11,
  },
  {
    text: "Total time spent on the phone today (Most time first)",
    value: 12,
  }
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
      text: "No calls today please",
      value: 2,
      isChecked: true,
    }
  ],
  presenceStates: [
    {
      text: "Inbound Call",
      value: 0,
      isChecked: true,
    },
    {
      text: "Ringing",
      value: 1,
      isChecked: true,
    },
    {
      text: "In Wrapup",
      value: 2,
      isChecked: true,
    },
    {
      text: "Inbound Non-Queue Call",
      value: 3,
      isChecked: true,
    },
    {
      text: "Outbound Call",
      value: 4,
      isChecked: true,
    },
    {
      text: "Available",
      value: 5,
      isChecked: true,
    },
    {
      text: "Logged Off",
      value: 6,
      isChecked: true,
    },
  ],

  interactivityOptions: [
    {
      text: "Can change availability state",
      value: 0,
      isChecked: true,
    },
    {
      text: "Can Listen Live to agents",
      value: 1,
      isChecked: true,
    },
    {
      text: "Can Call Agents",
      value: 2,
      isChecked: true,
    },
  ],

  columnsToViewOptions: [
    {
      text: "Agent Name",
      value: ADD_COMPONENT_COLUMN_OPTIONS.agentName,
      isChecked: true,
    },
    {
      text: "Agent Extension Number",
      value: ADD_COMPONENT_COLUMN_OPTIONS.agentExtNo,
      isChecked: false,
    },
    {
      text: "Current Availability State",
      value: ADD_COMPONENT_COLUMN_OPTIONS.currAvaiState,
      isChecked: true,
    },
    {
      text: "Current Presence State",
      value: ADD_COMPONENT_COLUMN_OPTIONS.currPresState,
      isChecked: true,
    },
    {
      text: "Number of calls offered",
      value: ADD_COMPONENT_COLUMN_OPTIONS.noCallsOffered,
      isChecked: false,
    },
    {
      text: "Number of calls answered",
      value: ADD_COMPONENT_COLUMN_OPTIONS.noCallsAnswered,
      isChecked: false,
    },
    {
      text: "Number of calls missed",
      value: ADD_COMPONENT_COLUMN_OPTIONS.noCallsMissed,
      isChecked: false,
    },
    {
      text: "Time spent in current presence state",
      value: ADD_COMPONENT_COLUMN_OPTIONS.timeInCurrentPresenceState,
      isChecked: false,
    },
    {
      text: "Time spent in current availability state",
      value: ADD_COMPONENT_COLUMN_OPTIONS.timeInCurrentAvailabilityState,
      isChecked: false,
    },
    {
      text: "Time spent on current call",
      value: ADD_COMPONENT_COLUMN_OPTIONS.timeInCurrentCall,
      isChecked: true,
    },
    {
      text: "Time spent on current wrapup",
      value: ADD_COMPONENT_COLUMN_OPTIONS.timeInCurrentWrapup,
      isChecked: false,
    },
    {
      text: "List of skills the agent possesses",
      value: ADD_COMPONENT_COLUMN_OPTIONS.listOfSkills,
      isChecked: false,
    },
  ],
  skillsToView: [...new Array(10)].map((skill, i) => ({
    text: "Skill " + i,
    value: i,
    isChecked: true,
  })),
};

export const MAIN_VIEWING_OPTIONS = {
  CARD: "CARD",
  TABLE: "TABLE",
};

export const ADD_COMPONENT_COLUMNS_OPTIONS = {
  ONE: "1 Column",
  TWO: "2 Columns",
};
