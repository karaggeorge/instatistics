import React from 'react';
import { View } from 'react-native';

import Unfollowers from '../components/Unfollowers';

export default class UnfollowersScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Unfollowers />
      </View>
    )
  }
}
