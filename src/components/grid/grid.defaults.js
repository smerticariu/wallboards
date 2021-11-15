import { PRESENCE_STATE_KEYS } from '../modal/add-component/modal.add-component.defaults';

export const INITIAL_CELLS_NUMBER = 120;
export const CELLS_NUMBER_REMOVE = 216;
export const CELLS_NUMBER_ADD = 24;
export const CELL_HEIGHT = 29;
export const CELLS_ON_ROW = 12;
export const RESIZE_GRID_COLUMNS = 24;
export const GRID_MODIFIER = 200;
export const WIDGET_INITIAL_HEIGHT = 400;
export const WIDGET_MARGIN_TOP = 10;
export const MAX_NAME_CHARACTERS = 18;
export const AGENTS_TABLE = [
  {
    callStatusKey: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
    agentName: 'Megan Carter',
    agentExtNo: '0000',
    currAvaiState: 'Busy on calls',
    currPresState: 'Inbound Call',
    noCallsOffered: '0',
    noCallsAnswered: '0',
    noCallsMissed: '0',
    timeInCurrentPresenceState: 0,
    timeInCurrentAvailabilityState: 0,
    timeInCurrentCall: 0,
    timeInCurrentWrapup: 0,
    listOfSkills: ['Skill'],
  },
  {
    callStatusKey: PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE,
    agentName: 'Megan Carter2',
    agentExtNo: '0000',
    currAvaiState: 'Busy on calls',
    currPresState: 'Inbound Call',
    noCallsOffered: '0',
    noCallsAnswered: '0',
    noCallsMissed: '0',
    timeInCurrentPresenceState: 0,
    timeInCurrentAvailabilityState: 0,
    timeInCurrentCall: 0,
    timeInCurrentWrapup: 0,
    listOfSkills: ['Skill'],
  },
];
