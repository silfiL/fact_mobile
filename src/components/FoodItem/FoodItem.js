import React from 'react';
import { View, Text, TouchableHighlight} from 'react-native';
//styles
import { styles } from './styles';

import Color from '../../config/Color'

export default class FoodItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPressItem} underlayColor={Color.LIGHTER_GREY} onLongPress={this.props.onLongPress}>
        <View style={styles.row}>
          <Text style={styles.firstLine}>{this.props.name}</Text>
           <View style={styles.categoriesRow}>
              {this.props.categories != undefined && this.props.categories.map(cat=>(
                <Text style={styles.category}>{cat}</Text>
              ))}
          </View> 
          <Text style={styles.secondLine}>{this.props.calorie} . {this.props.portion} serving</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

