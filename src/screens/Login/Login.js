import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';


export default class Login extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }
  
  render(){
    return(
      <View>
        <View>
          <TouchableOpacity onPress={this.back}>
            <Icon name="arrowleft" />
          </TouchableOpacity>
        </View>
        <TextInput placeholder="Email Address" />
        <TextInput placeholder="Password" />
        <Text>Forget Password?</Text>
         <TouchableOpacity onPress={this.toLogin}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
        <Text>Copyright by Zro2iro</Text>
      </View>
    )
  }
}