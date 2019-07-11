import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'
import Size from '../../config/Size'

export default class ChangePassword extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: {
        password: '',
        re_password: '',
        old_password: ''
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  onChange(key, text) {
    const data = this.state.data
    data[key] = text
    this.setState({ data })
  }

  doNothing = async () => {
    const token = await AsyncStorage.getItem('token');
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/user`, {method: 'PUT', body, headers})
    const json = await response.json()

    if (json.message === "Success") {
      this.props.navigation.goBack()
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token === null) return this.props.navigation.navigate('Login')

    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/check`, {headers})
    const json = await response.json()
    if (json.message !== "Success") return this.props.navigation.navigate('Login')
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
                style={styles.formInput}
                value={this.state.data.old_password}
                onChangeText={(event) => this.onChange('old_password', event)}>Current Pasword</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}
                value={this.state.data.password}
                onChangeText={(event) => this.onChange('password', event)}>New Password</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={[styles.formInput,styles.below]}
                value={this.state.data.re_password}
                onChangeText={(event) => this.onChange('re_password', event)}>Confirm New Password</FloatingLabel>
            <Button text="SAVE" size="long" onPress={this.doNothing} bgColor={Color.LIGHT_RED} txtColor={Color.APP_WHITE} />
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}
