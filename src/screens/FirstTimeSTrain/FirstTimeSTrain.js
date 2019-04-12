import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../components/Button'
import { Timer } from 'react-native-stopwatch-timer'

const options = {
  container: {
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: 'black',
    marginLeft: 7,
  }
};


export default class FirstTimeSTrain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      timerStart: false,
      totalDuration: 25000
    }
  }

  startTimer = () => {
    this.setState({timerStart:true})
  }

  handleTimerComplete = () => {
    alert('timer is completed')
  }

  render(){
    return(
      <View>
        <Text>You're almost there!!</Text>
        <Text>To increase accuracy, we need your help to do the instructions below :</Text>
        <Text style={{fontWeight:'bold'}}>"Walk Around"</Text>
        <Button text="START" bgColor="blue" txtColor="white" onPress={this.startTimer} size="short" />
        <Timer totalDuration={this.state.totalDuration} start={this.state.timerStart}
          options={options}
          handleFinish={this.handleTimerComplete} />
      </View>
    )
  }
}