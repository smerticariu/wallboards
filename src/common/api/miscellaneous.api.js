import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateSapienApi } from './generateSapienApi';


export const MiscellaneousApi = async props => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  const baseUrl = `${generateSapienApi()}/${props.organizationId}`;

  switch(props.type) {
    case DEFAULTS.MISCELLANEOUS.API.GET.SIP_DEVICE:
      options.url = `${baseUrl}/sip-device`;
      break;
    case DEFAULTS.MISCELLANEOUS.API.GET.USER_GROUPS:
      options.url = `${baseUrl}/user-group`;
    break;
    
    default:
      return null;
  }

  const result = await axios(options);
  return result;
}