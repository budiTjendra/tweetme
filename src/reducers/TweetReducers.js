import {
  GET_USER_TIMELINE_SUCCESS,
  GET_USER_TIMELINE_FAILED
} from '../actions/types';

console.log('check GET_USER_TIMELINE_SUCCESS: ' + GET_USER_TIMELINE_SUCCESS);
console.log('check GET_USER_TIMELINE_FAILED: ' + GET_USER_TIMELINE_FAILED);

const INITIAL_STATE = {
  timeline: []
}

export default (state = INITIAL_STATE, action) => {
   console.log('TweetReducers');
   switch(action.type){
     case GET_USER_TIMELINE_SUCCESS:
        console.log('reducers GET_USER_TIMELINE_SUCCESS:' , action.payload);
        return { ...state, err: '', timeline: action.payload };
     case GET_USER_TIMELINE_FAILED:
        return { ...state, err: action.payload };
     default:
        return state;
   }
};
