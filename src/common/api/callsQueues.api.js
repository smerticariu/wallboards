import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateSapienApi } from './generateSapienApi';

export const CallsQueuesApi = async (props) => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  const baseUrl = `${generateSapienApi()}/${props.organizationId}/call-queue`;

  switch (props.type) {
    case DEFAULTS.CALLS_QUEUES.API.GET.ALL_CALLS_QUEUES:
      options.url = baseUrl;
      break;
    case DEFAULTS.CALLS_QUEUES.API.GET.AGENT_FROM_CALL_QUEUE:
      options.url = `${baseUrl}/${props.callQueueId}/agent`;
      break;

    case DEFAULTS.CALLS_QUEUES.API.GET.CALL_QUEUE:
      options.url = `${baseUrl}/${props.callQueueId}/call`;
      break;
    case DEFAULTS.CALLS_QUEUES.API.GET.CALL_QUEUE_STATISTICS:
      options.url = `${baseUrl}/${props.callQueueId}/statistic?time-start=${encodeURIComponent(
        props.timeStart
      )}&time-end=${encodeURIComponent(props.timeEnd)}`;
      break;

    default:
      return null;
  }

  const result = await axios(options);
  return result;
};
