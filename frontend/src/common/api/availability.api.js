import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateSapienApi } from './generateSapienApi';


export const AvailabilityApi = async props => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  const baseUrl = `${generateSapienApi()}/${props.organizationId}/availability`;

  switch(props.type) {
    case DEFAULTS.AVAILABILITY.API.GET.PROFILES:
      options.url = `${baseUrl}/profile`;
      break;
    case DEFAULTS.AVAILABILITY.API.GET.STATES:
      options.url = `${baseUrl}/profile/${props.availabilityId}/state`;
      break;
    
    default:
      return null;
  }

  const result = await axios(options);
  return result;
}