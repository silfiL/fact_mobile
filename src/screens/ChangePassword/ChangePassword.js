import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'
import Size from '../../config/Size'

export default class ChangePassword extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  doNothing = () => {
    console.log("nothing")
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.APP_WHITE} title="CHANGE PASSWORD" bgColor={Color.RED}/>
        <View style={styles.form}>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}>Current Pasword</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}>New Password</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={[styles.formInput,styles.below]}>Confirm New Password</FloatingLabel>
            <Button text="SAVE" size="long" onPress={this.doNothing} bgColor={Color.LIGHT_RED} txtColor={Color.APP_WHITE} /> 
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}