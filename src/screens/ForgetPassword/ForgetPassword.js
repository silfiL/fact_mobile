import React from 'react'
import { View, Text, TextInput, StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'
import Size from '../../config/Size'

export default class ForgetPassword extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  sendReset = () => {
    this.props.navigation.navigate('ResetPassword')
  }
  
  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BG_GREY} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.GREEN}/>
        <View style={{marginTop:Size.HEIGHT1}}>
          <Title size="small" titleColor={Color.GREEN}/>
        </View>
        <View style={styles.form}>
            <View style={styles.roundedContainer}>
              <Text style={styles.label}>Please write down your email below</Text>
              <TextInput placeholder="Email Address" style={styles.input} placeholderTextColor={Color.FONT_GREY} />
            </View>
            <Button text="SEND RESET LINK" size="long" onPress={this.sendReset} bgColor={Color.GREEN} txtColor={Color.APP_WHITE} /> 
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}