import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
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
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={['#17a2b8','#3bb4c1']} style={styles.container}>
          <Text>App Name</Text>
          <Button text="SIGN UP" size="long" onPress={this.toSignUp} bgColor={Color.TRANSPARENT} txtColor={Color.BG_GREY} border={Color.BG_GREY} />
          <Button text="LOGIN" size="long" onPress={this.toLogin} bgColor={Color.BG_GREY} txtColor={Color.GREEN} /> 
          <Footer />
        
      </LinearGradient>
    )
  }
}