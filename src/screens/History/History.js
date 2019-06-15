import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { styles } from './styles';
import Color from '../../config/Color';
import {
  BarChart,
  PieChart,
} from 'react-native-chart-kit'
import { MyProgressBar } from '../../components/MyProgressBar';
import { CircleWithDate } from '../../components/CircleWithDate';

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

const pieData = [
  { name: 'Below', calorie: 2150000, color: Color.LIGHT_BLUE, legendFontColor: Color.BLUE, legendFontSize: 15 },
  { name: 'Ideal', calorie: 280000, color: Color.LIGHT_GREEN, legendFontColor: Color.GREEN, legendFontSize: 15 },
  { name: 'Over', calorie: 527610, color: Color.LIGHT_RED, legendFontColor: Color.RED, legendFontSize: 15 },
]

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
        <StatusBar barStyle="dark-content" backgroundColor={Color.BLUE} />
        <View style={styles.header}>
          <Text>HISTORY</Text>
        </View>
        <ScrollView>
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
                style={{width: 120}}
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
                style={{width: 120}}
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
            <Text style={{textDecorationLine:'underline'}}>MONTH VIEW</Text>
            <PieChart
              data={pieData}
              width={Dimensions.get('window').width}
              height={220}
              chartConfig={chartConfig}
              accessor="calorie"
              backgroundColor="transparent"
              paddingLeft="15"
            />
            <MyProgressBar />
            <Text style={{fontWeight:'bold'}}>Day with the most active hours</Text>
            <Text style={{fontWeight:'bold'}}>Day with the least active hours</Text>
            <CircleWithDate date={14} month="Feb" hour={10}/>
            <Text style={{fontWeight:'bold'}}>Mostly done activities</Text>
            <Text>Walking</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}