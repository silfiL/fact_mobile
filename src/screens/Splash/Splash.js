import React from 'react'
import { View, Text, StatusBar, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { Footer } from '../../components/Footer'
import { styles } from './styles'
import Color from '../../config/Color'

export default class Base extends React.Component{
  componentDidMount () {
    setTimeout(async () => {
      const firstTime = await AsyncStorage.getItem('first_time')
      if (firstTime === null)
        return this.props.navigation.navigate('App2')

      const token = await AsyncStorage.getItem('token');
      if (token === null)
        return this.props.navigation.navigate('App3')

      const headers = {"Authorization": 'Bearer ' + token}
      const response = await fetch(`http://103.252.100.230/fact/check`, {headers})
      const json = await response.json()
      if (json.message === "Success")
        return this.props.navigation.navigate('App4')

      return this.props.navigation.navigate('App3')
    }, 1000);
  }

  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
        <Title size="large" />
        <View style={styles.buttonContainer}/>
      </LinearGradient>
    )
  }
}
