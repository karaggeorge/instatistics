import { NavigationActions } from 'react-navigation';

const navigation = {
  setContainer: function(container) {
    this._container = container;
  },
  navigate: function(params) {
    this._container.dispatch(NavigationActions.navigate(params));
  }
}

export default navigation;
