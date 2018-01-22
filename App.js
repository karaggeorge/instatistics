import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Linking, Text } from 'react-native';
import { AppLoading, Asset, Font, Constants } from 'expo';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import LoginScreen from './screens/LoginScreen';
import qs from 'qs';
import Api from './services/api';
import store, { persistor } from './redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Container, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    Api.addTokenListener(this._updateToken);
  }

  componentWillUnmount() {
    Api.removeTokenListener(this._updateToken);
  }

  _updateToken = (token) => {
    this.setState({ token });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainComponent token={this.state.token} />
          </PersistGate>
        </Provider>
      </View>
    );
  }

  _checkToken = async () => {
    this.setState({
      token: await Api.getToken()
    });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      }),
      this._checkToken(),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const MainComponent = ({ token }) => {
  if(!token) {
    return (<LoginScreen />);
  }

  return (
    <StyleProvider style={getTheme()}>
      <Container>
        <RootNavigation />
      </Container>
    </StyleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
