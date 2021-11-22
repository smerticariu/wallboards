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
    QUEUE_STATUS: 'QUEUE_STATUS',
    CALL_TRACKING: 'CALL_TRACKING',
    QUEUE_LIST: 'QUEUE_LIST',
    QUEUE_TRACKING: 'QUEUE_TRACKING',
    AGENT_LOGIN: 'AGENT_LOGIN',
    AGENT_STATUS: 'AGENT_STATUS',
  },
};
export const getQueueStatusInitialValues = () => ({
  available_agents: { title: 'Available Agents', value: 0, color: '#b8c62a' },
  busy_agents: { title: 'Busy Agents', value: 0, color: '#f8485e' },
  wrapped_up_agents: { title: 'Wrapped Up Agents', value: 0, color: '#e87722' },
  logged_off_agents: { title: 'Logged Off Agents', value: 0, color: '#49535c' },
  total_agents: { title: 'Total Agents', value: 0, color: '#00a9ce' },
  total_calls_queueing: { title: 'Total Calls Queueing', value: 0, color: '#00a9ce' },
  longest_time_in_queue: { title: 'Longest Time in Queue', value: '00:00:00', color: '#00a9ce' },
  most_dial_attempts: { title: 'Most Dial Attempts', value: 0, color: '#00a9ce' },
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
