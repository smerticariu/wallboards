import { combineReducers } from 'redux';
import { loginReducer } from './login.reducer';
import { landingReducer } from './landing.reducer';
import { wallboardsReducer } from './wallboards.reducer';

export default combineReducers({
  login: loginReducer,
  landing: landingReducer,
  wallboards: wallboardsReducer,
});
