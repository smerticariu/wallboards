import axios from 'axios';
import { DEFAULTS } from '../defaults/defaults';
import { generateWallboardsApi } from './generateWallboardsApi';

export const WallboardsApi = async (props) => {
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.token}`,
      Accept: 'application/json',
    },
  };

  const url = await generateWallboardsApi();
  const baseUrl = `${url}/${props.organizationId}`;
  const wallboarIdUrl = `${baseUrl}/key/${props.wallboardId}`;
  const configUrl = `${baseUrl}/key/config.json`;

  switch (props.type) {
    case DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS_VIA_CONFIG:
      options.url = configUrl;
      break;
    case DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS:
      options.url = baseUrl;
      break;
    case DEFAULTS.WALLBOARDS.API.GET.BY_ID:
      options.url = wallboarIdUrl;
      break;

    case DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD:
      options.method = 'put';
      options.url = wallboarIdUrl;
      options.data = props.data;
      break;
    case DEFAULTS.WALLBOARDS.API.SAVE.CREATE_CONFIG:
      options.method = 'put';
      options.url = configUrl;
      options.data = [];
      break;
    case DEFAULTS.WALLBOARDS.API.SAVE.SYNC_CONFIG:
      options.method = 'put';
      options.url = configUrl;
      options.data = props.data;
      break;

    case DEFAULTS.WALLBOARDS.API.DELETE.WALLBOARD:
      options.method = 'delete';
      options.url = wallboarIdUrl;
      break;

    case DEFAULTS.WALLBOARDS.API.DELETE.ALL_WALLBOARDS:
      options.method = 'delete';
      props.data.data.data.forEach(async (wallboard) => {
        if (wallboard.key === 'config.json') return; // do not config.json file
        options.url = `${baseUrl}/key/${wallboard.key}`;
        await axios(options);
      });
      break;

    default:
      return null;
  }

  const result = await axios(options);
  return result;
};
