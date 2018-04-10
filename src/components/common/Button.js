/* @flow weak */

import React from 'react';
import {
  TouchableOpacity
} from 'react-native';

const Button = (props) => {
  const { onPress } = props;

  console.log(props);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.default, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
};



const styles = {
  default: {
    backgroundColor: '#1a97f0',
    borderRadius: 13,
    padding: 5,
    alignSelf: 'center'
  },
};

export { Button };
