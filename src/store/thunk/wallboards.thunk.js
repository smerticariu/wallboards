import axios from 'axios';
import {
  fetchAllWallboardsAC,
  fetchAllWallboardsFailAC,
  fetchAllWallboardsSuccessAC,
  fetchWallboardByIdAC,
  fetchWallboardByIdFailAC,
  fetchWallboardByIdSuccessAC,
} from '../actions/wallboards.action';

export const fetchWallboardByIdThunk = ({wbId, orgId, token}) => async (dispatch, getState) => {
  try {
    dispatch(fetchWallboardByIdAC());

    const options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${orgId}/key/${wbId}`,
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

export const fetchAllWallboardsThunk = ({orgId, token}) => async (dispatch, getState) => {
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

export const deleteWallboardThunk = ({orgId, wbId, token}) => async (dispatch, getState) => {
  try {
    const options = {
      method: 'delete',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${orgId}/key/${wbId}`,
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
