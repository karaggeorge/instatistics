import React from 'react';
import { List, ListItem, SearchBar, Header } from 'react-native-elements';
import { View, Text } from 'react-native';
import _ from 'lodash';

export default class UserList extends React.Component {
  state = {
    selecting: false,
    selected: [],
  };

  _startSelect = ({ id }) => () => {
    if(this.state.selecting) this._toggleItem({ id });
    else this.setState({ selecting: true, selected: [id] });
  }

  _toggleItem = ({ id }) => () => {
    const { selecting, selected } = this.state;

    if (!selecting) return;

    if (selected.includes(id)) {
      if(selected.length === 1) {
        this.setState({ selecting: false, selected: [] });
      } else {
        this.setState({ selected: _.without(selected, id) });
      }
    } else {
      this.setState({ selected: [ ...selected, id ] });
    }
  }

  _clearSelection = () => this.setState({ selecting: false, selected: [] });

  _handleSearchTextChange = (query) => this.setState({ query });

  _matchQuery = query => ({ username, full_name}) => username.toLowerCase().includes(query) || full_name.toLowerCase().includes(query);

  render() {
    const { data, renderListItem } = this.props;
    const { selecting, selected, query } = this.state;

    const listData = query ? data.filter(this._matchQuery(query.toLowerCase())) : data;

    return (
      <View>
        <UserListHeader
          selecting={selecting}
          onChangeText={this._handleSearchTextChange}
          clearSelection={this._clearSelection}
          selected={selected}
          query={query} />
        <List containerStyle={{flex: 1, marginTop: 0}}>
          { listData.map(renderListItem({ selected, toggleItem: this._toggleItem, startSelect: this._startSelect})) }
        </List>
      </View>
    );
  }
}

const UserListHeader = ({ selecting, onChangeText, clearSelection, selected, query }) => {
  return selecting ?
            <Header
              leftComponent={{ icon: 'close', color: '#fff', onPress: clearSelection }}
              centerComponent={{ text: `${selected.length} Selected`, style: { color: '#fff', fontSize: 20 } }}
              rightComponent={{ icon: 'user-unfollow', type:'simple-line-icon', color: '#fff', underlayColor:'#2f95dc', onPress:() => alert('worked')}}
              backgroundColor='#2f95dc'
              outerContainerStyles={{ height: 60, borderBottomWidth: 0 }}
              innerContainerStyles={{ alignItems: 'center' }} /> :
            <SearchBar
              value={query}
              onChangeText={onChangeText}
              placeholder='Search...'
              clearIcon={{ style: { fontSize: 20, top: 18 } }}
              lightTheme />;
}
