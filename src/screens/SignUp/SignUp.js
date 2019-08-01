import React from 'react'
import { View, Text, StatusBar, AsyncStorage, Linking, Alert } from 'react-native'
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

const required = value => (value ? undefined : 'This is a required field.');
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please enter a valid email address.' : undefined;
const password = value => value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/i.test(value) ? 'Password minimum 8 and maximum 16 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number' : undefined;
const name = value => value && !/^[a-z].*/i.test(value) ? 'Name should start with letter (A-Z)' : undefined;
const nameLength = value => value && value.length > 30 ? "Name's maximum is 30 characters" : undefined;

export default class SignUp extends React.Component{
  constructor (props) {
    super(props)

    this.state = {
      data: {
        name: '',
        email: '',
        password: '',
        re_password: '',
      },
      errMessage: ''
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
      Alert.alert("Success", `Please check your email.`, [
        {text: 'Done', style: 'cancel'}
      ])
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

    if (this.state.data.password != this.state.data.re_password){
      errors.push({field:"re_password",error:"Password and confirm password must be same"})
    }

    this.setState({ errors: errors });
  }

  componentDidMount() {
    Linking.addEventListener('url', async (event) => {
      let keyIndex = event.url.indexOf('=') + 1
      let key = event.url.substring(keyIndex)
      console.log("Forgot password (event)", event, key)

      let response = await fetch(`http://103.252.100.230/fact/confirm-email/${key}`, {method: 'POST'})
      let json = await response.json()

      if (typeof json.results !== "undefined") {
        await AsyncStorage.setItem('token', json.results.token);
        this.props.navigation.navigate('FillProfileFirst')
      }
    })
  }

  render(){
    return(
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.APP_WHITE}/>
        <Title size="small"/>
        <View style={styles.form}>
          {this.state.errMessage !== '' && <Text style={styles.errMessage}>{this.state.errMessage}</Text>}
          <Form
            ref={(ref) => this.myForm = ref}
            validate={true}
            submit={this.goToFillProfile}
            errors={this.state.errors}
          >
            <Field
              required
              component={FloatingInputField}
              validations={[ required, name, nameLength ]}
              name="name"
              value={this.state.data.name}
              onChangeText={(val) => this.onChange("name",val)}
              customStyle={styles.formInput}
              inputStyle={styles.input}
              labelStyle={styles.labelInput}
              placeholder="Name"
            />
            <Field
              required
              component={FloatingInputField}
              validations={[ required, email ]}
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
              validations={[ required, password ]}
              name="password"
              value={this.state.data.password}
              onChangeText={(val) => this.onChange("password",val)}
              customStyle={styles.formInput}
              password={true}
              inputStyle={styles.input}
              labelStyle={styles.labelInput}
              placeholder="Password"
            />
            <Field
              required
              component={FloatingInputField}
              validations={[ required, password ]}
              name="re_password"
              value={this.state.data.re_password}
              onChangeText={(val) => this.onChange("re_password",val)}
              customStyle={styles.formInput}
              password={true}
              inputStyle={styles.input}
              labelStyle={styles.labelInput}
              placeholder="Re-Password"
            />
          </Form>
          <View style={styles.below}>
            <Button text="SIGN UP" size="long" onPress={this.submitForm} bgColor={Color.APP_WHITE} txtColor={Color.LIGHT_GREEN} />
          </View>
        </View>
        <Footer />
      </LinearGradient>
    )
  }
}
