import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckMarkIcon } from 'src/assets/static/icons/checkmark';
import { CloseIcon } from 'src/assets/static/icons/close';
import { handleIsNotificationShowAC } from 'src/store/actions/notification.action';

const NotificationMessage = () => {
  const { isNotificationShow, isErrorNotification, notificationMessage, notificationTime } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const closeNotification = () => {
    dispatch(handleIsNotificationShowAC(false, isErrorNotification));
  };

  const handleCloseIcon = () => {
    return <CloseIcon onClick={closeNotification} className="i--close" />;
  };
  useEffect(() => {
    let timeout;
    if (isNotificationShow) {
      timeout = setTimeout(() => {
        closeNotification();
      }, notificationTime);
    }
    return () => clearTimeout(timeout);
  }, [isNotificationShow]);
  return (
    <div
      className={`notification ${isErrorNotification ? 'notification--error' : 'notification--success'} ${
        isNotificationShow ? 'notification--active' : ''
      } `}
    >
      <div className="notification__body">
        {isErrorNotification ? (
          <CloseIcon className="i--close i--close--error" />
        ) : (
          <CheckMarkIcon className="i--checkmark i--checkmark--notification" />
        )}
        <div className="notification__message">{notificationMessage}</div>
      </div>
      <div className="notification__close-container">{handleCloseIcon()}</div>
    </div>
  );
};
export default NotificationMessage;
