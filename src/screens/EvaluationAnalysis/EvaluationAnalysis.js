import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AIcon from 'react-native-vector-icons/AntDesign'
import { PieChart } from 'react-native-chart-kit'
import Swiper from 'react-native-swiper';
import { MyProgressBar } from '../../components/MyProgressBar';
import moment from 'moment'

import {styles} from './styles'
import Color from '../../config/Color'
import Size from '../../config/Size'

const data = [
  { name: 'Below', calorie: 2150000, color: Color.LIGHT_BLUE, legendFontColor: Color.BLUE, legendFontSize: 15 },
  { name: 'Ideal', calorie: 280000, color: Color.LIGHT_GREEN, legendFontColor: Color.GREEN, legendFontSize: 15 },
  { name: 'Over', calorie: 527610, color: Color.LIGHT_RED, legendFontColor: Color.RED, legendFontSize: 15 },
]

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
}

export default class EvaluationAnalysis extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: '',
      end: moment(),
      most_active: [],
      level: '',
      activity_hour: '',
      data: {
          month: {
              below: 0,
              ideal: 0,
              over: 0,
          }
      },
      data2: {
          month: {
              below: 0,
              ideal: 0,
              over: 0,
          }
      },
    }
  }
  goToDiary = () => {
    this.props.navigation.navigate('Homepage')
  }

  componentDidMount(){
    this.onRefresh()
    this.onRefreshIntake()
    this.onRefreshBurnt()
  }

  async onRefreshIntake() {
      let date = new Date(this.state.end)
      const token = await AsyncStorage.getItem('token');
      const headers = { "Authorization": 'Bearer ' + token }
      const response = await fetch(`http://103.252.100.230/fact/member/history/intake?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`, { headers })
      const json = await response.json()

      console.log("JSON #1", json)
      const data2 = {
          month: json.results.month
      }
      this.setState({ data2 })
  }

  async onRefreshBurnt() {
    let date = new Date(this.state.end)
    const token = await AsyncStorage.getItem('token');
    const headers = { "Authorization": 'Bearer ' + token }
    const response = await fetch(`http://103.252.100.230/fact/member/history/burnt?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`, { headers })
    const json = await response.json()

    console.log("JSON #2", json)
    let most_active = json.results.most_active
    let activity_month = json.results.activity_month
    let sum = 0
    activity_month.map(month=>{
      sum+=month[0]
    })
    let level = json.results.level
    const data = {
        month: json.results.month
    }
    this.setState({most_active, level, data, activity_hour: sum})
  }

  
  onRefresh = async() => {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/evaluation`, {headers})
    const json = await response.json()
    if (json.results !== undefined)
        this.setState({status:json.results})
  }

  renderIntakeAdvice = () => {
    const { data2 } = this.state;
    if (data2.month.below > data2.month.ideal && data2.month.below > data2.month.over)
        return "Try to consume according to the goal set."
    else if (data2.month.ideal > data2.month.below && data2.month.ideal > data2.month.over)
        return "Good job and stay consistent."
    else if (data2.month.ideal < data2.month.over && data2.month.below < data2.month.over)
        return "Don't consume more than the goal set for you."
  }

  renderBurntAdvice = () => {
    const { data } = this.state;
    if (data.month.below > data.month.ideal && data.month.below > data.month.over)
        return "Don't exercise less than the goal set for you."
    else if (data.month.ideal > data.month.below && data.month.ideal > data.month.over)
        return "Good job and stay consistent."
    else if (data.month.ideal < data.month.over && data.month.below < data.month.over)
        return "No need to overwork. Just exercise to reach your daily goal."
  }

  renderActivityAdvice = () => {
    if (parseInt(this.state.activity_hour/3600) < 6)
        return "You should exercise and be more active. It's good for your health."
    else if (parseInt(this.state.activity_hour/3600) > 6 && parseInt(this.state.activity_hour/3600) < 12)
        return "Keep it up ! Exercise and be more active."
    else if (parseInt(this.state.activity_hour/3600) > 12 && parseInt(this.state.activity_hour/3600) < 24)
        return "You are on the right track. Be consistent."
    else
        return "Don't overwork yourself. It's dangerous."
  }

  render(){
    let pieData1 = []
    let pieData2 = []
    if (this.state.data.month.below !== 0 || this.state.data.month.ideal !== 0 || this.state.data.month.over !== 0) {
          const below = (this.state.data.month.below === 0) ? 0.00001 : this.state.data.month.below
          const ideal = (this.state.data.month.ideal === 0) ? 0.00001 : this.state.data.month.ideal
          const over = (this.state.data.month.over === 0) ? 0.00001 : this.state.data.month.over
          pieData1 = [
              { name: 'Below', calorie: below, color: Color.LIGHT_BLUE, legendFontColor: Color.BLUE, legendFontSize: 15 },
              { name: 'Ideal', calorie: ideal, color: Color.LIGHT_GREEN, legendFontColor: Color.GREEN, legendFontSize: 15 },
              { name: 'Over', calorie: over, color: Color.LIGHT_RED, legendFontColor: Color.RED, legendFontSize: 15 },
          ]
      }

      if (this.state.data2.month.below !== 0 || this.state.data2.month.ideal !== 0 || this.state.data2.month.over !== 0) {
            const below = (this.state.data2.month.below === 0) ? 0.00001 : this.state.data2.month.below
            const ideal = (this.state.data2.month.ideal === 0) ? 0.00001 : this.state.data2.month.ideal
            const over = (this.state.data2.month.over === 0) ? 0.00001 : this.state.data2.month.over
            pieData2 = [
                { name: 'Below', calorie: below, color: Color.LIGHT_BLUE, legendFontColor: Color.BLUE, legendFontSize: 15 },
                { name: 'Ideal', calorie: ideal, color: Color.LIGHT_GREEN, legendFontColor: Color.GREEN, legendFontSize: 15 },
                { name: 'Over', calorie: over, color: Color.LIGHT_RED, legendFontColor: Color.RED, legendFontSize: 15 },
            ]
        }

    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false} activeDotColor={Color.LIGHT_GREEN} dotColor={Color.LIGHT_GREY}>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>{this.state.status!=''&&this.state.status == 'Normal'?'Congratulations !!':'Too Bad..'}</Text>
          <Text style={styles.text}>{this.state.status!=''&&this.state.status == 'Normal'?'You have reached your target':"You've almost reached your target"}</Text>
          <Text style={styles.weightStatus}>"{this.state.status!=''&&this.state.status == 'Normal'?'Ideal Body Weight':'Still ' +this.state.status}"</Text>
          <Icon name={this.state.status!=''&&this.state.status == 'Normal'?'trophy':'smile-o'} size={180} color={Color.LIGHT_YELLOW} />
          <Text style={styles.goodWords}>{this.state.status!=''&&this.state.status == 'Normal'?'Hard work pays off':"Winner never quits. Don't give up!!"}</Text>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Here is the review of your</Text>
          <Text style={[styles.text,styles.below]}>1-month Calorie Intake</Text>
          <PieChart
            data={pieData2}
            width={Size.WIDTH}
            height={220}
            chartConfig={chartConfig}
            accessor="calorie"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text style={styles.label}>ADVICE</Text>
          <View style={styles.row}>
            <Text style={styles.advice}>{this.renderIntakeAdvice()}</Text>
          </View>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Here is the review of your</Text>
          <Text style={[styles.text,styles.below]}>1-month Burnt Calorie</Text>
          <PieChart
            data={pieData1}
            width={Size.WIDTH}
            height={220}
            chartConfig={chartConfig}
            accessor="calorie"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text style={styles.label}>ADVICE</Text>
          <View style={styles.row}>
            <Text style={styles.advice}>{this.renderBurntAdvice()}</Text>
          </View>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <TouchableOpacity style={styles.button} onPress={this.goToDiary}>
            <AIcon name="close" color={Color.FONT_GREY} size={24} />
          </TouchableOpacity>
          <Text style={styles.text}>Here is the review of your</Text>
          <Text style={[styles.text,styles.below]}>1-month Activity Level</Text>
          <View style={{width:Size.WIDTH8}}>
            <Text style={styles.secondLabel}>Activity Level</Text>
            <MyProgressBar progress={this.state.level!=''&&this.state.level == 'Medium'?50:(this.state.level=="Low"?0:100)} />
            <View style={styles.group}>
              <Text style={[styles.secondLabel,{marginTop:-Size.HEIGHT*0.05}]}>Total Active Hours :</Text>
              <Text style={styles.info}>{this.state.activity_hour!='' && parseInt(this.state.activity_hour/3600)}</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.secondLabel}>Mostly Done Activities :</Text>
              <Text style={styles.info}>{this.state.most_active.length > 0 && this.state.most_active[0].activity_label__name}</Text>
            </View>
          </View>
          <Text style={[styles.label,{marginTop:-Size.HEIGHT*0.12}]}>ADVICE</Text>
          <View style={styles.row}>
            <Text style={styles.advice}>{this.state.activity_hour!=''&& this.renderActivityAdvice()}</Text>
          </View>
        </View>
      </Swiper>
    );
  }
}