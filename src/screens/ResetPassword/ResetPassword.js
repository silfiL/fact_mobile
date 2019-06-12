import React from 'react'
import { View, Text, Alert, StatusBar } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'
import Size from '../../config/Size'

export default class ResetPassword extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  save = () => {
      Alert.alert(
      'RESET PASSWORD',
      'Your new password is saved!!!',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
      ],
      {cancelable: false},
    );
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BG_GREY} />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.GREEN}/>
        <View style={{marginTop:Size.HEIGHT1*0.5}}>
          <Title size="small" titleColor={Color.GREEN}/>
        </View>
        <View style={styles.form}>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Enter Email Address</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}>Enter New Password</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={[styles.formInput,styles.below]}>Re-enter New Password</FloatingLabel>
            <Button text="SAVE" size="long" onPress={this.save} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} /> 
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}