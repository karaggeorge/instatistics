import React from 'react';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import UnfollowersScreen from '../screens/UnfollowersScreen';
import FansScreen from '../screens/FansScreen';
import PulseScreen from '../screens/PulseScreen';
import BotsScreen from '../screens/BotsScreen';

import Header from '../components/Header';

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Unfollowers: {
      screen: UnfollowersScreen,
    },
    Fans: {
      screen: FansScreen,
    },
    Pulse: {
      screen: PulseScreen,
    },
    Bots: {
      screen: BotsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Unfollowers':
            iconName = Platform.OS === 'ios' ? `ios-sad${focused ? '' : '-outline'}` : 'md-sad';
            break;
          case 'Fans':
            iconName = Platform.OS === 'ios' ? `ios-people${focused ? '' : '-outline'}` : 'md-people';
            break;
          case 'Pulse':
            iconName = Platform.OS === 'ios' ? `ios-pulse${focused ? '' : '-outline'}` : 'md-pulse';
            break;
          case 'Bots':
            iconName =
              Platform.OS === 'ios' ? `ios-nuclear${focused ? '' : '-outline'}` : 'md-nuclear';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
      header: null,
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

export default class MainTabNavigator extends React.Component {
  static navigationOptions = {
    header: null
  };

  _goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header goToSettings={this._goToSettings} />
        <Tabs />
      </View>
    )
  }
};
