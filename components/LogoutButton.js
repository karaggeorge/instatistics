import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Api from '../services/api';
import Button from './Button';
import { logout } from '../redux/user';

class LogoutButton extends React.Component {
  _logout = () => {
    this.props.actions.logout();
    Api.deleteToken();
  }

  render() {
    const { actions, ...props } = this.props;
    console.log(props);
    return <Button title='Log Out' onPress={this._logout} {...props} />
  }
}

export default connect(
  null,
  dispatch => ({
    actions: { ...bindActionCreators({ logout }, dispatch) }
  })
)(LogoutButton);
