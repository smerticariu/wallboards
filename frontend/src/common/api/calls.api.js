import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateSapienApi } from './generateSapienApi';

export const CallsApi = async (props) => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  const baseUrl = `${generateSapienApi()}/${props.organizationId}/call`;

  switch (props.type) {
    case DEFAULTS.CALLS.API.SAVE.CALL_AGENT:
      options.method = 'post';
      options.data = props.data;
      options.url = `${baseUrl}/channel`;
      break;
    case DEFAULTS.CALLS.API.SAVE.LISTEN_LIVE:
      options.method = 'post';
      options.data = props.data;
      options.url = `${baseUrl}/channel`;
      break;

    case DEFAULTS.CALLS.API.GET.CALLS:
      options.method = 'get';
      options.url = baseUrl;
      break;

    default:
      return null;
  }

  const result = await axios(options);
  return result;
};
