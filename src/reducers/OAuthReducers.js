import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  WAIT_FOR_LOGIN,
  GET_AUTHORIZED_ACCOUNT,
} from '../actions/types';

const INITIAL_STATE = { account: '' ,err: '' };

console.log('check LOGIN_SUCCESS: ' + LOGIN_SUCCESS);
console.log('check LOGIN_FAILED: ' + LOGIN_FAILED);
console.log('check WAIT_FOR_LOGIN: ' + WAIT_FOR_LOGIN);
console.log('check GET_AUTHORIZED_ACCOUNT: ' + GET_AUTHORIZED_ACCOUNT);


export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      console.log('login success');
      return { ...state ,
        account: action.payload ,
        err: ''};
    case LOGIN_FAILED:
      console.log('login failed');
      return { ...state ,
        err: action.payload };
    case WAIT_FOR_LOGIN:
      console.log('wait for login');
      return state;
    case GET_AUTHORIZED_ACCOUNT:
      return { ...state,
        account: action.payload };
    default:
      console.log('OAuthReducers: nothing (default)');
      return state;
  }
}
