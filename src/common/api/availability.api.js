import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateSapienApi } from './generateSapienApi';

export const AvailabilityApi = async (props) => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    },
  };

  const url = await generateSapienApi();

  const baseUrl = `${url}/${props.organizationId}/availability`;

  switch (props.type) {
    case DEFAULTS.AVAILABILITY.API.GET.PROFILES:
      options.url = `${baseUrl}/profile`;
      break;
    case DEFAULTS.AVAILABILITY.API.GET.STATES:
      options.url = `${baseUrl}/profile/${props.availabilityId}/state`;
      break;

    case DEFAULTS.AVAILABILITY.API.GET.HISTORY:
      options.url = `${baseUrl}/history?min-time=${encodeURIComponent(props.timeStart)}&max-time=${encodeURIComponent(
        props.timeEnd
      )}&_limit=${props.limitResult}${Number(props.profileId) === -1 ? '' : '&availability-profile-id=' + props.profileId}`;
      break;

    default:
      return null;
  }

  const result = await axios(options);
  return result;
};
