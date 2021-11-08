import axios from 'axios';
import { WallboardsApi } from '../../common/api/wallboards.api';
import { DEFAULTS } from '../../common/defaults/defaults';
import { checkIsAlphanumeric } from '../../common/utils/alphanumeric-validation';
import { generateWallboardId } from '../../common/utils/generateId';
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

export const fetchWallboardByIdThunk = (wbId) => async (dispatch, getState) => {
  try {
    dispatch(fetchWallboardByIdAC(DEFAULTS.WALLBOARDS.MESSAGE.LOADING));
    const { userInfo, token } = getState().login;
    const currentDate = new Date().getTime();

    const wallboardById = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.BY_ID,
      organizationId: userInfo.organisationId,
      wallboardId: wbId,
      token,
    });

    await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD,
      organizationId: userInfo.organisationId,
      token,
      data: {
        ...wallboardById.data,
        lastView: currentDate,
      },
      wallboardId: wbId,
    });

    dispatch(fetchWallboardByIdSuccessAC({ widgets: [], ...wallboardById.data }));
    dispatch(updateConfig(wallboardById.data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
  } catch (error) {
    dispatch(fetchWallboardByIdFailAC(error?.wallboardById?.data?.error?.message));
    console.log(error?.wallboardById?.data);
  }
};

export const fetchAllWallboardsThunk = () => async (dispatch, getState) => {
  try {
    dispatch(fetchAllWallboardsAC());

    const { userInfo, token } = getState().login;
    const allWallboards = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS_VIA_CONFIG,
      organizationId: userInfo.organisationId,
      token,
    });

    dispatch(fetchAllWallboardsSuccessAC(allWallboards.data));
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    console.log(error);
  }
};

export const saveWallboardThunk = () => async (dispatch, getState) => {
  const activeWallboard = getState().wallboards.present.activeWallboard.wallboard;
  const { userInfo, token } = getState().login;

  if (!checkIsAlphanumeric(activeWallboard.name)) {
    return dispatch(handleWarningMessageAC(DEFAULTS.WALLBOARDS.MESSAGE.NAME_WARNING));
  }
  try {
    dispatch(saveWallboardAC());
    const currentDate = new Date().getTime();
    const wbId = activeWallboard.id;
    const data = {
      id: wbId,
      name: activeWallboard.name,
      createdBy: `${userInfo.firstName} ${userInfo.lastName}`,
      createdOn: activeWallboard.createdOn ?? currentDate,
      lastView: currentDate,
      description: activeWallboard.description,
      widgets: activeWallboard.widgets,
      settings: activeWallboard.settings,
    };

    await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD,
      organizationId: userInfo.organisationId,
      token,
      data,
      wallboardId: wbId,
    });
    dispatch(updateConfig(data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
    dispatch(saveWallboardSuccessAC(data));

    if (activeWallboard.id !== undefined) {
      dispatch(handleIsNotificationShowAC(true, false, DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.SAVE));
    }
  } catch (error) {
    dispatch(saveWallboardFailAC());
    if (activeWallboard.id !== undefined) {
      dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.WALLBOARDS.NOTIFICATION.FAIL.SAVE));
    }
    console.log(error);
  }
};

export const deleteWallboardThunk = (wbId) => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;
    await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.DELETE.WALLBOARD,
      organizationId: userInfo.organisationId,
      token,
      wallboardId: wbId,
    });

    dispatch(updateConfig(wbId, DEFAULTS.WALLBOARDS.API.DELETE.WALLBOARD));
    dispatch(handleIsNotificationShowAC(true, false, DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.DELETE));
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    dispatch(handleIsNotificationShowAC(true, true, DEFAULTS.WALLBOARDS.NOTIFICATION.FAIL.DELETE));
    console.log(error);
  }
};

export const copyWallboardThunk =
  ({ wb }) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token } = getState().login;
      await dispatch(fetchWallboardByIdThunk(wb.id));
      let activeWallboard = getState().wallboards.present.activeWallboard.wallboard;

      const currentDate = new Date().getTime();
      const wbId = generateWallboardId(userInfo.organisationId, userInfo.id);
      activeWallboard.id = wbId;
      activeWallboard.name = `${activeWallboard.name} Copy`;
      activeWallboard.createdOn = currentDate;
      activeWallboard.lastView = currentDate;

      const data = {
        ...activeWallboard,
      };

      await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD,
        organizationId: userInfo.organisationId,
        token,
        data,
        wallboardId: wbId,
      });

      dispatch(resetWallboardEditPageDataAC());
      dispatch(updateConfig(data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
    } catch (error) {
      dispatch(saveWallboardFailAC());
      console.log(error);
    }
  };

export const syncWallboardsWithConfig = () => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;

    const allWallboards = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS,
      organizationId: userInfo.organisationId,
      token,
    });

    let configWbs = [];
    await allWallboards.data.data.forEach(async (wb, index) => {
      await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.GET.BY_ID,
        organizationId: userInfo.organisationId,
        token,
        wallboardId: wb.key,
      }).then((res) => {
        if (!res.data.name) return;

        configWbs.push({
          id: res.data.id,
          key: res.data.key,
          name: res.data.name,
          createdBy: res.data.createdBy,
          createdOn: res.data.createdOn,
          lastView: res.data.lastView,
          description: res.data.description,
        });
      });

      if (allWallboards.data.data.length === index + 1) {
        await WallboardsApi({
          type: DEFAULTS.WALLBOARDS.API.SAVE.SYNC_CONFIG,
          organizationId: userInfo.organisationId,
          token,
          data: configWbs,
        });
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
    const config = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS_VIA_CONFIG,
      organizationId: userInfo.organisationId,
      token,
    });

    const currentDate = new Date().getTime();

    let allWallboards = config.data;
    const currentWallboard = allWallboards.find((el) => el.id === wallboard.id);
    const currentWallboardIndex = allWallboards.indexOf(currentWallboard);

    switch (method) {
      case DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD:
        if (currentWallboardIndex !== -1) {
          allWallboards[currentWallboardIndex] = {
            id: wallboard.id,
            name: wallboard.name,
            createdBy: wallboard.createdBy,
            createdOn: wallboard.createdOn,
            lastView: currentDate,
            description: wallboard.description,
          };
        } else {
          allWallboards.push(wallboard);
        }
        break;

      case DEFAULTS.WALLBOARDS.API.DELETE.WALLBOARD:
        const wbToDelete = allWallboards.find((wb) => wb.id === wallboard);
        const wbToDeleteIndex = allWallboards.indexOf(wbToDelete);
        delete allWallboards[wbToDeleteIndex];
        allWallboards = allWallboards.filter((wb) => wb != null); //clear empty elements
        break;

      default:
        return;
    }

    await WallboardsApi({
      // update the config file
      type: DEFAULTS.WALLBOARDS.API.SAVE.SYNC_CONFIG,
      organizationId: userInfo.organisationId,
      token,
      data: allWallboards,
    });

    dispatch(fetchAllWallboardsThunk());
  } catch (error) {
    dispatch(saveWallboardFailAC());
    console.log(error);
  }
};

export const deleteAllWallboardsThunk = () => async (dispatch, getState) => {
  try {
    const { userInfo, token } = getState().login;

    const allWallboards = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS,
      organizationId: userInfo.organisationId,
      token,
    });

    await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.DELETE.ALL_WALLBOARDS,
      organizationId: userInfo.organisationId,
      token,
      data: allWallboards,
    });
    console.log(allWallboards);
    dispatch(syncWallboardsWithConfig());
  } catch (error) {
    dispatch(syncWallboardsWithConfig());
    console.log(error);
  }
};
