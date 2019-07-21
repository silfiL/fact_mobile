import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import TimerCountdown from 'react-native-timer-countdown'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'
import { accelerometer } from "react-native-sensors";

import Color from '../../config/Color'

let subscription = accelerometer

export default class SelfTrain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      timerDone: false,
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

  reset = () => {
    const self = this
    this.setState({totalDuration:25000,timerDone:false, data: []})
    subscription = accelerometer.subscribe(
      ({ x, y, z, timestamp }) => {
        const data = self.state.data
        data.push([timestamp, x, y, z])
      }
    )
  }

  handleTimerComplete = async () => {
    this.setState({totalDuration:null,timerDone:true})
    subscription.unsubscribe()
    alert('Timer is completed')
    console.log(this.state.data.length)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  done = async() => {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      label: this.props.navigation.state.params.id,
      raw_data: this.state.data
    })
    const response = await fetch(`http://103.252.100.230/fact/member/activity`, {headers, body, method: 'POST'})
    const json = await response.json()

    console.log("JSON #1", json)
    if (json.message == "Success")
      this.props.navigation.navigate('SelfTrainSessions')
  }

  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.RED,Color.LIGHT_RED]} style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.RED} iconColor={Color.APP_WHITE}/>
        <View style={styles.form}>
          <View>
            <Text style={styles.text}>To add a new activity, we</Text>
            <Text style={styles.text}>need your help to do the</Text>
            <Text style={styles.text}> instructions below :</Text>
          </View>
          <Text style={styles.activity}>"{this.props.navigation.state.params.label} at the given times"</Text>
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
          {this.state.timerDone &&
              <Icon name="check-circle" size={100} color={Color.APP_WHITE} />}
          {this.state.timerDone &&
            <View>
              <Button text="DONE" bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_RED} size="short" onPress={this.done}/>
              <Button text="RESET" bgColor={Color.TRANSPARENT} border={Color.APP_WHITE} txtColor={Color.APP_WHITE} onPress={this.reset} size="short" />
            </View>
          }
        </View>
      </LinearGradient>
    )
  }
}
