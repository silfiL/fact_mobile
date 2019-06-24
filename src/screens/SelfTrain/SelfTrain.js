import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import TimerCountdown from 'react-native-timer-countdown'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'

import Color from '../../config/Color'

export default class SelfTrain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      timerDone: false,
    }
  }

  startTimer = () => {
    this.setState({totalDuration:25000,showButton:false})
  }

  reset = () => {
    this.setState({totalDuration:25000,timerDone:false})
  }

  handleTimerComplete = () => {
    this.setState({totalDuration:null,timerDone:true})
    alert('timer is completed')
  }

  back = () => {
    this.props.navigation.goBack()
  }

  done = () => {
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
          <Text style={styles.activity}>"Push up at the given times"</Text>
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