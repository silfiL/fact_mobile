import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
import { styles } from './styles'

export default class Base extends React.Component{
  toSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  toLogin = () => {
    this.props.navigation.navigate('Login')
  }
  
  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={['#91e1f2','#4d9fdd']} style={styles.container}>
          <Text>App Name</Text>
          <Button text="SIGN UP" onPress={this.toSignUp} bgColor="blue" txtColor="white" />
          <Button text="LOGIN" onPress={this.toLogin} bgColor="blue" txtColor="white" /> 
          <Text style={styles.footer}>Copyright by Zro2iro</Text>
        
      </LinearGradient>
    )
  }
}