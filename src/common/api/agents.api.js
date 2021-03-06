import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateSapienApi } from './generateSapienApi';


export const AgentsApi = async props => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  const baseUrl = `${generateSapienApi()}/${props.organizationId}/user`;
  const userInfoUrl = `${generateSapienApi(true)}/user/me`;

  switch(props.type) {
    case DEFAULTS.AGENTS.API.GET.ALL_AGENTS:
      options.url = baseUrl;
      break;
    case DEFAULTS.AGENTS.API.GET.BY_ID:
      options.url = `${baseUrl}/${props.agentId}`;
      break;
    case DEFAULTS.AGENTS.API.GET.AGENT_SKILLS:
      options.url = `${baseUrl}/${props.agentId}/skill`;
    break;
    case DEFAULTS.AGENTS.API.GET.AGENT_INFO:
      options.url = userInfoUrl;
    break;

    case DEFAULTS.AGENTS.API.SAVE.AGENT:
      options.method = 'patch'
      options.data = props.data;
      options.url = `${baseUrl}/${props.agentId}`;
      break;
    
    default:
      return null;
  }

  const result = await axios(options);
  return result;
}