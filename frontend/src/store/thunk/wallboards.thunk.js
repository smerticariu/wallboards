import { WallboardsApi } from '../../common/api/wallboards.api';
import { DEFAULTS } from '../../common/defaults/defaults';
import { checkIsAlphanumeric } from '../../common/utils/alphanumeric-validation';
import { generateWallboardGroupId, generateWallboardId } from '../../common/utils/generateId';
import { handleWarningMessageAC } from '../actions/modal.action';
import { handleIsNotificationShowAC } from '../actions/notification.action';
import {
  fetchAllWallboardsAC,
  fetchAllWallboardsFailAC,
  fetchAllWallboardsSuccessAC,
  fetchWallboardByIdAC,
  fetchWallboardByIdFailAC,
  fetchWallboardByIdSuccessAC,
  fetchWallboardGroupByIdAC,
  fetchWallboardGroupByIdFailAC,
  fetchWallboardGroupByIdSuccessAC,
  resetWallboardEditPageDataAC,
  saveWallboardAC,
  saveWallboardFailAC,
  saveWallboardGroupAC,
  saveWallboardGroupFailAC,
  saveWallboardGroupSuccessAC,
  saveWallboardSuccessAC,
} from '../actions/wallboards.action';

export const fetchWallboardByIdThunk =
  ({ id, copyWb }) =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchWallboardByIdAC(DEFAULTS.WALLBOARDS.MESSAGE.LOADING));
      const { userInfo, token, storeUrl } = getState().login;
      
      const currentDate = new Date().getTime();

      const wallboardById = await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.GET.BY_ID,
        organizationId: userInfo.organisationId,
        wallboardId: id,
        token,
        storeUrl,
      });

      if (!copyWb) {
        await WallboardsApi({
          type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD,
          organizationId: userInfo.organisationId,
          token,
          data: {
            ...wallboardById.data,
            lastView: currentDate,
          },
          wallboardId: id,
          storeUrl,
        });

        dispatch(updateConfig({ ...wallboardById.data, lastView: currentDate }, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
      } else {
        dispatch(updateConfig(wallboardById.data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
      }

      dispatch(fetchWallboardByIdSuccessAC({ widgets: [], ...wallboardById.data }));
    } catch (error) {
      dispatch(fetchWallboardByIdFailAC(DEFAULTS.GLOBAL.FAIL, error?.response?.status));
      console.log(error);
    }
  };
export const fetchWallboardGroupByIdThunk =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchWallboardGroupByIdAC(DEFAULTS.WALLBOARDS.MESSAGE.LOADING));
      const { userInfo, token, storeUrl } = getState().login;
      const currentDate = new Date().getTime();

      const response = await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.GET.BY_ID,
        organizationId: userInfo.organisationId,
        wallboardId: id,
        token,
        storeUrl,
      });
      let wallboardById = response.data;

      const allWallboards = await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS_VIA_CONFIG,
        organizationId: userInfo.organisationId,
        token,
        storeUrl,
      });

      wallboardById.steps = wallboardById.steps.map((step) => {
        const wallboard = allWallboards.data.find((wb) => wb.id === step.wallboardId);
        const isStepForDelete = step.wallboardId && !wallboard;
        return isStepForDelete
          ? {
              ...step,
              wallboardId: null,
              wallboardName: null,
              wallboardDescription: null,
            }
          : {
              ...step,
              wallboardName: wallboard ? wallboard.name : step.name,
              wallboardDescription: wallboard ? wallboard.description : step.wallboardDescription,
            };
      });

      await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD_GROUP,
        organizationId: userInfo.organisationId,
        token,
        data: {
          ...wallboardById,
          lastView: currentDate,
        },
        storeUrl,
        wallboardId: id,
      });

      dispatch(updateConfig({ ...wallboardById, lastView: currentDate }, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));

      dispatch(fetchWallboardGroupByIdSuccessAC(wallboardById));
    } catch (error) {
      console.log(error);
      dispatch(fetchWallboardGroupByIdFailAC(DEFAULTS.GLOBAL.FAIL, error?.response?.status));
    }
  };

export const fetchAllWallboardsThunk = () => async (dispatch, getState) => {
  try {
    dispatch(fetchAllWallboardsAC());
    const { userInfo, token, storeUrl } = getState().login;

    const allWallboards = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS_VIA_CONFIG,
      organizationId: userInfo.organisationId,
      token,
      storeUrl,
    });

    let wallboardsFilteredByPermissions;
    if (userInfo.isAdmin) {
      wallboardsFilteredByPermissions = allWallboards.data;
    } else if (userInfo.isTeamLeader && !userInfo.isAdmin) {
      wallboardsFilteredByPermissions = allWallboards.data.filter((wb) => wb.createdByUserId === userInfo.id);
    }

    dispatch(fetchAllWallboardsSuccessAC(wallboardsFilteredByPermissions));
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    console.log(error);
  }
};

