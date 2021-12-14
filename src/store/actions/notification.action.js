export const notificationActions = {
  HANDLE_IS_NOTIFICATION_SHOW: 'HANDLE_IS_NOTIFICATION_SHOW',
};

export const handleIsNotificationShowAC = (newStatus = false, isError = false, message = '') => ({
  type: notificationActions.HANDLE_IS_NOTIFICATION_SHOW,
  payload: {
    newStatus,
    message,
    isError,
  },
});
