import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { styles } from './styles'

export default class Login extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  doNothing = () => {
    console.log("nothing")
  }
  
  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} />
        <View style={styles.container}>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Email Address</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}>Password</FloatingLabel>
            <TouchableOpacity>
              <Text>Forget Password?</Text>
            </TouchableOpacity>
            <Button text="LOGIN" onPress={this.doNothing} bgColor="blue" txtColor="white" /> 
        </View>
        <Text style={styles.footer}>Copyright by Zro2iro</Text>
      </View>
    )
  }
}