import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateSapienApi } from './generateSapienApi';


export const SkilsApi = async props => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      Accept: 'application/json',
    },
  };

  const url = await generateSapienApi();
  const baseUrl = `${url}/${props.organizationId}/skill`;

  switch(props.type) {
    case DEFAULTS.SKILLS.API.GET.ALL_SKILLS:
      options.url = baseUrl;
      break;
    
    default:
      return null;
  }

  const result = await axios(options);
  return result;
}