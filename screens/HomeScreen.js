import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { Container, Header, Left, Right, Body, Button, Icon, Title, StyleProvider } from 'native-base';

import Api from '../services/api';
import Profile from '../components/Profile';
import LogoutButton from '../components/LogoutButton';
import getTheme from '../native-base-theme/components';

export default class HomeScreen extends React.Component {
  _logout = () => {
    Api.deleteToken();
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
      <Container>
        <Header>
          <Body center>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Profile />
      </Container>
    </StyleProvider>
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
