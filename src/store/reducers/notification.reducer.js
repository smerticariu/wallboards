import { notificationActions } from '../actions/notification.action';

export const notificationInitialState = {
  isNotificationShow: false,
  isErrorNotification: false,
  notificationMessage: '',
  notificationTime: 5000,
};

export const notificationReducer = (state = notificationInitialState, action) => {
  switch (action.type) {
    case notificationActions.HANDLE_IS_NOTIFICATION_SHOW:
      return {
        ...state,
        isNotificationShow: action.payload.newStatus,
        isErrorNotification: action.payload.isError,
        notificationMessage: action.payload.message,
      };
    default:
      return state;
  }
};
