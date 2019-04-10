import React from 'react'
import { View, Text } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { styles } from './styles'

export default class SignUp extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  goToFillProfile = () => {
    this.props.navigation.navigate('FillProfileFirst')
  }
  
  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} />
        <View style={styles.container}>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Name</FloatingLabel>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Email Address</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}>Password</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}>Re-Password</FloatingLabel>
            <Button text="SIGN UP" onPress={this.goToFillProfile} bgColor="blue" txtColor="white" /> 
        </View>
        <Text style={styles.footer}>Copyright by Zro2iro</Text>
      </View>
    )
  }
}