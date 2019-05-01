import React from 'react';
import { View, Text} from 'react-native';
//styles
import { styles } from './styles';

export default class RowThreeListItem extends React.Component {
  render() {
    return (
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{paddingHorizontal:10,borderRightColor:'black',borderRightWidth:1}}>
          <Text style={{fontWeight:'bold'}}>Activity</Text>
          <Text>{this.props.activity}</Text>
        </View>
        <View style={{paddingHorizontal:10,borderRightColor:'black',borderRightWidth:1}}>
          <Text style={{fontWeight:'bold'}}>Time</Text>
          <Text>{this.props.time}</Text>
        </View>
        <View style={{paddingHorizontal:10}}>
          <Text style={{fontWeight:'bold'}}>Burnt</Text>
          <Text>{this.props.burnt}</Text>
        </View>
      </View>
    );
  }
}

