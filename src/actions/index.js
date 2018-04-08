import OAuthManager from 'react-native-oauth';
import { Actions } from 'react-native-router-flux';
import {
  WAIT_FOR_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_AUTHORIZED_ACCOUNT,
  GET_USER_TIMELINE_SUCCESS,
  GET_USER_TIMELINE_FAILED,
  SHOW_ADD_TWEET_DIALOG,
  MESSAGE_CHANGED
}from './types';


export const messageChanged = (text) => {
  console.log('action: messageChanged', text);
  
  return {
    type: MESSAGE_CHANGED,
    payload: text
  }
};

export const showAddTweetDialog = (isVisible) => {
  console.log('action: showAddTweetDialog', isVisible);

  return {
    type: SHOW_ADD_TWEET_DIALOG,
    payload: isVisible
  };

  /*
  return (dispatch) =>{
    dispatch({
       type: SHOW_ADD_TWEET_DIALOG,
       payload:isVisible
    });
  };*/

};

export const getUserTimeline = () => {
   console.log('action: getUserTimeline');

   return (dispatch) => {

     const manager = new OAuthManager('tweetme');
     const userTimelineUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

     manager
       .makeRequest('twitter', userTimelineUrl)
       .then(resp => {
          console.log('onGetUserTimelineSuccess');
          console.log('Action: getUserTimeLine: Data ->', resp.data );
          onGetUserTimelineSuccess(dispatch, resp.data);
       })
       .catch(err => {
         onGetUserTimelineFailed(dispatch, 'failed in getUserTimeline');
       });
   };

};

const onGetUserTimelineSuccess = (dispatch, data) => {
  console.log('onGetUserTimelineSuccess:',data);
  dispatch ({
     type: GET_USER_TIMELINE_SUCCESS,
     payload: data
  });
};

const onGetUserTimelineFailed = (dispatch, err) => {
  dispatch({
     type: GET_USER_TIMELINE_FAILED,
     payload:err
   });
};

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

const loginAccountSuccess = (dispatch, account ) => {
   dispatch({
      type: LOGIN_SUCCESS,
      payload:account
   });
   Actions.main();
};

const getResponse = (resp) => {
  //assume array always return 0 size
  return resp.accounts[0];
};

const loginAccountFailed = (dispatch, err) => {
  dispatch({
      type: LOGIN_FAILED,
      payload: err
  });
  console.log('err:' + err);
};

export const getAuthorizedAccount = () => {
    console.log('getAuthorizedAccount');
    const manager = new OAuthManager('tweetme');

    return (dispatch) => {
      manager.savedAccounts()
        .then(resp => {
          console.log('action: account list size: ', resp.accounts.length);
          console.log('action: account list: ', resp.accounts);

          if (resp.accounts.length === 0){
            loginAccountFailed(dispatch, 'account list from getAuthorizedAccount is empty');
          }else{
            const account = getResponse(resp);
            loginAccountSuccess(dispatch, account);
          }
        })
    };


    /*
    return {
      type: GET_AUTHORIZED_ACCOUNT,
      payload: 'test'
    };*/



};
