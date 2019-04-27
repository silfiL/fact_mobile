import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from '../../components/Button'
import { Stopwatch } from 'react-native-stopwatch-timer'

export default class TrackActivity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      stopwatchStart: false,

    }
  }

  startTimer = () => {
    this.setState({stopwatchStart:true})
    this.setState({showButton:false})
  }

  stopStopwatch = () => {
    this.setState({stopwatchStart:false})
  }

  render(){
    return(
      <View>
        <Text>Press the button below to start tracking your activity</Text>
        
        {this.state.showButton &&
          <Button text="START" bgColor="blue" txtColor="white" onPress={this.startTimer} size="short" />
        }
        <Stopwatch laps start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} />
        <TouchableOpacity onPress={this.stopStopwatch}>
          <Text>STOP</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};