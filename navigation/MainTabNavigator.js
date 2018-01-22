import React from 'react';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import FollowersScreen from '../screens/FollowersScreen';
import FansScreen from '../screens/FansScreen';
import PulseScreen from '../screens/PulseScreen';
import BotsScreen from '../screens/BotsScreen';

import { Footer, FooterTab, Icon, Button, Text } from 'native-base';
import Header from '../components/Header';

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Followers: {
      screen: FollowersScreen,
    },
    Fans: {
      screen: FansScreen,
    },
    Statistics: {
      screen: PulseScreen,
    },
    Bots: {
      screen: BotsScreen,
    },
  },
  {
    tabBarComponent: props => {
      console.log(props.navigationState);
      return (
        <Footer>
          <FooterTab>
            <Tab
              route='Home'
              navigation={props.navigation}
              icon="paper" />
            <Tab
              route='Followers'
              navigation={props.navigation}
              icon="people" />
            <Tab
              route='Statistics'
              navigation={props.navigation}
              icon="pulse" />
            <Tab
              route='Bots'
              navigation={props.navigation}
              icon="outlet" />
          </FooterTab>
        </Footer>
      );
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
  }
);

const Tab = ({ icon, route, title, navigation }) => {
  const active = navigation.state.routes[navigation.state.index].routeName === route;

  return (
    <Button
      vertical
      active={active}
      onPress={() => navigation.navigate(route)}>
      <Icon name={icon} active={active} />
      <Text>{title || route}</Text>
    </Button>
  );
}

export default class MainTabNavigator extends React.Component {
  static navigationOptions = {
    header: null
  };

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  // <Header goToSettings={this._goToSettings} />

  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs />
      </View>
    )
  }
};
