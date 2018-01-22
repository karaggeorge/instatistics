import React from 'react';
import { Header as ReactHeader } from 'react-native-elements'
import { connect } from 'react-redux';
import { dispatch } from 'redux';

import navigation from '../services/navigation';


const Header = ({ username, goToSettings }) => {
  return (
    <ReactHeader
      centerComponent={{ text: username || 'My Pulse', style: { color: '#fff' } }}
      rightComponent={{ icon: 'settings', color: '#fff', containerStyle: { top: 4 }, onPress: goToSettings, underlayColor: '#2f95dc' }}
      backgroundColor='#2f95dc'
      outerContainerStyles={{ borderBottomWidth: 0 }} />
  );
};

export default connect(
  ({ user }) => ({ username: user.username })
)(Header);
