import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import { Button } from '../../components/Button'
import TimerCountdown from 'react-native-timer-countdown'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'
import { accelerometer } from "react-native-sensors";
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button'

import Color from '../../config/Color'

let activitiesArr = ["Walk Around","Run here and there","Go up and down stairs"]
let doneActivities = []

let subscription = accelerometer

export default class FirstTimeSTrain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      done: false,
      index: 0,
      data: []
    }
  }

  startTimer = () => {
    const self = this
    this.setState({totalDuration:25000,showButton:false})
    subscription = accelerometer.subscribe(
      ({ x, y, z, timestamp }) => {
        const data = self.state.data
        data.push([timestamp, x, y, z])
      }
    )
  }

  handleTimerComplete = async () => {
    this.setState({totalDuration:null})
    alert('Self Train is completed')
    this.setState({done:true})

    subscription.unsubscribe()

    let label = -1
    switch (this.state.index) {
      case 0: label = 2; break;
      case 1: label = 4; break;
      case 2: label = 1; break;
    }

    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      label,
      raw_data: this.state.data
    })
    const response = await fetch(`http://103.252.100.230/fact/member/activity`, {headers, body, method: 'POST'})
    const json = await response.json()
  }

  toDiary = () => {
    this.props.navigation.navigate('Homepage')
  }

  next = () => {
    this.setState({showButton:true,done:false})
    doneActivities.push(activitiesArr[this.state.index])
    activitiesArr.splice(this.state.index,1)
    this.setState({index:0})
  }

  onSelect = (index, value) => {
    this.setState({index:index})
  }

  render(){
    console.log("done",doneActivities)
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.RED,Color.LIGHT_RED]} style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <View style={styles.form}>
          <Text style={styles.h1}>You're almost there!!</Text>
          <View>
            <Text style={styles.text}>To increase accuracy, we</Text>
            <Text style={styles.text}>need your help to do each</Text>
            <Text style={styles.text}>instructions for 25 secs :</Text>
          </View>
          {this.state.showButton == true ? <View style={styles.radio}>
            {doneActivities.map((done)=>
              <View style={styles.row}>
                   <Icon name="check-circle" size={24} color={Color.LIGHT_GREEN} />
                  <Text style={styles.radioText}>{done}</Text>
              </View>
            )}
            <RadioGroup
              thickness={2}
              color={Color.APP_WHITE}
              selectedIndex={this.state.index}
              onSelect = {(index, value) => this.onSelect(index, value)}
            >
              {activitiesArr.map((activity,index) => <RadioButton 
                value={index}
              >
                <Text style={styles.radioText}>{activity}</Text>
              </RadioButton>)}
            </RadioGroup>  
          </View>:<Text style={styles.activity}>"{activitiesArr[this.state.index]}"</Text>}
          {this.state.showButton == true ?
            <Button text="START" bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_RED} onPress={this.startTimer} size="short" />:
          <TimerCountdown
              initialMilliseconds={this.state.totalDuration}
              onTick={(milliseconds) => console.log("tick", milliseconds)}
              onExpire={this.handleTimerComplete}
              formatMilliseconds={(milliseconds) => {
                const remainingSec = Math.round(milliseconds / 1000);
                const seconds = parseInt((remainingSec % 60).toString(), 10);
                const s = seconds ? seconds : '';
                return s;
              }}
              allowFontScaling={true}
              style={[styles.text,styles.timer]}
          />}
          {this.state.done && <Icon name="check-circle" size={100} color={Color.APP_WHITE} />}
        </View>
        <View style={styles.rowButton}>
          <TouchableOpacity onPress={this.toDiary} disabled={!this.state.showButton||doneActivities.length==3}>
            <Text style={[styles.button,!this.state.showButton||doneActivities.length==3?styles.disabledText:null]}>REMIND LATER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.next} disabled={!this.state.done&&doneActivities.length!=3}>
            <Text style={[styles.button,!this.state.done&&doneActivities.length!=3?styles.disabledText:null]}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }
}
