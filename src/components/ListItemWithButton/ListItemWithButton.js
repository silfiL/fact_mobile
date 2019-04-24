import React from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//styles
import { styles } from './styles';

export default class ListItemWithButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onLongPress={this.props.onLongPress}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View>
            <Text style={{fontWeight:'bold',fontSize:17}}>{this.props.firstLine}</Text>
            <Text>{this.props.secondLine}</Text>
          </View>
          <TouchableOpacity onPress={this.props.buttonPress} style={{padding:10}}>
            <Icon name={this.props.iconName} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

