import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

export default class ForgetPassword extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  sendReset = () => {
    this.props.navigation.navigate('ResetPassword')
  }
  
  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} />
        <View style={styles.container}>
            <Text>Logo</Text>
            <Text>Please write down your email below</Text>
            <TextInput placeholder="Email Address" />
            <Button text="SEND RESET LINK" size="long" onPress={this.sendReset} bgColor="blue" txtColor="white" /> 
        </View>
        <Footer />
      </View>
    )
  }
}