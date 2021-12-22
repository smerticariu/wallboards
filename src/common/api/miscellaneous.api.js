import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';

export const MiscellaneousApi = async (props) => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      Accept: 'application/json',
    },
  };

  const baseUrl = `${props.sapienUrl}/v1/organisation/${props.organizationId}`;

  switch (props.type) {
    case DEFAULTS.MISCELLANEOUS.API.GET.SIP_DEVICE:
      options.url = `${baseUrl}/sip-device`;
      break;
    case DEFAULTS.MISCELLANEOUS.API.GET.USER_GROUPS:
      options.url = `${baseUrl}/user-group`;
      break;
    case DEFAULTS.MISCELLANEOUS.API.GET.USER_LOGIN_DATA:
      options.url = `${baseUrl}/user-group/event?time-start=${encodeURIComponent(props.timeStart)}&time-end=${encodeURIComponent(
        props.timeEnd
      )}${Number(props.groupId) === -1 ? '' : '&group=' + props.groupId}`;
      break;

    default:
      return null;
  }

  const result = await axios(options);
  return result;
};
