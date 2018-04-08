/* @flow */

import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight
} from 'react-native';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import OAuthManager from 'react-native-oauth';
import { connect } from 'react-redux';
import { getAuthorizedAccount, showAddTweetDialog } from './actions';

class RouterComponent extends Component {
  componentDidMount(){
    this.props.getAuthorizedAccount();
    console.log('component did mount');
  }

  componentDidUpdate(){
    console.log('component did update');
  }


  render() {

    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key= "auth">
            <Scene key="login" component={LoginForm} title="Please Login"/>
          </Scene>
          <Scene key="main">
            <Scene
                rightTitle="Post Tweet"
                onRight={ () => { this.props.showAddTweetDialog(true) }}
                key="home"
                component={HomePage}
                title='Timeline'/>
          </Scene>
        </Scene>
      </Router>
    );
  }
}


export default connect(null, { getAuthorizedAccount,showAddTweetDialog } )(RouterComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
