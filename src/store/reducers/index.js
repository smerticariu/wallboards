import { combineReducers } from 'redux';
import { loginReducer } from './login.reducer';
import { landingReducer } from './landing.reducer';
import { wallboardsReducer } from './wallboards.reducer';
import { notificationReducer } from './notification.reducer';
import { modalReducer } from './modal.reducer';
import { wallboardsUndoable } from './wallboards.undoable';

export default combineReducers({
  login: loginReducer,
  landing: landingReducer,
  wallboards: wallboardsUndoable(wallboardsReducer),
  notification: notificationReducer,
  modal: modalReducer,
});
