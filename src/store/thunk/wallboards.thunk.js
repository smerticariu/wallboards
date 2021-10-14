import axios from 'axios';
import { generateWallboardId } from '../../common/utils/generateId';
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

export const fetchWallboardByIdThunk =
  ({ wbId }) =>
  async (dispatch, getState) => {
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

      dispatch(fetchWallboardByIdSuccessAC({ widgets: [], ...response.data }));
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
      // url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}`,
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/config.json`,
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
      widgets: activeWallboard.widgets,
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

export const deleteWallboardThunk =
  ({ wbId }) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token } = getState().login;
      const options = {
        method: 'delete',
        url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/${wbId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        },
      };

      await axios(options);
      dispatch(fetchAllWallboardsThunk());
    } catch (error) {
      dispatch(fetchAllWallboardsFailAC());
      console.log(error);
    }
  };

export const copyWallboardThunk =
  ({ wb }) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token } = getState().login;
      await dispatch(fetchWallboardByIdThunk({ wbId: wb.id }));
      let activeWallboard = getState().wallboards.activeWallboard.wallboard;

      const currentDate = new Date().getTime();
      const wbId = generateWallboardId(userInfo.organisationId, userInfo.id);
      activeWallboard.id = wbId;
      activeWallboard.name = `${activeWallboard.name} Copy`;
      activeWallboard.createdOn = currentDate;

      const data = {
        ...activeWallboard,
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
      dispatch(fetchAllWallboardsThunk());
    } catch (error) {
      dispatch(saveWallboardFailAC());
      console.log(error);
    }
  };

export const syncWallboardsWithConfig = () => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;

    const options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}`, //fetch all wbs
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };

    const allwbs = await axios(options);

    let configWbs = [];
    await allwbs.data.data.forEach(async (wb, index) => {
      const options = {
        method: 'get',
        url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/${wb.key}`, //open each wallboard
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        },
      };

      await axios(options).then((res) => configWbs.push(res.data));

      if (allwbs.data.data.length == index + 1) {
        const options = {
          method: 'put',
          url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/config.json`, // add each wb to config
          data: configWbs, //for clearing the config file set data to empty array([]) instead configWbs
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
          },
        };
        await axios(options);
      }
    });
  } catch (error) {
    dispatch(saveWallboardFailAC());
    console.log(error);
  }
};
