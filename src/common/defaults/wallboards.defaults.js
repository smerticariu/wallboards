import { QUEUE_TRACKING_COLUMN_OPTIONS } from './modal.defaults';

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
    NAME_WARNING: 'Wallboard name must contain only alphanumeric characters',
    NO_COMPONENTS: 'This wallboard has no components.',
    ADD_COMPONENTS: 'To start adding components, click the button below.',
    NOT_ALLOWED_EDIT: 'You are not allowed to edit this wallboard. Please contact your Administrator',
    NOT_ALLOWED_VIEW: "You don't have acces s to this wallboard! Please contact your Administrator.",
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
};

export const getQueueStatusInitialValues = () => ({
  availableAgents: { title: 'Available Agents', value: 0, color: '#b8c62a' },
  busyAgents: { title: 'Busy Agents', value: 0, color: '#f8485e' },
  wrappedUpAgents: { title: 'Wrapped Up Agents', value: 0, color: '#e87722' },
  loggedOffAgents: { title: 'Logged Off Agents', value: 0, color: '#49535c' },
  totalAgents: { title: 'Total Agents', value: 0, color: '#00a9ce' },
  totalCallsQueueing: { title: 'Total Calls Queueing', value: 0, color: '#00a9ce' },
  longestTimeInQueue: { title: 'Longest Time in Queue', value: '00:00:00', color: '#00a9ce' },
  mostDialAttempts: { title: 'Most Dial Attempts', value: 0, color: '#00a9ce' },
});
export const getCallsInitialValues = () => ({
  inbound: { value: 0, prevalue: 0 },
  outbound: { value: 0, prevalue: 0 },
  internal: { value: 0 },
  relayed: { value: 0 },
  feature: { value: 0 },
  uncategorised: { value: 0 },
});

