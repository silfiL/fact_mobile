import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import FloatingLabel from 'react-native-floating-labels'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'

export default class SignUp extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  goToFillProfile = () => {
    this.props.navigation.navigate('FillProfileFirst')
  }
  
  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.APP_WHITE}/>
        <Title size="small"/>
        <View style={styles.form}>
          <FloatingLabel 
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}>Name</FloatingLabel>
          <FloatingLabel 
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              keyboardType="email"
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
              style={[styles.formInput,styles.below]}>Re-Password</FloatingLabel>
          <Button text="SIGN UP" size="long" onPress={this.goToFillProfile} bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} /> 
        </View>
        <Footer />
      </LinearGradient>
    )
  }
}