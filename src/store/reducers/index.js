import { combineReducers } from 'redux';
import { loginReducer } from './login.reducer';
import { landingReducer } from './landing.reducer';
import { wallboardsReducer } from './wallboards.reducer';
import { notificationReducer } from './notification.reducer';
import { modalReducer } from './modal.reducer';
import { wallboardsUndoable } from './wallboards.undoable';
import { skillsReducer } from './skills.reducer';
import { callsQueuesReducer } from './callsQueues.reducer';
import { agentsReducer } from './agents.reducer';

export default combineReducers({
  login: loginReducer,
  landing: landingReducer,
  wallboards: wallboardsUndoable(wallboardsReducer),
  notification: notificationReducer,
  modal: modalReducer,
  skills: skillsReducer,
  callsQueues: callsQueuesReducer,
  agents: agentsReducer,
});
