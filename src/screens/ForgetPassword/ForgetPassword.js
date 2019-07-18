import React from 'react'
import { View, Text, TextInput, StatusBar, Alert } from 'react-native'
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

    if (json.message === 'Success') {
      Alert.alert("Success", `Please check your email.`, [
        {text: 'Done', style: 'cancel'}
      ])
    }
  }

  submitForm = () => {
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

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.GREEN}/>
        <View style={{marginTop:Size.HEIGHT1}}>
          <Title size="small" titleColor={Color.GREEN}/>
        </View>
        <View style={styles.form}>
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
                    value={this.state.email}
                    onChangeText={(val) => this.setState({ email: val })}
                    customStyle={styles.input}
                  />
                </Form>
              {/*<TextInput placeholder="Email Address" style={styles.input} placeholderTextColor={Color.FONT_GREY} onChangeText={(event) => this.onChange(event)}/>*/}
            </View>
            <Button text="SEND RESET LINK" size="long" onPress={this.submitForm} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}
