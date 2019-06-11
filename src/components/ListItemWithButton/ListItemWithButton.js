import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//styles
import { styles } from './styles';

import Color from '../../config/Color'

export default class ListItemWithButton extends React.Component {
  render() {
    return (
        <View style={styles.row}>
          <View>
            <Text style={styles.firstLine}>{this.props.firstLine}</Text>
            <Text style={styles.secondLine}>{this.props.secondLine}</Text>
          </View>
          <TouchableOpacity onPress={this.props.buttonPress} style={styles.button}>
            <Icon name={this.props.iconName} size={24} color={this.props.iconColor} />
          </TouchableOpacity>
        </View>
    );
  }
}

