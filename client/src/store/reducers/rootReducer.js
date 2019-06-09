import authReducer from './authReducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  auth: authReducer
});


export default rootReducers