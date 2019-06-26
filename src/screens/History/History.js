import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { styles } from './styles';
import Color from '../../config/Color';
import Size from '../../config/Size';
import moment from "moment";
import {
  BarChart,
  PieChart,
} from 'react-native-chart-kit'
import { MyProgressBar } from '../../components/MyProgressBar';
import { CircleWithDate } from '../../components/CircleWithDate';

const chartConfig = {
  backgroundGradientFrom: Color.APP_WHITE,
  backgroundGradientTo: Color.APP_WHITE,
  color: (opacity = 1) => Color.LIGHT_BLUE,
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

const historyArr = ["Calorie Intake","Burnt Calorie","Activity Level"]

export default class History extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      start: '',
      end: '',
      index: 0,
    }
  }
  
  right = () => {
    if (this.state.index == 2)
      this.setState({index:0})
    else
      this.setState({index:this.state.index+1})
  }

  left = () => {
    if (this.state.index == 0)
      this.setState({index:2})
    else
      this.setState({index:this.state.index-1})
  }

  selectDate = (date) => {
    let temp = moment(date).subtract(7,"days");
    this.setState({end:date,start:temp})
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Color.BLUE} translucent={false}/>
        <View style={styles.header}>
          <Text style={styles.headerText}>HISTORY</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.left}>
            <Icon name="chevron-circle-left" size={24} color={Color.LIGHT_BLUE}/>
          </TouchableOpacity>
          <Text style={styles.showText}>{historyArr[this.state.index]}</Text>
          <TouchableOpacity onPress={this.right}>
            <Icon name="chevron-circle-right" size={24} color={Color.LIGHT_BLUE}/>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.center}>
            <View style={[styles.row,{width:Size.WIDTH9}]}>
              <DatePicker
                disabled={true}
                style={styles.datepicker}
                date={this.state.start}
                mode="date"
                placeholder="Start Date"
                format="DD MMM YYYY"
                confirmBtnText="OK"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{dateInput:styles.dateInput,dateText:styles.dateText}}
              />
              <Text style={styles.showText}>to</Text>
              <DatePicker
                style={{width: 120}}
                date={this.state.end}
                mode="date"
                placeholder="End Date"
                format="DD MMM YYYY"
                confirmBtnText="OK"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{dateInput:styles.dateInput}}
                onDateChange={(date) => this.selectDate(date)}
              />
            </View>
            <Text style={styles.sectionTitle}>WEEK VIEW</Text>
            <BarChart
              data={data}
              width={Size.WIDTH9}
              height={220}
              yAxisLabel={'$'}
              chartConfig={chartConfig}
            />
            <Text style={styles.sectionTitle}>MONTH VIEW</Text>
            {this.state.index!=2?
            <View>
              <PieChart
              data={pieData}
              width={Size.WIDTH}
              height={220}
              chartConfig={chartConfig}
              accessor="calorie"
              backgroundColor="transparent"
              paddingLeft={15}
            /><Text style={styles.month}>Month Name</Text>
            </View>:
            <View style={[styles.subContainer,styles.padBottom]}>
              <MyProgressBar progress={20}/>
              <View style={[styles.below,styles.up]}>
                <Text style={styles.label}>Mostly done activities</Text>
                <Text style={styles.showText}>Walking</Text>
              </View>
              <View style={styles.below}>
                <Text style={styles.label}>Day with the most active hours</Text>
                <View style={styles.row}>
                  <CircleWithDate date={14} month="Feb" hour={10}/>
                </View>
              </View>
              <View style={styles.below}>
                <Text style={styles.label}>Day with the least active hours</Text>
                <View style={styles.row}>
                  <CircleWithDate date={14} month="Feb" hour={10}/>
                </View>
              </View>
            </View>}
          </View>
        </ScrollView>
      </View>
    )
  }
}