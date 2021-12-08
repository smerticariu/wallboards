export const generateWallboardId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-${userId}-w-${currentDate}`;
};
export const generateWallboardGroupId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-${userId}-g-${currentDate}`;
};

export const generateWallboardWidgetId = (userOrgId, userId) => {
  const currentDate = new Date().getTime();
  return `${userOrgId}-c-${userId}-d-${currentDate}`;
};
