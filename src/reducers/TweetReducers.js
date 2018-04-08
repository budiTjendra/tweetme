import {
  GET_USER_TIMELINE,
  GET_USER_TIMELINE_SUCCESS,
  GET_USER_TIMELINE_FAILED,
  SHOW_ADD_TWEET_DIALOG,
  ADD_MESSAGE,
  MESSAGE_CHANGED,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILED,
} from '../actions/types';

console.log('check GET_USER_TIMELINE: ' + GET_USER_TIMELINE);
console.log('check GET_USER_TIMELINE_SUCCESS: ' + GET_USER_TIMELINE_SUCCESS);
console.log('check GET_USER_TIMELINE_FAILED: ' + GET_USER_TIMELINE_FAILED);
console.log('check SHOW_ADD_TWEET_DIALOG: ' + SHOW_ADD_TWEET_DIALOG);
console.log('check ADD_MESSAGE: ' + ADD_MESSAGE);
console.log('check MESSAGE_CHANGED: ' + MESSAGE_CHANGED);
console.log('check ADD_MESSAGE_SUCCESS: ' + ADD_MESSAGE_SUCCESS);
console.log('check ADD_MESSAGE_FAILED: ' + ADD_MESSAGE_FAILED);

const INITIAL_STATE = {
  timeline: [],
  isShowTweetDialog: false,
  message: '',
  loading: {
    isLoading: false,
    loadingType: ''
  }
}

export default (state = INITIAL_STATE, action) => {
   console.log('TweetReducers :' , action);
   switch(action.type){
     case GET_USER_TIMELINE:
        return { ...state, loading: { isLoading: true, loadingType: GET_USER_TIMELINE }};
     case GET_USER_TIMELINE_SUCCESS:
        console.log('reducers GET_USER_TIMELINE_SUCCESS:' , action.payload);
        return {
          ...state,
          err: '',
          timeline: action.payload,
          loading:{
            isLoading:false,
            loadingType: ''
          }
        };
     case GET_USER_TIMELINE_FAILED:
        return { ...state,
          err: action.payload,
          loading:{
            isLoading:false,
            loadingType: ''
          }          
        };
     case SHOW_ADD_TWEET_DIALOG:
        return { ...state, isShowTweetDialog: action.payload};
     case MESSAGE_CHANGED:
        return { ...state, message: action.payload};
     case ADD_MESSAGE:
        return { ...state, message: ''};
     case ADD_MESSAGE_SUCCESS:
        return { ...state, message: '', isShowTweetDialog: false};
     case ADD_MESSAGE_FAILED:
        return { ...state, err: 'failed post message to twitter!', loading: false};
     default:
        return state;
   }
};
