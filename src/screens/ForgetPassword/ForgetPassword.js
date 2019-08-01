import React from 'react'
import { View, Text, TextInput, StatusBar, Alert, Linking } from 'react-native'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'
import { Form, Field } from 'react-native-validate-form'
import InputField from '../../components/InputField'

import Color from '../../config/Color'
import Size from '../../config/Size'

const required = value => (value ? undefined : "Email address can't be empty.");
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please enter a valid email address.' : undefined;

export default class ForgetPassword extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      errors: [],
      errMessage: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  onChange(email) {
    this.setState({ email })
  }

  sendReset = async () => {
    const body = JSON.stringify({ email: this.state.email })
    const response = await fetch(`http://103.252.100.230/fact/forgot-password`, {method: 'POST', body})
    const json = await response.json()
    console.log("forget json",json)
    if (json.message === 'Success') {
      Alert.alert("Success", `Please check your email.`, [
        {text: 'Done', style: 'cancel'}
      ])
    } else
      this.setState({errMessage:json.message})
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

  submitFailed = () => {
    console.log("Submit Failed")
  }

  async componentDidMount() {
    Linking.addEventListener('url', async (event) => {
      let keyIndex = event.url.indexOf('=') + 1
      let key = event.url.substring(keyIndex)
      console.log("Forgot password (event)", event, key)

      let response = await fetch(`http://103.252.100.230/fact/confirm-forgot-password/${key}`, {method: 'POST'})
      let json = await response.json()

      if (typeof json.results !== "undefined") {
        this.props.navigation.navigate('ResetPassword', {
          email: json.results.email,
          key: key
        })
      }
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.GREEN}/>
        <View style={{marginTop:Size.HEIGHT1}}>
          <Title size="small" titleColor={Color.GREEN}/>
        </View>
        <View style={styles.form}>
            {this.state.errMessage !== '' && <Text style={styles.errMessage}>{this.state.errMessage}</Text>}
            <View style={styles.roundedContainer}>
              <Text style={styles.label}>Please write down your email below</Text>
               <Form
                  ref={(ref) => this.myForm = ref}
                  validate={true}
                  submit={this.sendReset}
                  failed={this.submitFailed}
                  errors={this.state.errors}
                >
                  <Field
                    placeholder="Email Address"
                    required
                    component={InputField}
                    validations={[ required, email ]}
                    name="email"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(val) => this.setState({ email: val })}
                    customStyle={styles.input}
                  />
                </Form>
            </View>
            <Button text="SEND RESET LINK" size="long" onPress={this.submitForm} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}
