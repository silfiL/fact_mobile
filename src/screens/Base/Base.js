import React from 'react'
import { View, Text, StatusBar, AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { Footer } from '../../components/Footer'
import { styles } from './styles'
import Color from '../../config/Color'

export default class Base extends React.Component{
  toSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  toLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.container}>
          <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
          <Title size="large" />
          <View style={styles.buttonContainer}>
            <Button text="SIGN UP" size="long" onPress={this.toSignUp} bgColor={Color.TRANSPARENT} txtColor={Color.APP_WHITE} border={Color.APP_WHITE} />
            <Button text="LOGIN" size="long" onPress={this.toLogin} bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} />
          </View>
          <Footer />
      </LinearGradient>
    )
  }
}
