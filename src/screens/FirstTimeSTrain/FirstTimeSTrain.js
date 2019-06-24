import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { Timer } from 'react-native-stopwatch-timer'
import TimerCountdown from 'react-native-timer-countdown'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'

import Color from '../../config/Color'

const activitiesArr = ["Walk Around","Go up and down stairs","Stand Still"]

export default class FirstTimeSTrain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      done: false,
      index: 0
    }
  }

  startTimer = () => {
    this.setState({totalDuration:25000,showButton:false})
  }

  handleTimerComplete = () => {
    this.setState({totalDuration:null})
    alert('Timer is completed')
    this.setState({done:true})
  }

  toDiary = () => {
    this.props.navigation.navigate('Homepage')
  }

  next = () => {
    if (this.state.index == 2)
      this.setState({index:0})
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