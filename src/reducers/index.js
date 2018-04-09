import { combineReducers } from 'redux';
import OAuthReducers from './OAuthReducers';
import TweetReducers from './TweetReducers';

export default combineReducers ({
  oauth: OAuthReducers,
  tweet: TweetReducers
});
