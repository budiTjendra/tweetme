import OAuthManager from 'react-native-oauth';
import { Actions } from 'react-native-router-flux';

export const signIn = () => {
    return (dispatch) => {
      dispatch({type: 'wait_for_login'});


        const manager = new OAuthManager('tweetme');

        manager.configure({
          twitter: {
            consumer_key: 'gA3utEODTIVk2DbErIA7xuHRJ',
            consumer_secret: 'G8AwgOxoi0KwL5vh2DY3fUELgF50qOzm6ebF0ctYAtlFGUVbGx'
          }
        });
        manager.authorize('twitter')
        .then(response  =>
        {
            loginUserSuccess(dispatch, response);
        })
        .catch(err => {
            loginUserFailed(dispath, err);
        });


    };
};


const loginUserSuccess = (dispatch, user ) => {
   dispatch({
      type: 'login_success',
      payload:user
   });
   Actions.main();
}

const loginUserFailed = (dispath, err) => {
  dispath({
      type: 'login_failed',
      payload: err
  });
}
