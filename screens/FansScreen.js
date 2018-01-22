import React from 'react';
import { View } from 'react-native';

import Fans from '../components/Fans';

export default class FansScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Fans />
      </View>
    )
  }
}
