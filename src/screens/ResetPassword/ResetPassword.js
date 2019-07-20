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
  back = () => {
    this.props.navigation.goBack()
  }

  save = () => {
      Alert.alert(
      'RESET PASSWORD',
      'Your new password is saved!!!',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
      ],
      {cancelable: false},
    );
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
          {/* <Form
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
                onChangeText={(val) => this.onChange("email",val)}
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
            </Form> */}
            <FloatingLabel 
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
                style={[styles.formInput,styles.below]}>Re-enter New Password</FloatingLabel>
            <Button text="SAVE" size="long" onPress={this.save} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} /> 
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}