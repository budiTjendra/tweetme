/* @flow weak */

import React from 'react';
import {
  TouchableOpacity
} from 'react-native';

const Button = (props) => {
  const { onPress } = props;
  const buttonStyle = props.style ? props.style : styles.default;

  console.log(props);
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = {
  default: {
    backgroundColor: 'red',
  },
};
