import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { styles } from './styles';

import {
  BarChart,
  PieChart,
} from 'react-native-chart-kit'

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}

export default class History extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      start: '',
      end: ''
    }
  }
  
  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.header}>
          <Text>HISTORY</Text>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity>
              <Icon name="chevron-circle-left" size={20} />
            </TouchableOpacity>
            <Text>Calorie Intake</Text>
            <TouchableOpacity>
              <Icon name="chevron-circle-right" size={20} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
            <DatePicker
              style={{width: 150}}
              date={this.state.start}
              mode="date"
              placeholder="Start Date"
              format="DD MMM YYYY"
              confirmBtnText="OK"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(date) => {this.setState({start: date})}}
            />
            <Text>to</Text>
             <DatePicker
              style={{width: 150}}
              date={this.state.end}
              mode="date"
              placeholder="End Date"
              format="DD MMM YYYY"
              confirmBtnText="OK"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(date) => {this.setState({end: date})}}
            />
          </View>
          <Text style={{textDecorationLine:'underline'}}>WEEK VIEW</Text>
          <BarChart
          style={chartConfig}
          data={data}
          width={Dimensions.get('window').width}
          height={220}
          yAxisLabel={'$'}
          chartConfig={chartConfig}
        />
        </View>
      </View>
    )
  }
}