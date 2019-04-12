import React from 'react'
import { View, Text, Alert } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

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
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} />
        <View style={styles.container}>
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
                style={styles.formInput}>Re-enter New Password</FloatingLabel>
            <Button text="SAVE" size="long" onPress={this.save} bgColor="blue" txtColor="white" /> 
        </View>
        <Footer />
      </View>
    )
  }
}