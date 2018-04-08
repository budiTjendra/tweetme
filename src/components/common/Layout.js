/* @flow weak */

import React from 'react';
import {
  View,
} from 'react-native';

const Layout = (props) => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
);



const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
};

export { Layout };
