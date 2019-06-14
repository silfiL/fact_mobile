import React from 'react';
import { View, Text} from 'react-native';
//styles
import { styles } from './styles';

export default class RowThreeListItem extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <View style={styles.rightBorder}>
          <Text style={styles.label}>Activity</Text>
          <Text style={styles.text}>{this.props.activity}</Text>
        </View>
        <View style={styles.rightBorder}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.text}>{this.props.time}</Text>
        </View>
        <View style={[styles.rightBorder,styles.noBorder]}>
          <Text style={styles.label}>Burnt</Text>
          <Text style={styles.text}>{this.props.burnt}</Text>
        </View>
      </View>
    );
  }
}

