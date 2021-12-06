import { notificationReducer } from 'store/reducers/notification.reducer';
import { handleIsNotificationShowAC, notificationActions } from 'store/actions/notification.action';

describe('notification reducer', () => {
  it('should create an action', () => {
    const expectedAction = {
      type: notificationActions.HANDLE_IS_NOTIFICATION_SHOW,
      payload: {
        newStatus: true,
        message: 'Notification Message',
        isError: false,
      },
    };

    expect(handleIsNotificationShowAC(true, false, 'Notification Message')).toEqual(expectedAction);
  });

  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual({
      isNotificationShow: false,
      isErrorNotification: false,
      notificationMessage: '',
      notificationTime: 5000,
    });
  });

  it('should show the notification', () => {
    expect(
      notificationReducer(undefined, {
        type: notificationActions.HANDLE_IS_NOTIFICATION_SHOW,
        payload: {
          newStatus: true,
          message: 'Notification Message',
          isError: true,
        },
      }),
    ).toEqual({
      isNotificationShow: true,
      isErrorNotification: true,
      notificationMessage: 'Notification Message',
      notificationTime: 5000,
    });
  });
});
