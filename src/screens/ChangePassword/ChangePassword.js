import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

export default class ChangePassword extends React.Component{
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
                style={styles.formInput}>Confirm New Password</FloatingLabel>
            <Button text="SAVE" size="long" onPress={this.doNothing} bgColor="blue" txtColor="white" /> 
        </View>
        <Footer />
      </View>
    )
  }
}