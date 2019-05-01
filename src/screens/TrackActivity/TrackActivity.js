import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Button } from '../../components/Button'
import { Stopwatch } from 'react-native-stopwatch-timer'
import { RowThreeListItem } from '../../components/RowThreeListItem'

const resultArr = [{
  id: '1',
  activity: 'Walking',
  time: '10 mins',
  burnt: '200 kcal'
},{
  id: '2',
  activity: 'Stairs',
  time: '3 mins',
  burnt: '200 kcal'
},]

export default class TrackActivity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      stopwatchStart: false,
      stopwatchStop: undefined,
      data: resultArr
    }
  }

  startStopwatch = () => {
    this.setState({stopwatchStart:true})
    this.setState({showButton:false})
  }

  stopStopwatch = () => {
    this.setState({stopwatchStart:false})
    this.setState({stopwatchStop:true})
  }

  _renderItem = ({item}) => (
    <RowThreeListItem
      id={item.id}
      activity={item.activity}
      time={item.time}
      burnt={item.burnt}
    />
  );

  render(){
    return(
      <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        {this.state.showButton &&
        <View>
          <Text>Press the button below to start tracking your activity</Text>
          <Button text="START" bgColor="blue" txtColor="white" onPress={this.startStopwatch} size="short" />
        </View>
        }
        {this.state.stopwatchStart &&
        <View>
          <Text>We're tracking your activity...</Text>
          <Stopwatch laps start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            options={options}
            getTime={this.getFormattedTime} />
          <Button text="STOP" bgColor="blue" txtColor="white" onPress={this.stopStopwatch} size="short" />
        </View>
        }
        {this.state.stopwatchStop &&
        <View style={{alignItems:'center'}}>
          <Text>Tracking Finished</Text>
          <Text>RESULT</Text>
          <FlatList
            data={this.state.data}
            keyExtractor={item=>item.id}
            renderItem={this._renderItem}
          />
        </View>}
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