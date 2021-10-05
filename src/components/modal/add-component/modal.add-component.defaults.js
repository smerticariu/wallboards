export const CALL_QUEUE_OPTIONS = [
  { TEXT: "Urgent Support Queue", VALUE: "URGENT" },
  { TEXT: "Not urgent but somewhat important queue", VALUE: "NOT_URGENT" },
];
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
    text: "Presence state (Will sort in this order)",
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
  },
  {
    text: "Ringing",
    value: 13,
  },
];
export const AVAILABILITY_STATES_OPTIONS = [
  {
    text: "I'm currently available for calls",
    value: 0,
  },
  {
    text: "I'm busy on calls",
    value: 1,
  },
  {
    text: "No calls today please",
    value: 2,
  },
  {
    text: "The section should look like this",
    value: 3,
  },
];

export const PRESENCE_STATES_OPTIONS = [
  {
    text: "Inbound Call",
    value: 0,
  },
  {
    text: "Ringing",
    value: 1,
  },
  {
    text: "In Wrapup",
    value: 2,
  },
  {
    text: "Inbound Non-Queue Call",
    value: 3,
  },
  {
    text: "Outbound Call",
    value: 4,
  },
  {
    text: "Available",
    value: 5,
  },
  {
    text: "Logged Off",
    value: 6,
  },
];
export const INTERACTIVITY_OPTIONS = [
  {
    text: "Can change availability state",
    value: 0,
  },
  {
    text: "Can Listen Live to agents",
    value: 1,
  },
  {
    text: "Can Call Agents",
    value: 2,
  },
];

export const MAIN_VIEWING_OPTIONS = {
  CARD: "CARD",
  TABLE: "TABLE",
};
