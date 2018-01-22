import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, RefreshControl, StyleSheet, Text, Image } from 'react-native';

import { fetchUser } from '../redux/user';

class Profile extends Component {
  componentWillMount() {
    if (!this.props.username) {
      this.props.actions.fetchUser();
    }
  }

  render() {
    const { profile_picture, username, fetching, actions } = this.props;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={fetching} onRefresh={actions.fetchUser} />}
        overScrollMode='always' >
          <Image source={{ uri: profile_picture }} style={{width: 50, height: 50}}/>
          <Text> {username} </Text>
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
  ({ user }) => ({ ...user }),
  dispatch => ({
    actions: { ...bindActionCreators({ fetchUser }, dispatch) }
  })
)(Profile);
