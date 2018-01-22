import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import Api from '../services/api';
import Profile from '../components/Profile';
import LogoutButton from '../components/LogoutButton';

export default class HomeScreen extends React.Component {
  _logout = () => {
    Api.deleteToken();
  }

  render() {
    return (
      <View style={styles.container}>
        <Profile />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  buttonContainer: {
    width: '50%',
    height: '10%',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
