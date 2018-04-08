const INITIAL_STATE = { user: '' };

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'login_success':
      console.log('login success');
      return { ...state ,
        user: action.payload };
    case 'login_failed':
      console.log('login failed');
      return { ...state ,
        err: action.payload };
    case 'wait_for_login':
      console.log('wait for login');
      return state;
    default:
      return state;
  }
}
