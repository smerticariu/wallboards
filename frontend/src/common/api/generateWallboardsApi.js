import axios from "axios";
import config from '../../config/auth/authConfig';

export const generateWallboardsApi = async () => {
  let wbStoreUrl = ""; 
  await axios.get(`${config.envHost}/flightdeck/config`).then(res => wbStoreUrl = `${res.data.storeUrl}/organisation`);

  return wbStoreUrl;
}