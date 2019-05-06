import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import TimerCountdown from 'react-native-timer-countdown'

export default class SelfTrain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      timerDone: false,
    }
  }

  startTimer = () => {
    this.setState({totalDuration:25000})
    this.setState({showButton:false})
  }

  reset = () => {
    this.setState({totalDuration:25000})
    this.setState({timerDone:false})
  }

  handleTimerComplete = () => {
    this.setState({totalDuration:null})
    this.setState({timerDone:true})
    alert('timer is completed')
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back}/>
        <Text>To add a new activity, we need your help to do the instructions below :</Text>
        <Text style={{fontWeight:'bold'}}>"Push up at the given times"</Text>
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
        {this.state.timerDone &&
          <View>
            <Button text="DONE" bgColor="blue" txtColor="white" size="short" />
            <Button text="RESET" bgColor="blue" txtColor="white" onPress={this.reset} size="short" />
          </View>
        }
      </View>
    )
  }
}