export const saveWallboardThunk = () => async (dispatch, getState) => {
  const activeWallboard = getState().wallboards.present.activeWallboard.wallboard;
  const { userInfo, token, storeUrl } = getState().login;
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
      createdBy: activeWallboard.isNewWallboard ? `${userInfo.firstName} ${userInfo.lastName}` : activeWallboard.createdBy,
      createdByUserId: activeWallboard.isNewWallboard ? userInfo.id : activeWallboard.createdByUserId,
      lastEditedBy: activeWallboard.isNewWallboard ? `${userInfo.firstName} ${userInfo.lastName}` : activeWallboard.lastEditedBy,
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
      storeUrl,
    });
    dispatch(updateConfig(data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
    dispatch(saveWallboardSuccessAC(data));

    if (activeWallboard.id !== undefined) {
      dispatch(handleIsNotificationShowAC(true, false, DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.SAVE));
    }
  } catch (error) {
    dispatch(saveWallboardFailAC());
    if (activeWallboard.id !== undefined) {
      console.log(error.response);
      dispatch(
        handleIsNotificationShowAC(true, true, `Error: ${error.response.status ?? 'unknown'} ${DEFAULTS.WALLBOARDS.NOTIFICATION.FAIL.SAVE}`)
      );
    }
    console.log(error);
  }
};
export const saveWallboardGroupThunk = () => async (dispatch, getState) => {
  const wallboardGroup = getState().wallboards.present.wallboardGroup.wallboardGroup;
  const { userInfo, token, storeUrl } = getState().login;

  if (!checkIsAlphanumeric(wallboardGroup.name)) {
    return dispatch(handleWarningMessageAC(DEFAULTS.WALLBOARDS.MESSAGE.WALLBOARD_GROUP_NAME_WARNING));
  }

  if (wallboardGroup.steps.some((step) => +step.stepTime < 1)) {
    return dispatch(handleWarningMessageAC(DEFAULTS.WALLBOARDS.MESSAGE.WALLBOARD_GROUP_STEP_VALUE));
  }

  try {
    dispatch(saveWallboardGroupAC());
    const currentDate = new Date().getTime();
    const wbId = wallboardGroup.id;
    const data = {
      id: wbId,
      name: wallboardGroup.name,
      createdBy: wallboardGroup.isNewWallboardGroup ? `${userInfo.firstName} ${userInfo.lastName}` : wallboardGroup.createdBy,
      createdByUserId: wallboardGroup.isNewWallboardGroup ? userInfo.id : wallboardGroup.createdByUserId,
      lastEditedBy: wallboardGroup.isNewWallboardGroup ? `${userInfo.firstName} ${userInfo.lastName}` : wallboardGroup.lastEditedBy,
      createdOn: wallboardGroup.createdOn ?? currentDate,
      lastView: currentDate,
      description: wallboardGroup.description,
      steps: wallboardGroup.steps,
      settings: wallboardGroup.settings,
    };

    await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD_GROUP,
      organizationId: userInfo.organisationId,
      token,
      data,
      wallboardId: wbId,
      storeUrl,
    });
    dispatch(updateConfig(data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
    dispatch(saveWallboardGroupSuccessAC(data));

    if (wallboardGroup.id !== undefined) {
      dispatch(handleIsNotificationShowAC(true, false, DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.SAVE_WALLBOARD_GROUP));
    }
  } catch (error) {
    dispatch(saveWallboardGroupFailAC());
    if (wallboardGroup.id !== undefined) {
      console.log(error.response);
      dispatch(
        handleIsNotificationShowAC(true, true, `Error: ${error.response.status ?? 'unknown'} ${DEFAULTS.WALLBOARDS.NOTIFICATION.FAIL.SAVE}`)
      );
    }
  }
};

export const deleteWallboardThunk = (wbId, isWallboardGroup) => async (dispatch, getState) => {
  try {
    const { userInfo, token, storeUrl } = getState().login;
    await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.DELETE.WALLBOARD,
      organizationId: userInfo.organisationId,
      token,
      wallboardId: wbId,
      storeUrl,
    });

    dispatch(updateConfig(wbId, DEFAULTS.WALLBOARDS.API.DELETE.WALLBOARD));
    dispatch(
      handleIsNotificationShowAC(
        true,
        false,
        isWallboardGroup ? DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.DELETE_WALLBOARD_GROUP : DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.DELETE
      )
    );
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    dispatch(
      handleIsNotificationShowAC(
        true,
        true,
        `Error: ${error.response.status ?? 'unknown'} - ${
          isWallboardGroup ? DEFAULTS.WALLBOARDS.NOTIFICATION.FAIL.DELETE_WALLBOARD_GROUP : DEFAULTS.WALLBOARDS.NOTIFICATION.FAIL.DELETE
        }`
      )
    );
    console.log(error);
  }
};

