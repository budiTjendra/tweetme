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
import { connect } from 'react-redux';
import { getAuthorizedAccount } from './actions';

class RouterComponent extends Component {
  componentDidMount(){
    this.props.getAuthorizedAccount();
    console.log('component did mount');
  }

  componentDidUpdate(){
    console.log('component did update');
  }

  render() {
    const manager = new OAuthManager('tweetme');

    manager.savedAccounts()
      .then(resp => {
        console.log('Router: account list: ', resp.accounts);
      })

    console.log('======');
    console.log(this.props);

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


export default connect(null, { getAuthorizedAccount } )(RouterComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
