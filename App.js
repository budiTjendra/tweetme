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
import { createStore } from 'redux';
import Login from './src/Login';
import reducers from './src/reducers';

type Props = {};

export default class App extends Component<Props> {

  render() {
    return (
      <Provider store= {createStore(reducers)}>
        <Login />
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
