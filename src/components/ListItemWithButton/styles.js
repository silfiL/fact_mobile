import React from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//styles
import { styles } from './styles';

export default class SimpleListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressItem}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text>{this.props.title}</Text>
          <Icon name="right" />
        </View>
      </TouchableOpacity>
    );
  }
}

