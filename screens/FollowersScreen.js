import React from 'react';
import { View } from 'react-native';
import { Container, Tabs, Tab, Header, Input, Body, Left, Item, Right, Icon } from 'native-base';

import Unfollowers from '../components/Unfollowers';
import Fans from '../components/Fans';

export default class FollowersScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header hasTabs rounded searchBar>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
        </Header>
        <Tabs>
          <Tab heading='Unfollowers'>
            <Unfollowers />
          </Tab>
          <Tab heading='Fans'>
            <Fans />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
