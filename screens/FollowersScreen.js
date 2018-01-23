import React from 'react';
import { Container, Tabs, Tab, Header, Content, Footer, Input, Body, Left, Item, Right, Icon, Title, ListItem, Thumbnail, Text, StyleProvider, getTheme } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
import _ from 'lodash';

import RefreshableList from '../components/RefreshableList';
import { fetchFollowers } from '../redux/followers';
import Api from '../services/api';

class FollowersScreen extends React.Component {
  state = {
    searching: false,
    refreshing: false,
    query: '',
    selected: [],
    tab: 0,
  };

  _getSelectedProps = tab => (
    [
      {
        icon: 'user-unfollow',
        action: (selected) => () => unfollowSelected(selected, this.props.actions.fetchFollowers, this._clearSelection),
      }, {
        icon: 'user-follow',
        action: (selected) => () => followSelected(selected, this.props.actions.fetchFollowers, this._clearSelection),
      }
    ][tab]
  )

  _startSearch = () => this.setState({ searching: true });

  _stopSearch = () => this.setState({ searching: false, query: '' });

  _onChangeText = query => this.setState({ query });

  _clearQuery = () => {
    if(this.state.query) {
      this.setState({ query: '' });
    } else {
      this._stopSearch();
    }
  }

  _checkQuery = ({ username, full_name }) => {
    const { query } = this.state;
    return username.toLowerCase().includes(query.toLowerCase()) || full_name.toLowerCase().includes(query.toLowerCase());
  }

  _refresh = () => this.props.actions.fetchFollowers();

  _startSelection = id => () => {
    if(!this.state.selected.length) {
      this.setState({ selected: [id] });
    } else {
      this._toggleUser(id)();
    }
  };

  _toggleUser = id => () => {
    const { selected } = this.state;

    if(!selected.length) return;
    if(!selected.includes(id)) {
      this.setState({ selected: [...selected, id] });
    } else {
      this.setState({ selected: _.without(selected ,id) });
    }
  }

  _clearSelection = () => this.setState({ selected: [] });

  _addSelected = user => ({ ...user, selected: this.state.selected.includes(user.id) });

  _unfollowUser = user => () => unfollowUser(user, this.props.actions.fetchFollowers);

  _followUser = user => () => followUser(user, this.props.actions.fetchFollowers);

  _renderUser = ({ icon, action }) => ({ id, username, full_name, profile_picture, selected }) => {
    return (
      <ListItem
        avatar
        onLongPress={this._startSelection(id)}
        onPress={this._toggleUser(id)}
        selected={selected}
        >
        <Left>
          <Thumbnail small source={{uri: profile_picture}} />
        </Left>
        <Body>
          <Text>{username}</Text>
          <Text note>{full_name}</Text>
        </Body>
        <Right>
          <Icon name={selected ? 'check' : icon} onPress={action({id, username})}/>
        </Right>
      </ListItem>
    );
  }

  _onChangeTab = ({ i: tab }) => {
    this._clearQuery();
    this._clearSelection();
    this.setState({ tab });
  }

  render() {
    const { searching, query, selected, tab } = this.state;
    const { follows, followedBy, fetching} = this.props;

    const nonfollowers = follows.filter(user => !~followedBy.findIndex(u => u.id === user.id)).filter(this._checkQuery).map(this._addSelected);
    const fans = followedBy.filter(user => !~follows.findIndex(u => u.id === user.id)).filter(this._checkQuery).map(this._addSelected);

    return (
      <Container>
        {
          selected.length ?
            <SelectHeader selected={selected} clearSelection={this._clearSelection} {...this._getSelectedProps(tab)}/> :
            (
              searching ?
                <SearchHeader stopSearch={this._stopSearch} onChangeText={this._onChangeText} clearQuery={this._clearQuery} query={query} /> :
                <MainHeader startSearch={this._startSearch} />
            )
        }
        <Tabs locked onChangeTab={this._onChangeTab}>
          <Tab heading='Non Followers'>
            <RefreshableList data={nonfollowers} refreshing={fetching} onRefresh={this._refresh} renderRow={this._renderUser({ icon: 'user-unfollow', action: this._unfollowUser })} />
          </Tab>
          <Tab heading='Fans'>
            <RefreshableList data={fans} refreshing={fetching} onRefresh={this._refresh} renderRow={this._renderUser({ icon: 'user-follow', action: this._followUser })} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const MainHeader = ({startSearch}) => {
  return (
    <Header hasTabs>
      <Left>
        <Icon name='people'/>
      </Left>
      <Body>
        <Title>Followers</Title>
      </Body>
      <Right>
        <Icon name='magnifier' onPress={startSearch} />
      </Right>
    </Header>
  );
}

const SelectHeader = ({ selected, clearSelection, icon, action }) => {
  return (
    <Header hasTabs>
      <Left>
        <Icon name='close' onPress={clearSelection} />
      </Left>
      <Body>
        <Title>{selected.length} Selected</Title>
      </Body>
      <Right>
        <Icon name={icon} onPress={action(selected)} />
      </Right>
    </Header>
  );
}

const SearchHeader = ({ clearQuery, stopSearch, onChangeText, query }) => {
  return (
    <Header hasTabs rounded searchBar>
      <StyleProvider style={getTheme({ iconFamily: "Ionicons"})}>
        <Item>
          <Icon name="arrow-back" onPress={stopSearch} />
          <Input placeholder="Search" value={query} onChangeText={onChangeText} />
          <Icon name="close" onPress={clearQuery} />
        </Item>
      </StyleProvider>
    </Header>
  );
};

const unfollowUser = ({ id, username }, refetch) => {
  Alert.alert(
    `Unfollow ${username}`,
    `Are you sure you want to unfollow ${username}?`,
    [
      {
        text: 'Cancel'
      }, {
        text: 'OK',
        onPress: async () => {
          await Api.unfollow(id);
          refetch();
        },
      }
    ]
  );
}

const unfollowSelected = (selected, refetch, clearSelection) => {
  Alert.alert(
    `Unfollow Selected`,
    `Are you sure you want to unfollow the ${selected.length} selected users?`,
    [
      {
        text: 'Cancel'
      }, {
        text: 'OK',
        onPress: async () => {
          await Promise.all(selected.map(id => Api.unfollow(id)));
          clearSelection();
          refetch();
        },
      }
    ]
  );
}

const followUser = async ({ id }, refetch) => {
  await Api.follow(id);
  refetch();
}

const followSelected = async (selected, refetch, clearSelection) => {
  await Promise.all(selected.map(id => Api.follow(id)));
  clearSelection();
  refetch();
}

export default connect(
  ({ followers }) => ({ ...followers }),
  dispatch => ({
    actions: { ...bindActionCreators({ fetchFollowers }, dispatch) }
  })
)(FollowersScreen);
