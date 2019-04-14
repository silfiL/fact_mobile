import React from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
//styles
import { styles } from './styles';

export default class FoodItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressItem}>
        <View>
          <Text>{this.props.name}</Text>
          <Text>{this.props.calorie} {this.props.portion} serving</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

