import { combineReducers } from 'redux';
import userReducer from './user';
import favouritesReducer from './favourites';
import chocolatesReducer from './chocolates';

export default combineReducers({
  auth: userReducer,
  favourites: favouritesReducer,
  chocolates: chocolatesReducer,
});
