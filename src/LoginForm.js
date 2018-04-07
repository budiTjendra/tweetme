/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import OAuthManager from 'react-native-oauth';
import { signIn } from './actions';
import { connect } from 'react-redux';

class LoginForm extends Component {
  onButtonPress(){
    const manager = new OAuthManager('tweetme')

    manager.configure({
      twitter: {
        consumer_key: 'gA3utEODTIVk2DbErIA7xuHRJ',
        consumer_secret: 'G8AwgOxoi0KwL5vh2DY3fUELgF50qOzm6ebF0ctYAtlFGUVbGx'
      }
    });
    manager.authorize('twitter')
    .then(response  =>
    {
        console.log(response);
        this.props.signIn(response);
    })
    .catch(err => console.log(err));
  }

  render() {
    if (typeof signIn === 'function' ){
        console.log('function') ;
    }else{
        console.log('object');
    }
    console.log(this.props);

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Tweetme!</Text>
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Sign in"
          color="#841584"
          accessibilityLabel="Sign in to proceed"
        />
      </View>
    );
  }
}


const mapStateToProps = ({ oauth }) => {

  if (oauth.user === ""){

  }else{
    const { status, response } = oauth.user;
    const { authorized } = response;


    console.log('status:' + status);
    console.log('authorized:' + authorized);
  }

  console.log('oauth:' + oauth);
  return { oauth };
};

export default connect(mapStateToProps,  { signIn } )(LoginForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom:100
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
