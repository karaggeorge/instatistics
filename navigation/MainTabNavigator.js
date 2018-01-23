import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Footer, FooterTab, Icon, Button, Text } from 'native-base';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import FollowersScreen from '../screens/FollowersScreen';
import PulseScreen from '../screens/PulseScreen';
import BotsScreen from '../screens/BotsScreen';



export default TabNavigator(
  {
    Dashboard: {
      screen: HomeScreen,
    },
    Followers: {
      screen: FollowersScreen,
    },
    Statistics: {
      screen: PulseScreen,
    },
    Bots: {
      screen: BotsScreen,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Tab
              route='Dashboard'
              navigation={props.navigation}
              icon="organization" />
            <Tab
              route='Followers'
              navigation={props.navigation}
              icon="people" />
            <Tab
              route='Statistics'
              navigation={props.navigation}
              icon="graph" />
            <Tab
              route='Bots'
              navigation={props.navigation}
              icon="ghost" />
          </FooterTab>
        </Footer>
      );
    },
    tabBarPosition: 'bottom',
    animationEnabled: true,
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
};
