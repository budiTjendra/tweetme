import { combineReducers } from 'redux';
import OAuthReducers from './OAuthReducers';
import TweetReducers from './TweetReducers';
//import LoadingReducers from './LoadingReducers';

export default combineReducers ({
  oauth: OAuthReducers,
  tweet: TweetReducers
  //loading: LoadingReducers
});
