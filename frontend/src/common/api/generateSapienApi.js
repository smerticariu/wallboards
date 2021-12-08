import axios from "axios";
import config from '../../config/auth/authConfig';

export const generateSapienApi = async orgPath => {
  let sapienUrl = ""; 
  await axios.get(`${config.envHost}/flightdeck/config`).then(res => {
    if(orgPath) {
      sapienUrl = `${res.data.sapienUrl}/v1/organisation`;
    } else {
      sapienUrl = `${res.data.sapienUrl}/v1`;
    }
  });
  return sapienUrl;
}