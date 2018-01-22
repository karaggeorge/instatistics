import React from 'react';
import { View, StyleSheet, Button, Linking } from 'react-native';
import { WebBrowser, Constants } from 'expo';
import qs from 'qs';

import Api from '../services/api';

export default class LoginScreen extends React.Component {
  _login = async () => {
    this._addLinkingListener();
    let result = await WebBrowser.openBrowserAsync(
      `https://my-pulse.herokuapp.com/login/ig?deepLink=${Constants.linkingUri}`
    );

    this._removeLinkingListener();
  }

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

  _handleRedirect = async event => {
    WebBrowser.dismissBrowser();

    let query = event.url.replace(Constants.linkingUri, '');

    if (query) {
      const { token } = qs.parse(query);
      if (token) {
        Api.setToken(token);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title='Log In' onPress={this._login} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    justifyContent: 'space-around',
    width: '50%',
  }
});
