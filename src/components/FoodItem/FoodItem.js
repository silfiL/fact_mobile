import React from 'react';
import { View, Text, TouchableHighlight} from 'react-native';
//styles
import { styles } from './styles';

import Color from '../../config/Color'

export default class FoodItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPressItem} underlayColor={Color.LIGHTER_GREY}>
        <View style={styles.row}>
          <Text style={styles.firstLine}>{this.props.name}</Text>
          <Text style={styles.secondLine}>{this.props.calorie} . {this.props.portion} serving</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

