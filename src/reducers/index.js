import { combineReducers } from 'redux';
import OAuthReducers from './OAuthReducers';

export default combineReducers ({
  oauth: OAuthReducers
});
