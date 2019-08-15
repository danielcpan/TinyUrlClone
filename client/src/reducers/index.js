import { combineReducers } from 'redux';
import linkReducer from './linkReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  links: linkReducer,
  errors: errorReducer,
});
