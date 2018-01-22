import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, RefreshControl, StyleSheet, Alert } from 'react-native';
import { List, ListItem, Divider } from 'react-native-elements';

import { fetchFollowers, unfollow } from '../redux/followers';
import UserList from './UserList';
import Api from '../services/api';

class Unfollowers extends Component {

  componentWillMount() {
    if (!this.props.follows) {
      this.props.actions.fetchFollowers();
    }
  }

  _unfollowUser = id => async () => {
    console.log(await Api.unfollow(id));
    this.props.actions.fetchFollowers();
  }

  _removeUser = ({ id, username }) => () => {
    Alert.alert(
      `Unfollow ${username}`,
      `Are you sure you want to unfollow ${username}?`,
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: this._unfollowUser(id) }
      ]
    );
  }

  _renderListItem = ({ selected, startSelect, toggleItem }) => user => {
    const { id, username, full_name, profile_picture } = user;
    const icon = {
      name: 'user-unfollow',
      type: 'simple-line-icon',
      style: { fontSize: 20, marginRight: 20 }
    };

    const containerStyle = selected.includes(id) ? { backgroundColor: '#c1d6ff' } : undefined;

    return (
      <ListItem
        containerStyle={containerStyle}
        underlayColor='#c1d6ff'
        roundAvatar
        hideChevron={!!selected.length}
        key={id}
        title={username}
        subtitle={full_name}
        avatar={{ uri: profile_picture }}
        rightIcon={icon}
        onPressRightIcon={this._removeUser(user)}
        onLongPress={startSelect(user)}
        onPress={toggleItem(user)} />
    );
  }

  render() {
    const { follows, followedBy, fetching, actions } = this.props;

    const unfollowers = follows.filter(user => !~followedBy.findIndex(u => u.id === user.id));

    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={fetching} onRefresh={actions.fetchFollowers} />}
        overScrollMode='always'
        keyboardShouldPersistTaps='handled' >
        <UserList data={unfollowers} renderListItem={this._renderListItem}/>
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default connect(
  ({ followers }) => ({ ...followers }),
  dispatch => ({
    actions: { ...bindActionCreators({ fetchFollowers }, dispatch) }
  })
)(Unfollowers);
