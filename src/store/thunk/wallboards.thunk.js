import axios from 'axios';
import { checkIsAlphanumeric } from 'src/common/utils/alphanumeric-validation';
import { generateWallboardId } from 'src/common/utils/generateId';
import { handleWarningMessageAC } from '../actions/modal.action';
import { handleIsNotificationShowAC } from '../actions/notification.action';
import {
  fetchAllWallboardsAC,
  fetchAllWallboardsFailAC,
  fetchAllWallboardsSuccessAC,
  fetchWallboardByIdAC,
  fetchWallboardByIdFailAC,
  fetchWallboardByIdSuccessAC,
  resetWallboardEditPageDataAC,
  saveWallboardAC,
  saveWallboardFailAC,
  saveWallboardSuccessAC,
} from '../actions/wallboards.action';

export const fetchWallboardByIdThunk =
  ({ wbId }) =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchWallboardByIdAC('Single wallboard loading...'));
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
      dispatch(fetchWallboardByIdFailAC(error?.response?.data?.error?.message));
      console.log(error?.response?.data);
    }
  };

export const fetchAllWallboardsThunk = () => async (dispatch, getState) => {
  try {
    dispatch(fetchAllWallboardsAC());
    const { userInfo, token } = getState().login;
    const options = {
      method: 'get',
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
  const activeWallboard = getState().wallboards.present.activeWallboard.wallboard;
  const { userInfo, token } = getState().login;

  if (!checkIsAlphanumeric(activeWallboard.name)) {
    return dispatch(handleWarningMessageAC('Wallboard name must be alphanumeric'));
  }
  try {
    dispatch(saveWallboardAC());
    const currentDate = new Date().getTime();
    const wbId = activeWallboard.id ?? generateWallboardId(userInfo.organisationId, userInfo.id);

    const data = {
      id: wbId,
      name: activeWallboard.name,
      createdBy: `${userInfo.firstName} ${userInfo.lastName}`,
      createdOn: activeWallboard.createdOn ?? currentDate,
      lastEdited: currentDate,
      description: activeWallboard.description || "New Wallboard Description",
      widgets: activeWallboard.widgets,
      settings: activeWallboard.settings || {
        display: {
          shrinkWidth: false,
          shrinkHeight: false,
        }
      }
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
    dispatch(updateConfig(data, 'save'));
    if (activeWallboard.id !== undefined) {
      dispatch(handleIsNotificationShowAC(true, false, 'Wallboard was saved successfully'));
    }
  } catch (error) {
    dispatch(saveWallboardFailAC());
    if (activeWallboard.id !== undefined) {
      dispatch(handleIsNotificationShowAC(true, true, 'An error occurred'));
    }
    console.log(error);
  }
};

export const deleteWallboardThunk = (wbId) => async (dispatch, getState) => {
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
    dispatch(updateConfig(wbId, 'delete'));
    dispatch(handleIsNotificationShowAC(true, false, 'Wallboard was deleted'));
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    dispatch(handleIsNotificationShowAC(true, true, 'The Wallboard has not been deleted'));
    console.log(error);
  }
};

export const copyWallboardThunk =
  ({ wb }) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token } = getState().login;
      await dispatch(fetchWallboardByIdThunk({ wbId: wb.id }));
      let activeWallboard = getState().wallboards.present.activeWallboard.wallboard;

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

      dispatch(resetWallboardEditPageDataAC());
      dispatch(updateConfig(data, 'save'));
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

      await axios(options).then((res) => {
        if (!res.data.name) return;

        configWbs.push({
          id: res.data.id,
          key: res.data.key,
          name: res.data.name,
          createdBy: res.data.createdBy,
          createdOn: res.data.createdOn,
          description: res.data.description,
        });
      });

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

export const updateConfig = (wallboard, method) => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;

    let options = {
      method: 'get',
      url: `https://wallboards-store.redmatter-qa01.pub/organisation/${userInfo.organisationId}/key/config.json`, // add each wb to config
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
      },
    };
    const result = await axios(options);
    let allWallboards = result.data;
    const currentWallboard = allWallboards.find((el) => el.id === wallboard.id);
    const currentWallboardIndex = allWallboards.indexOf(currentWallboard);

    switch (method) {
      case 'save':
        if (currentWallboardIndex !== -1) {
          allWallboards[currentWallboardIndex] = {
            id: wallboard.id,
            name: wallboard.name,
            createdBy: wallboard.createdBy,
            createdOn: wallboard.createdOn,
            description: wallboard.description,
          };
        } else {
          allWallboards.push(wallboard);
        }
        break;

      case 'delete':
        const wbToDelete = allWallboards.find((wb) => wb.id === wallboard);
        const wbToDeleteIndex = allWallboards.indexOf(wbToDelete);
        delete allWallboards[wbToDeleteIndex];
        allWallboards = allWallboards.filter((wb) => wb != null); //clear empty elements
        break;

      default:
        return;
    }

    options.method = 'put'; //update config file
    options.data = allWallboards;
    await axios(options);
    dispatch(fetchAllWallboardsThunk());
  } catch (error) {
    dispatch(saveWallboardFailAC());
    console.log(error);
  }
};
