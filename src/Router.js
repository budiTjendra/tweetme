/* @flow */

import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Home from './Home';
import LoginForm from './LoginForm';
import OAuthManager from 'react-native-oauth';


export default class RouterComponent extends Component {

  render() {
    const manager = new OAuthManager('tweetme');

    manager.savedAccounts()
      .then(resp => {
        console.log('account list: ', resp.accounts);
      })


    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key= "auth">
            <Scene key="login" component={LoginForm} title="Please Login"/>
          </Scene>
          <Scene key="main">
            <Scene key="home" component={Home} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
