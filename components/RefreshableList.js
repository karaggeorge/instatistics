import React from 'react';
import { Container, Content, List } from 'native-base';
import { RefreshControl, View } from 'react-native';

export default class SelectableList extends React.Component {

  _renderRefreshControl = () => {
    const { refreshing, onRefresh } = this.props;
    return (
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    );
  }

  render() {
    const { data, renderRow } = this.props;

    return (
      <Container>
        <View style={{flex: 1}}>
          <List
            refreshControl={this._renderRefreshControl()}
            dataArray={data}
            renderRow={renderRow} />
        </View>
      </Container>
    );
  }
};
