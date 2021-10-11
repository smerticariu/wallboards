import axios from 'axios';
import {
  fetchAllWallboardsAC,
  fetchAllWallboardsFailAC,
  fetchAllWallboardsSuccessAC,
  fetchWallboardByIdAC,
  fetchWallboardByIdFailAC,
  fetchWallboardByIdSuccessAC,
} from '../actions/wallboards.action';

export const fetchWallboardByIdThunk = (wallboardId, orgId, token) => async (dispatch, getState) => {
  try {
    dispatch(fetchWallboardByIdAC());

    const options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${orgId}/key/${wallboardId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json'
      }
    }

    const response = await axios(options);

    dispatch(fetchWallboardByIdSuccessAC(response.data));
  } catch (error) {
    dispatch(fetchWallboardByIdFailAC());
    console.log(error);
  }
};

export const fetchAllWallboardsThunk = (orgId, token) => async (dispatch, getState) => {
  try {
    dispatch(fetchAllWallboardsAC());

    const options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${orgId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json'
      }
    }

    const response = await axios(options);

    dispatch(fetchAllWallboardsSuccessAC(response.data));
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    console.log(error);
  }
};
