export const generateWallboardId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-${userId}-d-${currentDate}`;
};
export const generateWallboardGroupId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `g-${userOrgId}-${userId}-d-${currentDate}`;
};

export const generateWallboardWidgetId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-c-${userId}-d-${currentDate}`;
};
