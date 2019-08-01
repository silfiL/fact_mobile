import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, StatusBar, AsyncStorage } from 'react-native';
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
    backgroundColor: Color.TRANSPARENT,
    backgroundGradientFrom: Color.APP_WHITE,
    backgroundGradientTo: Color.APP_WHITE,
    color: (opacity = 1) => Color.LIGHT_BLUE,
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0
}

const historyArr = ["Calorie Intake", "Burnt Calorie", "Activity Level"]

export default class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: '',
            end: moment(),
            index: 0,
            data: {
                week: [],
                month: {
                    below: 0,
                    ideal: 0,
                    over: 0,
                }
            },
            level: '',
            most_active: [],
            activity_level: [],
            activity_month: []
        }

        this.onRefreshIntake = this.onRefreshIntake.bind(this)
        this.onRefreshBurnt = this.onRefreshBurnt.bind(this)
    }

    async onRefreshIntake() {
        let date = new Date(this.state.end)
        const token = await AsyncStorage.getItem('token');
        const headers = { "Authorization": 'Bearer ' + token }
        const response = await fetch(`http://103.252.100.230/fact/member/history/intake?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`, { headers })
        const json = await response.json()

        console.log("JSON #1", json)
        const data = {
            week: json.results.week,
            month: json.results.month
        }
        this.setState({ data })
    }

    async onRefreshBurnt() {
        let date = new Date(this.state.end)
        const token = await AsyncStorage.getItem('token');
        const headers = { "Authorization": 'Bearer ' + token }
        const response = await fetch(`http://103.252.100.230/fact/member/history/burnt?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`, { headers })
        const json = await response.json()

        console.log("JSON #2", json)
        if (this.state.index == 1){
          const data = {
              week: json.results.week,
              month: json.results.month
          }
          this.setState({ data })
        } else {
          let most_active = json.results.most_active
          let activity_level = json.results.activity_level
          let activity_month = json.results.activity_month
          let level = json.results.level
          let week = []
          for(var i=0;i<activity_level.length;i++){
              week.push(activity_level[i][0])
          }
          week.reverse()
          const data = {
            week: week,
            month: []
          }
          this.setState({most_active,activity_month,data,level})
        }
    }

    right = async() => {
        if (this.state.index == 2)
            await this.setState({ index: 0 })
        else
            await this.setState({ index: this.state.index + 1 })

        if (this.state.index === 0) await this.onRefreshIntake()
        if (this.state.index === 1) await this.onRefreshBurnt()
        if (this.state.index === 2) await this.onRefreshBurnt()
    }

    left = async() => {
        if (this.state.index == 0)
            await this.setState({ index: 2 })
        else
            await this.setState({ index: this.state.index - 1 })

        if (this.state.index === 0) await this.onRefreshIntake()
        if (this.state.index === 1) await this.onRefreshBurnt()
        if (this.state.index === 2) await this.onRefreshBurnt()
    }

    selectDate = (date) => {
        let temp = moment(date).subtract(6, "days");
        this.setState({ end: date, start: temp })
    }

    async componentDidMount() {
        let temp = moment(this.state.end).subtract(6, "days")
        await this.setState({ start : temp})
        await this.onRefreshIntake()
    }

    render() {
        let date = new Date()
        let monthDate = new Date()
        let pieData = []
        const weekLabels = []

        if (this.state.end !== '') {
            date = new Date(this.state.end)
            weekLabels.push(moment(date).format('Do'))
            //weekLabels.push(date.datetimeformat('date'))

            for (let i = 0; i < 5; i++){
                weekLabels.push('')
            }

            date.setDate(date.getDate() - 6)
            weekLabels.push(moment(date).format('Do'))
            //weekLabels.push(date.datetimeformat('date'))

            date = new Date(this.state.end)
            monthDate = new Date(date.setDate(date.getDate() - 30))

            date = new Date(this.state.end)
        }

        const data = {
            labels: weekLabels.reverse(),
            datasets: [{
                data: this.state.data.week
            }]
        }

        if (this.state.data.month.below !== 0 || this.state.data.month.ideal !== 0 || this.state.data.month.over !== 0) {
            const below = (this.state.data.month.below === 0) ? 0.00001 : this.state.data.month.below
            const ideal = (this.state.data.month.ideal === 0) ? 0.00001 : this.state.data.month.ideal
            const over = (this.state.data.month.over === 0) ? 0.00001 : this.state.data.month.over
            pieData = [
                { name: 'Below', calorie: below, color: Color.LIGHT_BLUE, legendFontColor: Color.BLUE, legendFontSize: 15 },
                { name: 'Ideal', calorie: ideal, color: Color.LIGHT_GREEN, legendFontColor: Color.GREEN, legendFontSize: 15 },
                { name: 'Over', calorie: over, color: Color.LIGHT_RED, legendFontColor: Color.RED, legendFontSize: 15 },
            ]
        }

        return ( 
          <View style = { styles.container } >
              <View style = { styles.header } >
                  <Text style = { styles.headerText } > HISTORY </Text> 
              </View > 
              <View style = { styles.row } >
                <TouchableOpacity onPress = { this.left } >
                  <Icon name = "chevron-circle-left"
                    size = { 24 }
                    color = { Color.LIGHT_BLUE }
                  /> 
                </TouchableOpacity > 
                <Text style = { styles.showText } > { historyArr[this.state.index] } </Text> 
                <TouchableOpacity onPress = { this.right } >
                  <Icon name = "chevron-circle-right"
                    size = { 24 }
                    color = { Color.LIGHT_BLUE }
                  /> 
                  </TouchableOpacity > 
                </View> 
                <ScrollView showsVerticalScrollIndicator = { false } >
                  <View style = { styles.center } >
                  <View style = {[styles.row, { width: Size.WIDTH9 }]}> 
                    {/*<DatePicker
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
                        /> */}
                  <Text style = { styles.showText } > Select Date</Text> 
                  <DatePicker style = {{ width: 120 }}
                    date = { this.state.end }
                    mode = "date"
                    placeholder = "End Date"
                    format = "DD MMM YYYY"
                    confirmBtnText = "OK"
                    cancelBtnText = "Cancel"
                    showIcon = { false }
                    customStyles = {{ dateInput: styles.dateInput }}
                    onDateChange = {
                        (date) => this.selectDate(date)
                    }
                  /> 
                </View> 
                <Text style = { styles.sectionTitle } > WEEK VIEW </Text>
                <Text style={styles.month}> ({moment(this.state.start).format('dddd, DD MMM') + ' - ' +moment(this.state.end).format('dddd, DD MMM')}) </Text> 
                <BarChart data = { data }
                  width = { Size.WIDTH }
                  height = { Size.HEIGHT4 }
                  fromZero ={true}
                  style={{marginLeft:-Size.WIDTH1}}
                  chartConfig = { chartConfig }
                  />
                <Text style = { styles.sectionTitle } > MONTH VIEW </Text> 
                <Text style = { styles.month } > ({moment(this.state.end).subtract(29,'days').format('MMM DD,YYYY')} - {moment(this.state.end).format('MMM DD,YYYY')})</Text> 
                {this.state.index != 2 ?
                <View> 
                  <PieChart data = { pieData }
                    width = { Size.WIDTH }
                    height = { 220 }
                    chartConfig = { chartConfig }
                    accessor = "calorie"
                    backgroundColor = "transparent"
                    paddingLeft = { 15 }
                    /> 
                </View> : 
                <View style = {[styles.subContainer, styles.padBottom]}>
                  <MyProgressBar progress = {this.state.level!=''&&this.state.level == 'Medium'?50:(this.state.level=="Low"?0:100)}/> 
                  <View style = {[styles.below, styles.up]}>
                  <Text style = { styles.label } > Mostly done activities </Text> 
                  <Text style = { styles.showText } > {this.state.most_active.length > 0 && this.state.most_active[0].activity_label__name} </Text> 
                </View> 
                <View style = { styles.below } >
                  <Text style = { styles.label } > Day with the most active hours </Text> 
                  <View style = { styles.row } >
                    {this.state.activity_month.length>0 && <CircleWithDate date = {moment(this.state.activity_month[0][1]).format('DD')}
                      month = {moment(this.state.activity_month[0][1]).format('MMM')}
                      min = {parseInt(this.state.activity_month[0][0]/60)}
                      />} 
                  </View > 
                </View> 
                <View style = { styles.below } >
                  <Text style = { styles.label }> Day with the least active hours </Text> 
                  <View style = { styles.row } >
                     {this.state.activity_month.length>0 && <CircleWithDate date = {moment(this.state.activity_month[29][1]).format('DD')}
                      month = {moment(this.state.activity_month[29][1]).format('MMM')}
                      min = {parseInt(this.state.activity_month[29][0]/60)}
                      />} 
                  </View> 
                </View> 
              </View>
            }
            </View> 
          </ScrollView > 
        </View>
    )
  }
}