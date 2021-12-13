import { DEFAULTS } from '../defaults/defaults';

export const generateWallboardId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-${userId}${DEFAULTS.WALLBOARDS.WALLBOARD_SEPARATOR}${currentDate}`;
};
export const generateWallboardGroupId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-${userId}${DEFAULTS.WALLBOARDS.WALLBOARD_GROUP_SEPARATOR}${currentDate}`;
};

export const generateWallboardWidgetId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-c-${userId}-d-${currentDate}`;
};
