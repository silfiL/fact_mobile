import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage, Alert } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'
import { Form, Field } from 'react-native-validate-form';
import FloatingInputField  from '../../components/FloatingInputField'

import Color from '../../config/Color'
import Size from '../../config/Size'

const required = value => (value ? undefined : 'This is a required field.');
const password = value => value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/i.test(value) ? 'Password minimum 8 and maximum 16 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number' : undefined;
const name = value => value && !/^[a-z].*/i.test(value) ? 'Name should start with letter (A-Z)' : undefined;
const nameLength = value => value && value.length > 30 ? "Name's maximum is 30 characters" : undefined;

export default class ChangePassword extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      data: {
        name: '',
        password: '',
        re_password: '',
        old_password: ''
      },
      errMessage: ''
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
    console.log("change json",json)
    if (json.message === "Success") {
      Alert.alert('Success','User Profile updated !',[{text:'OK',onPress: ()=>this.props.navigation.goBack()}])
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

    if (this.state.data.password != this.state.data.re_password){
      errors.push({field:"re_password",error:"New password and Confirm new password must be same"})
    }
 
    this.setState({ errors: errors });
  }
  
  getName = async() => {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/user`, {headers})
    const json = await response.json();
    
    if (typeof json.results !== 'undefined') {
      this.onChange("name",json.results.name)
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token === null) return this.props.navigation.navigate('Login')

    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/check`, {headers})
    const json = await response.json()
    if (json.message !== "Success") return this.props.navigation.navigate('Login')
    this.getName()
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} iconColor={Color.APP_WHITE} title="EDIT PROFILE" bgColor={Color.RED}/>
        <View style={styles.form}>
            {this.state.errMessage !== '' && <Text style={styles.errMessage}>{this.state.errMessage}</Text>}
            <Form
              ref={(ref) => this.myForm = ref}
              validate={true}
              submit={this.doNothing}
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
                required={this.state.data.password!==''||this.state.data.re_password!==''}
                component={FloatingInputField}
                validations={[ required ]}
                name="old_password"
                value={this.state.data.old_password}
                onChangeText={(val) => this.onChange("old_password",val)}
                customStyle={styles.formInput}
                password={true}
                inputStyle={styles.input}
                labelStyle={styles.labelInput}
                placeholder="Current Password"
              />
              <Field
                required={this.state.data.re_password!==''||this.state.data.old_password!==''}
                component={FloatingInputField}
                validations={[ required, password ]}
                name="password"
                value={this.state.data.password}
                onChangeText={(val) => this.onChange("password",val)}
                customStyle={styles.formInput}
                password={true}
                inputStyle={styles.input}
                labelStyle={styles.labelInput}
                placeholder="New Password"
              />
              <Field
                required={this.state.data.password!==''||this.state.data.old_password!==''}
                component={FloatingInputField}
                validations={[ required, password ]}
                name="re_password"
                value={this.state.data.re_password}
                onChangeText={(val) => this.onChange("re_password",val)}
                customStyle={styles.formInput}
                password={true}
                inputStyle={styles.input}
                labelStyle={styles.labelInput}
                placeholder="Confirm New Password"
              />
            </Form>
          
            {/*<FloatingLabel
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}
                value={this.state.data.name}
                onChangeText={(event) => this.onChange('name', event)}>Name</FloatingLabel>
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
                onChangeText={(event) => this.onChange('re_password', event)}>Confirm New Password</FloatingLabel>*/}
            <View style={styles.below}>
              <Button text="SAVE" size="long" onPress={this.submitForm} bgColor={Color.LIGHT_RED} txtColor={Color.APP_WHITE} />
            </View>
        </View>
        <Footer color={Color.GREEN}/>
      </View>
    )
  }
}
