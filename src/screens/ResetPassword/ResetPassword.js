import React from 'react'
import { View, Text, Alert, StatusBar } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
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

export default class ResetPassword extends React.Component{
  state = {
    data: {
      email: '',
      password: '',
      re_password: '',
    },
    errMessage: '',
    errors: []
  }

  onChange = (key, text) => {
    if (key === 'email') return;
    const data = this.state.data
    data[key] = text
    this.setState({ data })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  save = async () => {
    this.setState({errMessage: ''})
    let submitResults = this.myForm.validate();

    let errors = [];
    let status = true

    submitResults.forEach(item => {
      errors.push({ field: item.fieldName, error: item.error });
      if (item.error !== '')
        status = false
    });

    if (this.state.data.password != this.state.data.re_password){
      status = false
      errors.push({field:"re_password",error:"Password and confirm password must be same"})
    }

    if (!status) {
      return this.setState({ errors: errors });
    }

    let body = JSON.stringify({
      password: this.state.data.password,
      re_password: this.state.data.re_password
    })
    let {key} = this.props.navigation.state.params
    console.log("HEEEY KEY..........", key)
    let response = await fetch(`http://103.252.100.230/fact/reset-password/${key}`, {method: 'POST', body})
    let json = await response.json()

    if (json.message === "Success") {
      Alert.alert("RESET PASSWORD", `Your new password is saved!!!`, [
        {text: 'Done', style: 'cancel'}
      ])
      return this.props.navigation.navigate('Base')
    }
    else {
      Alert.alert("Error", json.message, [
        {text: 'Done', style: 'cancel'}
      ])
    }
  }

  componentDidMount() {
    let { data } = this.state
    data.email = this.props.navigation.state.params.email
    this.setState({ data })
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content"/>
        <HeaderBackButton onPressBack={this.back} iconColor={Color.GREEN}/>
        <View style={{marginTop:Size.HEIGHT1*0.5}}>
          <Title size="small" titleColor={Color.GREEN}/>
        </View>
        <View style={styles.form}>
          <Form
              ref={(ref) => this.myForm = ref}
              validate={true}
              submit={this.goToFillProfile}
              errors={this.state.errors}
            >
              <Field
                required
                component={FloatingInputField}
                validations={[ required, email ]}
                name="email"
                value={this.state.data.email}
                editable={false}
                disabled={false}
                customStyle={styles.formInput}
                keyboardType="email-address"
                inputStyle={styles.input}
                labelStyle={styles.labelInput}
                placeholder="Enter Email Address"
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
                placeholder="Enter New Password"
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
                placeholder="Re-enter New Password"
              />
            </Form>
            {/* <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Enter Email Address</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={styles.formInput}>Enter New Password</FloatingLabel>
            <FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                password={true}
                style={[styles.formInput,styles.below]}>Re-enter New Password</FloatingLabel> */}
            <Button text="SAVE" size="long" onPress={this.save} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}
