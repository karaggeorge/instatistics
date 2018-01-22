import React from 'react';
import { Button as ReactButton, View } from 'react-native';
import _ from 'lodash';

const Button = ({ style, btnStyle, ...props }) => {
  return (
    <View style={style}>
      <ReactButton style={btnStyle} {...props} />
    </View>
  );
};

export default Button;
