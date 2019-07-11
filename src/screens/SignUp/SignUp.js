import React from 'react'
import { View, Text, StatusBar, AsyncStorage } from 'react-native'
import FloatingLabel from 'react-native-floating-labels'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'

export default class SignUp extends React.Component{
  constructor (props) {
    super(props)

    this.state = {
      data: {
        name: '',
        email: '',
        password: '',
        re_password: '',
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(key, text) {
    const data = this.state.data
    data[key] = text
    this.setState({ data })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  goToFillProfile = async () => {
    const body = JSON.stringify(this.state.data)
    let response = await fetch(`http://103.252.100.230/fact/register`, {method: 'POST', body})
    let json = await response.json()
    console.log("JSON #1", json)
    if (json.message === 'Success') {
      response = await fetch(`http://103.252.100.230/fact/login`, {method: 'POST', body})
      json = await response.json()

      console.log("JSON #2", json)
      await AsyncStorage.setItem('token', json.results.token);
      this.props.navigation.navigate('FillProfileFirst')
    }
  }

  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.APP_WHITE}/>
        <Title size="small"/>
        <View style={styles.form}>
          <FloatingLabel
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
              value={this.state.data.name}
              onChangeText={(event) => this.onChange('name', event)}>Name</FloatingLabel>
          <FloatingLabel
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              keyboardType="email"
              style={styles.formInput}
              value={this.state.data.email}
              onChangeText={(event) => this.onChange('email', event)}>Email Address</FloatingLabel>
          <FloatingLabel
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              password={true}
              style={styles.formInput}
              value={this.state.data.password}
              onChangeText={(event) => this.onChange('password', event)}>Password</FloatingLabel>
          <FloatingLabel
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              password={true}
              style={[styles.formInput,styles.below]}
              value={this.state.data.re_password}
              onChangeText={(event) => this.onChange('re_password', event)}>Re-Password</FloatingLabel>
          <Button text="SIGN UP" size="long" onPress={this.goToFillProfile} bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} />
        </View>
        <Footer />
      </LinearGradient>
    )
  }
}
