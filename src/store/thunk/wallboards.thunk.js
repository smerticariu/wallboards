import axios from 'axios';
import { generateWallboardId } from 'src/common/utils/generateId';
import {
  fetchAllWallboardsAC,
  fetchAllWallboardsFailAC,
  fetchAllWallboardsSuccessAC,
  fetchWallboardByIdAC,
  fetchWallboardByIdFailAC,
  fetchWallboardByIdSuccessAC,
  saveWallboardAC,
  saveWallboardFailAC,
  saveWallboardSuccessAC,
} from '../actions/wallboards.action';

export const fetchWallboardByIdThunk = (wallboardId) => async (dispatch, getState) => {
  try {
    dispatch(fetchWallboardByIdAC());
    const { userInfo, token } = getState().login;

    const options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/${wallboardId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

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
        Accept: 'application/json',
      },
    };

    const response = await axios(options);

    dispatch(fetchAllWallboardsSuccessAC(response.data));
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    console.log(error);
  }
};

export const saveWallboardThunk = () => async (dispatch, getState) => {
  try {
    dispatch(saveWallboardAC());
    const { userInfo, token } = getState().login;
    const activeWallboard = getState().wallboards.activeWallboard.wallboard;
    const currentDate = new Date().getTime();
    const wbId = activeWallboard.id ?? generateWallboardId(userInfo.organisationId, userInfo.id);

    const data = {
      id: wbId,
      name: activeWallboard.name,
      createdBy: `${userInfo.firstName} ${userInfo.lastName}`,
      createdOn: currentDate,
      description: 'Not implemented yet',
    };
    const options = {
      method: 'put',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/${wbId}`,
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const response = await axios(options);

    dispatch(saveWallboardSuccessAC(data));
  } catch (error) {
    dispatch(saveWallboardFailAC());
    console.log(error);
  }
};
