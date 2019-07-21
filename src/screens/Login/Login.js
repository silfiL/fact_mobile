import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import FloatingLabel from 'react-native-floating-labels'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'
import { Form, Field } from 'react-native-validate-form';
import FloatingInputField  from '../../components/FloatingInputField'

import Color from '../../config/Color'
import Size from '../../config/Size'

const required = value => (value ? undefined : 'This is a required field.');
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please enter a valid email address.' : undefined;
const password = value => value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/i.test(value) ? 'Password minimum 8 and maximum 16 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number' : undefined;

export default class Login extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: '',
        password: '',
      },
      errMessage: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  async onChange(key, text) {
    const data = this.state.data
    data[key] = text
    this.setState({ data })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  goToDiary = async () => {
    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://103.252.100.230/fact/login`, {method: 'POST', body})
    const json = await response.json()
    if (typeof json.results !== 'undefined') {
      await AsyncStorage.setItem('token', json.results.token);
      this.props.navigation.navigate('Homepage')
    } else
      this.setState({errMessage : json.message})
  }

  submitForm = () => {
    this.setState({errMessage: ''})
    let submitResults = this.myForm.validate();
 
    let errors = [];
 
    submitResults.forEach(item => {
      errors.push({ field: item.fieldName, error: item.error });
    });
 
    this.setState({ errors: errors });
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
          {this.state.errMessage !== '' && <Text style={styles.errMessage}>{this.state.errMessage}</Text>}
          <Form
            ref={(ref) => this.myForm = ref}
            validate={true}
            submit={this.goToDiary}
            errors={this.state.errors}
          >
            <Field
              required
              component={FloatingInputField}
              validations={[ required ]}
              name="email"
              value={this.state.data.email}
              onChangeText={(val) => this.onChange("email",val)}
              customStyle={styles.formInput}
              keyboardType="email-address"
              inputStyle={styles.input}
              labelStyle={styles.labelInput}
              placeholder="Email Address"
            />
            <Field
              required
              component={FloatingInputField}
              validations={[ required ]}
              name="password"
              value={this.state.data.password}
              onChangeText={(val) => this.onChange("password",val)}
              customStyle={styles.formInput}
              password={true}
              inputStyle={styles.input}
              labelStyle={styles.labelInput}
              placeholder="Password"
            />
          </Form>
          <TouchableOpacity onPress={this.forget} style={styles.forget}>
              <Text style={styles.forgetText}>Forget Password?</Text>
            </TouchableOpacity>
            <Button text="LOGIN" size="long" onPress={this.submitForm} bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} />
        </View>
        <Footer />
      </LinearGradient>
    )
  }
}
