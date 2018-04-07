/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import OAuthManager from 'react-native-oauth';

export default class Login extends Component {
  onButtonPress(){
      const manager = new OAuthManager('tweetme')
      manager.configure({
        twitter: {
          consumer_key: 'gA3utEODTIVk2DbErIA7xuHRJ',
          consumer_secret: 'G8AwgOxoi0KwL5vh2DY3fUELgF50qOzm6ebF0ctYAtlFGUVbGx'
        }
      });
      manager.authorize('twitter')
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }

  render() {
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
