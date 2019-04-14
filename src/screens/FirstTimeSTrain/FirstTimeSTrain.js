import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from '../../components/Button'
import { Timer } from 'react-native-stopwatch-timer'
import TimerCountdown from 'react-native-timer-countdown'

export default class FirstTimeSTrain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
    }
  }

  startTimer = () => {
    this.setState({totalDuration:25000})
    this.setState({showButton:false})
  }

  handleTimerComplete = () => {
    this.setState({totalDuration:null})
    alert('timer is completed')
  }

  toDiary = () => {
    console.log("lalala")
  }

  render(){
    return(
      <View>
        <Text>You're almost there!!</Text>
        <Text>To increase accuracy, we need your help to do the instructions below :</Text>
        <Text style={{fontWeight:'bold'}}>"Walk Around"</Text>
        {this.state.showButton &&
          <Button text="START" bgColor="blue" txtColor="white" onPress={this.startTimer} size="short" />
        }
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
            style={{ fontSize: 20 }}
        />
        <TouchableOpacity onPress={this.toDiary}>
          <Text>NEXT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}