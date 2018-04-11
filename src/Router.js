/* @flow */

import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import Test2 from './Test2';
import OAuthManager from 'react-native-oauth';
import { connect } from 'react-redux';
import { getAuthorizedAccount, showAddTweetDialog, logout } from './actions';

class RouterComponent extends Component {


  doLogout(){
     this.props.logout();
     Actions.auth();
  }

  askConfirmationForLogout(){
    console.log('Router: props:' ,this.props);

    Alert.alert(
      'Alert',
      'Are your sure want to logout from Tweetme? ',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.doLogout() },
      ],
      { cancelable: false }
    )
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
                leftTitle="Logout"
                onLeft={ () => { this.askConfirmationForLogout()}}
                key="home"
                component={HomePage}
                title='Timeline'/>
          </Scene>
        </Scene>
      </Router>
    );
  }
}



const mapStateToProps = ({ oauth }) => {
  return { oauth };
};

export default connect(mapStateToProps, { getAuthorizedAccount,showAddTweetDialog, logout } )(RouterComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
