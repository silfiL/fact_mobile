import React from 'react'
import { View, Text, FlatList, StatusBar, AsyncStorage } from 'react-native'
import { Button } from '../../components/Button'
import { Stopwatch } from 'react-native-stopwatch-timer'
import { RowThreeListItem } from '../../components/RowThreeListItem'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from './styles'
import Color from '../../config/Color'
import Size from '../../config/Size'
import { accelerometer } from "react-native-sensors";

let subscription = accelerometer

export default class TrackActivity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showButton: true,
      stopwatchStart: false,
      stopwatchStop: undefined,
      result: [],
      data: []
    }
  }

  startStopwatch = () => {
    const self = this
    this.setState({stopwatchStart:true})
    this.setState({showButton:false})
    subscription = accelerometer.subscribe(
      ({ x, y, z, timestamp }) => {
        const data = self.state.data
        data.push([timestamp, x, y, z])
      }
    )
  }

  stopStopwatch = async () => {
    this.setState({stopwatchStart:false})
    this.setState({stopwatchStop:true})

    subscription.unsubscribe()

    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      raw_data: this.state.data
    })
    const response = await fetch(`http://103.252.100.230/fact/member/burnt`, {headers, body, method: 'POST'})
    const json = await response.json()

    const result = json.results
    this.setState({ result })
  }

  _renderItem = ({item}) => {
    let times = parseInt(item.time)
    let minutes = (times >= 60) ? parseInt(times / 60) : 0
    let seconds = parseInt(times % 60)
    return (<RowThreeListItem
      id={item.id}
      activity={item.label}
      time={`${(minutes > 0) ? minutes + ' min(s) ' : ''}${(seconds > 0) ? seconds + ' sec(s)' : ''}`}
      burnt={`${parseFloat(item.burnt).toFixed(2)} kcal`}
    />)
  };

  back = () => {
    this.props.navigation.goBack()
  }

  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.TRANSPARENT} iconColor={Color.APP_WHITE}/>
         {this.state.showButton &&
          <View style={styles.centerCont}>
            <Text style={styles.text}>Press the button below to start</Text>
            <Text style={[styles.text,styles.below]}>tracking your activity</Text>
            <Button text="START" bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} onPress={this.startStopwatch} size="short" />
          </View>
          }
          {this.state.stopwatchStart &&
          <View style={styles.centerCont}>
            <Text style={[styles.text,styles.below]}>We're tracking your activity...</Text>
            <Stopwatch laps start={this.state.stopwatchStart}
              reset={this.state.stopwatchReset}
              options={options}
              getTime={this.getFormattedTime} />
            <Button text="STOP" bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} onPress={this.stopStopwatch} size="short" />
          </View>
          }
          {this.state.stopwatchStop &&
          <View style={styles.centerCont}>
            <Text style={[styles.text,styles.below]}>Tracking Finished</Text>
            <Text style={[styles.text,styles.smallerBelow]}>RESULT</Text>
            <FlatList
                style={styles.list}
                data={this.state.result}
                keyExtractor={item=>item.id}
                renderItem={this._renderItem}
              />

          </View>}
      </LinearGradient>
    )
  }
}

const options = {
  container: {
    backgroundColor: Color.TRANSPARENT,
    alignItems: 'center',
    width: Size.WIDTH8,
    marginBottom: Size.HEIGHT2
  },
  text: {
    fontSize: 70,
    color: Color.APP_WHITE,
  }
};