export const copyWallboardGroupThunk =
  ({ wb }) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token, storeUrl } = getState().login;

      const groupById = await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.GET.BY_ID,
        organizationId: userInfo.organisationId,
        wallboardId: wb.id,
        token,
        storeUrl,
      });

      const newGroup = groupById.data;

      const currentDate = new Date().getTime();
      const wbId = generateWallboardGroupId(userInfo.organisationId, userInfo.id);
      newGroup.id = wbId;
      newGroup.name = `${newGroup.name} Copy`;
      newGroup.createdOn = currentDate + 1000; // add one second to timestamp;
      newGroup.createdBy = `${userInfo.firstName} ${userInfo.lastName}`;
      newGroup.lastEditedBy = `${userInfo.firstName} ${userInfo.lastName}`;
      newGroup.lastView = currentDate;

      const data = {
        ...newGroup,
      };

      await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD_GROUP,
        organizationId: userInfo.organisationId,
        token,
        data,
        wallboardId: wbId,
        storeUrl,
      });

      dispatch(resetWallboardEditPageDataAC());
      dispatch(updateConfig(data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
      dispatch(handleIsNotificationShowAC(true, false, DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.SAVE_WALLBOARD_GROUP));
    } catch (error) {
      dispatch(saveWallboardGroupFailAC());
      console.log(error);
    }
  };

export const copyWallboardThunk =
  ({ wb }) =>
  async (dispatch, getState) => {
    try {
      const { userInfo, token, storeUrl } = getState().login;
      await dispatch(fetchWallboardByIdThunk({ id: wb.id, copyWb: true }));
      let activeWallboard = getState().wallboards.present.activeWallboard.wallboard;

      const currentDate = new Date().getTime();
      const wbId = generateWallboardId(userInfo.organisationId, userInfo.id);
      activeWallboard.id = wbId;
      activeWallboard.name = `${activeWallboard.name} Copy`;
      activeWallboard.createdOn = currentDate + 1000; // add one second to timestamp;
      activeWallboard.lastView = currentDate;
      activeWallboard.createdBy = `${userInfo.firstName} ${userInfo.lastName}`;
      activeWallboard.lastEditedBy = `${userInfo.firstName} ${userInfo.lastName}`;

      const data = {
        ...activeWallboard,
      };

      await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD,
        organizationId: userInfo.organisationId,
        token,
        data,
        wallboardId: wbId,
        storeUrl,
      });

      dispatch(resetWallboardEditPageDataAC());
      dispatch(updateConfig(data, DEFAULTS.WALLBOARDS.API.SAVE.WALLBOARD));
      dispatch(handleIsNotificationShowAC(true, false, DEFAULTS.WALLBOARDS.NOTIFICATION.SUCCESS.SAVE));
    } catch (error) {
      dispatch(saveWallboardFailAC());
      console.log(error);
    }
  };

export const syncWallboardsWithConfig = () => async (dispatch, getState) => {
  try {
    const { userInfo, token, storeUrl } = getState().login;

    const allWallboards = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS,
      organizationId: userInfo.organisationId,
      token,
      storeUrl,
    });

    let configWbs = [];
    await allWallboards.data.data.forEach(async (wb, index) => {
      await WallboardsApi({
        type: DEFAULTS.WALLBOARDS.API.GET.BY_ID,
        organizationId: userInfo.organisationId,
        token,
        wallboardId: wb.key,
        storeUrl,
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
          storeUrl,
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
    const { userInfo, token, storeUrl } = getState().login;
    const config = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS_VIA_CONFIG,
      organizationId: userInfo.organisationId,
      token,
      storeUrl,
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
            createdByUserId: userInfo.id,
            createdOn: wallboard.createdOn,
            lastView: wallboard.lastView,
            description: wallboard.description,
          };
        } else {
          allWallboards.push({
            id: wallboard.id,
            name: wallboard.name,
            createdBy: wallboard.createdBy,
            createdByUserId: userInfo.id,
            createdOn: wallboard.createdOn,
            lastView: currentDate,
            description: wallboard.description,
          });
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
      storeUrl,
    });

    dispatch(fetchAllWallboardsThunk());
  } catch (error) {
    dispatch(saveWallboardFailAC());
    console.log(error);
  }
};

export const deleteAllWallboardsThunk = () => async (dispatch, getState) => {
  try {
    const { userInfo, token, storeUrl } = getState().login;

    const allWallboards = await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.GET.ALL_WALLBOARDS,
      organizationId: userInfo.organisationId,
      token,
      storeUrl,
    });

    await WallboardsApi({
      type: DEFAULTS.WALLBOARDS.API.DELETE.ALL_WALLBOARDS,
      organizationId: userInfo.organisationId,
      token,
      data: allWallboards,
      storeUrl,
    });
    dispatch(syncWallboardsWithConfig());
  } catch (error) {
    dispatch(syncWallboardsWithConfig());
    console.log(error);
  }
};
