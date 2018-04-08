import OAuthManager from 'react-native-oauth';
import { Actions } from 'react-native-router-flux';
import {
  WAIT_FOR_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_AUTHORIZED_ACCOUNT
}from './types';

export const signIn = () => {
    return (dispatch) => {
      dispatch({type: WAIT_FOR_LOGIN});
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
            console.log('dispatch loginAccountSuccess');
            loginAccountSuccess(dispatch, response);
        })
        .catch(err => {
            console.log('dispatch loginAccountFailed');
            loginAccountFailed(dispatch, err);
        });
    };
};

const loginAccountSuccess = (dispatch, resp ) => {
   dispatch({
      type: LOGIN_SUCCESS,
      payload:resp
   });
   Actions.main();
};

const loginAccountFailed = (dispatch, err) => {
  dispatch({
      type: LOGIN_FAILED,
      payload: err
  });
};

export const getAuthorizedAccount = () => {
    console.log('getAuthorizedAccount');
    const manager = new OAuthManager('tweetme');
    /*
    manager.savedAccounts()
      .then(resp => {
        console.log('action: account list: ', resp.accounts);
      })*/

      return (dispatch) => {
        manager.savedAccounts()
          .then(resp => {
            console.log('action: account list size: ', resp.accounts.length);
            console.log('action: account list: ', resp.accounts);
            if (resp.accounts.length === 0){
              loginAccountFailed(dispatch, resp);
            }else{
              loginAccountSuccess(dispatch, resp);
            }


          })
      };

    /*
    return {
      type: GET_AUTHORIZED_ACCOUNT,
      payload: 'test'
    };*/



};
