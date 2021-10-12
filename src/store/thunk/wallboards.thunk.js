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

export const fetchWallboardByIdThunk = ({wbId}) => async (dispatch, getState) => {
  try {
    dispatch(fetchWallboardByIdAC());
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/${wbId}`,
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

export const fetchAllWallboardsThunk = () => async (dispatch, getState) => {
  try {
    dispatch(fetchAllWallboardsAC());
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}`,
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
    await axios(options);

    dispatch(saveWallboardSuccessAC(data));
  } catch (error) {
    dispatch(saveWallboardFailAC());
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

export const copyWallboardThunk = (wb) => async (dispatch, getState) => {
  try {
    dispatch(saveWallboardAC());
    const { userInfo, token } = getState().login;
    const activeWallboard = getState().wallboards.activeWallboard.wallboard;
    const currentDate = new Date().getTime();
    const wbId = generateWallboardId(userInfo.organisationId, userInfo.id);
    
    wb.id = wbId;
    wb.name = `${wb.name} Copy`;
    wb.createdOn = currentDate;
    const data = {  
      ...wb,
    };

    const options = {
      method: 'put',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/${wbId}`,
      data: wb,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    await axios(options);

    dispatch(saveWallboardSuccessAC(wb));
  } catch (error) {
    dispatch(saveWallboardFailAC());
    console.log(error);
  }
};