export const getCallTrackingInitialValues = () => ({
  outbound: {
    outboundUnConnectedCallCount: {
      name: 'Un-Answered Calls',
      value: 0,
      operator: 'sum',
      field: ['outboundUnansweredCallCount', 'outboundAnsweredCallCount'],
    },
    outboundConnectedCallCount: { name: 'Answered Calls', value: 0, operator: 'sum', field: 'outboundConnectedCallCount' },
    outboundSolidCallCount: { name: 'Solid Calls', value: 0, operator: 'sum', field: 'outboundSolidCallCount' },
    outboundTotalTalkTime: { name: 'Total Talk', value: 0, operator: 'sum', field: 'outboundTotalTalkTime', format: 'duration' },
    outboundAverageTalkTime: {
      name: 'Average Talk',
      value: [],
      operator: 'average',
      field: 'outboundAverageTalkTime',
      format: 'duration',
    },
  },
  inbound: {
    inboundUnansweredCallCount: { name: 'Un-Connected Calls', value: 0, operator: 'sum', field: 'inboundUnansweredCallCount' },
    inboundAnsweredCallCount: { name: 'Connected Calls', value: 0, operator: 'sum', field: 'inboundAnsweredCallCount' },
    inboundConnectedCallCount: { name: 'Answered Calls', value: 0, operator: 'sum', field: 'inboundConnectedCallCount' },
    inboundSolidCallCount: { name: 'Solid Calls', value: 0, operator: 'sum', field: 'inboundSolidCallCount' },
    inboundTotalTalkTime: { name: 'Total Talk', value: 0, operator: 'sum', field: 'inboundTotalTalkTime', format: 'duration' },
    inboundTotalWaitTime: { name: 'Total Wait', value: 0, operator: 'sum', field: 'inboundTotalWaitTime', format: 'duration' },
    inboundAverageTalkTime: {
      name: 'Average Talk',
      value: [],
      operator: 'average',
      field: 'inboundAverageTalkTime',
      format: 'duration',
    },
    inboundAverageWaitTime: {
      name: 'Average Wait',
      value: [],
      operator: 'average',
      field: 'inboundAverageWaitTime',
      format: 'duration',
    },
  },
  originated: {
    originatedConnectedCallCount: { name: 'Answered Calls', value: 0, operator: 'sum', field: 'originatedConnectedCallCount' },
    originatedSolidCallCount: { name: 'Solid Calls', value: 0, operator: 'sum', field: 'originatedSolidCallCount' },
    originatedTotalTalkTime: { name: 'Total Talk', value: 0, operator: 'sum', field: 'originatedTotalTalkTime', format: 'duration' },
    originatedAverageTalkTime: {
      name: 'Average Talk',
      value: [],
      operator: 'average',
      field: 'originatedAverageTalkTime',
      format: 'duration',
    },
  },
  received: {
    receivedConnectedCallCount: { name: 'Answered Calls', value: 0, operator: 'sum', field: 'receivedConnectedCallCount' },
    receivedSolidCallCount: { name: 'Solid Calls', value: 0, operator: 'sum', field: 'receivedSolidCallCount' },
    receivedTotalTalkTime: { name: 'Total Talk', value: 0, operator: 'sum', field: 'receivedTotalTalkTime', format: 'duration' },
    receivedAverageTalkTime: {
      name: 'Average Talk',
      value: [],
      operator: 'average',
      field: 'receivedAverageTalkTime',
      format: 'duration',
    },
  },
  service: {
    serviceConnectedCallCount: { name: 'Answered Calls', value: 0, operator: 'sum', field: 'serviceConnectedCallCount' },
    serviceTotalTalkTime: { name: 'Total Talk', value: 0, operator: 'sum', field: 'serviceTotalTalkTime', format: 'duration' },
    serviceAverageTalkTime: {
      name: 'Average Talk',
      value: [],
      operator: 'average',
      field: 'serviceAverageTalkTime',
      format: 'duration',
    },
  },
});
export const getQueueTrackingInitialValues = () => ({
  totalCallCount: { id: QUEUE_TRACKING_COLUMN_OPTIONS.TOTAL_CALLS, name: 'Total Calls', value: 0 },
  newCallCount: { id: QUEUE_TRACKING_COLUMN_OPTIONS.NEW_CALLS_QUEUED, name: 'New Calls Queued', value: 0 },
  answeredCallCount: {
    id: QUEUE_TRACKING_COLUMN_OPTIONS.ANSWERED_CALLS,
    name: 'Answered Calls',
    value: 0,
    percent: {
      value: 0,
    },
  },
  hungUpCallCount: {
    id: QUEUE_TRACKING_COLUMN_OPTIONS.CALLER_ABANDONATED,
    name: 'Abandoned Calls',
    value: 0,
    isRed: false,
    percent: { value: 0 },
  },
  timedOutCallCount: {
    id: QUEUE_TRACKING_COLUMN_OPTIONS.CALLER_TIME_OUT,
    name: 'Caller Timed Out',
    value: 0,

    percent: { value: 0 },
  },
  abortedCallCount: {
    id: QUEUE_TRACKING_COLUMN_OPTIONS.CALLER_EXITED_QUEUED,
    name: 'Caller Exited Queue',
    value: 0,

    percent: { value: 0 },
  },
  solidCallCount: {
    id: QUEUE_TRACKING_COLUMN_OPTIONS.SOLID_CALLS,
    name: 'Solid Calls',
    isRed: false,
    value: 0,
    percent: { value: 0 },
  },
  averageTalkTime: {
    id: QUEUE_TRACKING_COLUMN_OPTIONS.AVARAGE_TALK_TIME,
    name: 'Average Talk Time',
    value: [],
    operator: 'average',
    format: 'duration',
  },
  averageWaitTime: {
    id: QUEUE_TRACKING_COLUMN_OPTIONS.AVERAGE_WAIT,
    name: 'Average Wait',
    isRed: false,
    value: [],
    operator: 'averages',

    format: 'duration',
  },
  maxWaitTime: { id: QUEUE_TRACKING_COLUMN_OPTIONS.MAX_WAIT, name: 'Max Wait', value: [], format: 'duration' },
});
export const getQueueTrackingUtilityFields = () => ({
  totalTalkTime: { id: 'totalTalkTime', name: '', value: 0 },
  answeredCallTotalWaitTime: { id: 'answeredCallTotalWaitTime', name: '', value: 0 },
  hungUpCallTotalWaitTime: { id: 'hungUpCallTotalWaitTime', name: '', value: 0 },
  timedOutCallTotalWaitTime: { id: 'timedOutCallTotalWaitTime', name: '', value: 0 },
  abortedCallTotalWaitTime: { id: 'abortedCallTotalWaitTime', name: '', value: 0 },
});
