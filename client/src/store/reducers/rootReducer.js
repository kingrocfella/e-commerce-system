import auth from './authReducer';
import departments from './departmentsReducer';
import categories from './categoriesReducer';
import products from './productsReducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  auth,
  departments,
  categories,
  products
});


export default rootReducers