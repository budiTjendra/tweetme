/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import LoginForm from './src/LoginForm';
import Router from './src/Router';
import reducers from './src/reducers';


type Props = {};

export default class App extends Component<Props> {

  render() {
    const store = (createStore(reducers, {} , applyMiddleware(ReduxThunk)));
    return (
      <Provider store= {store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
