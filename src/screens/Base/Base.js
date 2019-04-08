import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class Base extends React.Component{
  toSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  toLogin = () => {
    this.props.navigation.navigate('Login')
  }
  
  render(){
    return(
      <View>
        <Text>App Name</Text>
        <TouchableOpacity onPress={this.toSignUp}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toLogin}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
        <Text>Copyright by Zro2iro</Text>
      </View>
    )
  }
}