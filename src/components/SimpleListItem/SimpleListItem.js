import React from 'react';
import { TouchableHighlight, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
//styles
import { styles } from './styles';

import Color from '../../config/Color'

export default class SimpleListItem extends React.Component {
  render() {
    return (
      <TouchableHighlight underlayColor={Color.LIGHTER_GREY} onPress={this.props.onPressItem}>
        <View style={styles.row}>
          <Text style={styles.text}>{this.props.title}</Text>
          <Icon name="right" size={16} color={Color.FONT_GREY} />
        </View>
      </TouchableHighlight>
    );
  }
}

