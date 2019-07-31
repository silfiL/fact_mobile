import React from 'react';
import { View, Text, TouchableHighlight} from 'react-native';
//styles
import { styles } from './styles';

import Color from '../../config/Color'

export default class FoodItemCard extends React.Component {
  render() {
    return (
      <TouchableHighlight onLongPress={this.props.onPressItem} underlayColor={Color.LIGHTER_GREY}>
        <View style={styles.row}>
          <View>
            <Text style={styles.secondLine}>{this.props.name}</Text>
            <Text style={styles.secondLine}>{this.props.portion} {this.props.noserving ? '' : 'serving'}</Text>
          </View>
          <Text style={styles.firstLine}>{this.props.cal}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

