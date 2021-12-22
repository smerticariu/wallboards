import { PRESENCE_STATE_KEYS } from '../defaults/modal.defaults';

export const findAgentStatus = (agentQueue, usersOnCall, devicesOnCall) => {
  let agentStatus = agentQueue.status;
  switch (agentQueue.status.toLowerCase()) {
    case PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF:
      agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_LOGGED_OFF;
      break;
    case PRESENCE_STATE_KEYS.AGENT_STATUS_BUSY:
      agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_QUEUE;
      //try to detect RINGING state
      if (agentQueue.userId != null) {
        if (usersOnCall[agentQueue.userId]?.state === 'RINGING') {
          agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
        }
        break;
      }
      //try to find the device in the active calls
      if (agentQueue.deviceId != null) {
        if (devicesOnCall[agentQueue.deviceId]?.state === 'RINGING') {
          agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
        }
        break;
      }
      break;
    case PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE:
      //try to find the user in the active calls
      if (agentQueue.userId != null) {
        if (usersOnCall[agentQueue.userId]) {
          agentStatus =
            ['INBOUND', 'INCOMING'].indexOf(usersOnCall[agentQueue.userId].logicalDirection) !== -1
              ? PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER
              : PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND;
          agentQueue.answerTime = usersOnCall[agentQueue.userId].answerTime;

          if (usersOnCall[agentQueue.userId].state === 'RINGING') {
            agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
          }
          break;
        }
      }
      // try to find the device in the active calls
      if (agentQueue.deviceId != null) {
        if (devicesOnCall[agentQueue.deviceId]) {
          agentStatus =
            ['INBOUND', 'INCOMING'].indexOf(devicesOnCall[agentQueue.deviceId].logicalDirection) !== -1
              ? PRESENCE_STATE_KEYS.AGENT_STATUS_INBOUND_CALL_OTHER
              : PRESENCE_STATE_KEYS.AGENT_STATUS_OUTBOUND;
          agentQueue.answerTime = devicesOnCall[agentQueue.deviceId].answerTime;
          if (devicesOnCall[agentQueue.deviceId].state === 'RINGING') {
            agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_RINGING;
          }
          break;
        }
      }
      //check is agent is inWrapUp
      if (agentQueue.inWrapUp === true) {
        agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_IN_WRAP_UP;
        break;
      }
      break;
    default:
      agentStatus = PRESENCE_STATE_KEYS.AGENT_STATUS_IDLE;
  }
  return agentStatus;
};
