import React from 'react';
import { List, ListItem, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../redux/user';
import Api from '../services/api';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  _logout = () => {
    this.props.actions.logout();
    Api.deleteToken();
  }

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem title='First' leftIcon={{name: 'av-timer'}} />
          <ListItem title='Second' leftIcon={{name: 'flight-takeoff'}} hideChevron switchButton />
          <Divider style={{ height: 20 }}/>
          <ListItem title='Log Out' hideChevron titleStyle={{color: '#2f95dc'}} onPress={this._logout}/>
        </List>
      </ScrollView>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    actions: { ...bindActionCreators({ logout }, dispatch ) }
  })
)(SettingsScreen);
