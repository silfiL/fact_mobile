import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import FloatingLabel from 'react-native-floating-labels'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'
import Size from '../../config/Size'

export default class Login extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: '',
        password: ''
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

  goToDiary = async () => {
    const body = JSON.stringify(this.state.data)
    console.log("Body",body)
    const response = await fetch(`http://103.252.100.230/fact/login`, {method: 'POST', body})
    const json = await response.json()

    if (typeof json.results !== 'undefined') {
      await AsyncStorage.setItem('token', json.results.token);
      this.props.navigation.navigate('Homepage')
    }
  }

  forget = () => {
    this.props.navigation.navigate('ForgetPassword')
  }

  render(){
    return(
     <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content"/>
        <HeaderBackButton onPressBack={this.back} iconColor={Color.APP_WHITE}/>
        <View style={{marginTop:Size.HEIGHT1}}>
          <Title size="small"/>
        </View>
        <View style={styles.form}>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
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
            <TouchableOpacity onPress={this.forget}>
              <Text style={styles.forget}>Forget Password?</Text>
            </TouchableOpacity>
            <Button text="LOGIN" size="long" onPress={this.goToDiary} bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} />
        </View>
        <Footer />
      </LinearGradient>
    )
  }
}
