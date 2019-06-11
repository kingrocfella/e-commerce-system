import auth from './authReducer';
import departments from './departmentsReducer';
import categories from './categoriesReducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  auth,
  departments,
  categories
});


export default rootReducers