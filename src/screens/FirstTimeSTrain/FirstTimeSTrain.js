import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import { Button } from '../../components/Button'
import { Timer } from 'react-native-stopwatch-timer'
import TimerCountdown from 'react-native-timer-countdown'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'
import { accelerometer } from "react-native-sensors";

import Color from '../../config/Color'

const activitiesArr = ["Walk Around","Go up and down stairs","Stand Still"]

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
    alert('Timer is completed')
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
    if (this.state.index == 2)
      this.props.navigation.navigate('Homepage')
    else
      this.setState({index:this.state.index+1})
  }

  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.RED,Color.LIGHT_RED]} style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <View style={styles.form}>
          <Text style={styles.h1}>You're almost there!!</Text>
          <View>
            <Text style={styles.text}>To increase accuracy, we</Text>
            <Text style={styles.text}>need your help to do the</Text>
            <Text style={styles.text}>instructions below :</Text>
          </View>
          <Text style={styles.activity}>"{activitiesArr[this.state.index]}"</Text>
          {this.state.showButton == true ?
            <Button text="START" bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_RED} onPress={this.startTimer} size="short" />
          :<TimerCountdown
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
          <TouchableOpacity onPress={this.toDiary}>
            <Text style={styles.button}>REMIND LATER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.next}>
            <Text style={styles.button}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }
}
