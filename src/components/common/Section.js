/* @flow weak */

import React from 'react';
import {
  View,
} from 'react-native';

const Section = (props) => {
  const sectionStyle = props.noSkin ? styles.noSkinLayoutStyle : styles.layoutStyle;  
  return (
    <View style={sectionStyle}>
      { props.children }
    </View>
  );
};

export default Section;

const styles = {
  layoutStyle: {
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 0,
    padding: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: 'gray',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1
  },
  noSkinLayoutStyle: {
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 0,
    padding: 10,
  }
};
