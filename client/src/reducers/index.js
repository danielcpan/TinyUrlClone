import { combineReducers } from 'redux';
import linkReducer from './linkReducer';
import snackbarReducer from './snackbarReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  links: linkReducer,
  snackbars: snackbarReducer,
  errors: errorReducer,
});
