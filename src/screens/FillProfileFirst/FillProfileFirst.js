import React from 'react';
import { View, Text, TextInput, StatusBar, AsyncStorage } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import { Form, Field } from 'react-native-validate-form'
import InputField from '../../components/InputField'
import { styles } from './styles';

import Color from '../../config/Color'

const required = value => (value ? undefined : 'Required');
const weight = value => value && ( value < 30 || value > 200) ? 'Should be in range 30-300' : undefined;
const height = value => value && ( value < 100 || value > 270) ? 'Should be in range 100-270' : undefined;
const isNumber = value => value && (isNaN(parseFloat(value)) && !isFinite(value)) ? 'Should be number' : undefined;
const age = value => value && ((new Date().getFullYear() - value < 20) || (new Date().getFullYear() - value > 70)) ? 'Should be in range 20-70 y.o' : undefined ;

export default class FillProfileFirst extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gender: 'male',
            data: {
                birth_year: '',
                gender: '1',
                weight: '',
                height: ''
            }
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(key, text) {
      const data = this.state.data
      data[key] = text
      this.setState({ data })
    }

    onSelect = (index, value) => {
      console.log(value)
      const data = this.state.data
      data.gender = value
      this.setState({ data })
    }

    next = async () => {
      const token = await AsyncStorage.getItem('token');
      const body = JSON.stringify(this.state.data)
      const headers = {"Authorization": 'Bearer ' + token}
      let response = await fetch(`http://103.252.100.230/fact/member/user`, {method: 'PUT', body, headers})
      let json = await response.json()

      if (json.message === "Success") {
        this.props.navigation.navigate('FillProfileSecond');
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

    render(){
        return(
          <View style={styles.container}>
              <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
              <Text style={styles.title}>Let us know you more..</Text>
              <View style={styles.form}>
                <Form
                  ref={(ref) => this.myForm = ref}
                  validate={true}
                  submit={this.next}
                  errors={this.state.errors} // you still need to pass errors as props to Form
                >
                    <View style={styles.row}>
                      <Text style={styles.label}>Birth Year</Text>
                      <Field
                        required
                        placeholder="Enter Birth Year"
                        component={InputField}
                        validations={[ required, age, isNumber ]}
                        name="birth_year"
                        value={this.state.data.birth_year}
                        onChangeText={(val) => this.onChange('birth_year',val)}
                        customStyle={styles.input}
                        keyboardType="numeric"
                        errors={this.state.errors}
                      />
                      {/* <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter Birth Year"
                        placeholderTextColor={Color.LIGHT_GREY}
                        value={this.state.data.birth_year}
                        onChangeText={(event) => this.onChange('birth_year', event)}/> */}
                    </View>
                    <Text style={styles.label}>Gender</Text>
                    <RadioGroup
                      style = {styles.inline}
                      selectedIndex={0}
                      color={Color.LIGHT_GREEN}
                      onSelect = {(index, value) => this.onSelect(index, value)}>
                      <RadioButton value={'1'} >
                        <Icon name="male" color={Color.FONT_GREY} size={50} />
                        <Text style={styles.radioLabel}>Male</Text>
                      </RadioButton>
                      <RadioButton value={'2'}>
                        <Icon name="female" color={Color.FONT_GREY} size={50} />
                        <Text>Female</Text>
                      </RadioButton>
                    </RadioGroup>
                    <View style={styles.row}>
                      <Text style={styles.label}>Weight</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Field
                            required
                            component={InputField}
                            validations={[ required, weight, isNumber ]}
                            name="weight"
                            placeholder="Enter Your Weight"
                            value={this.state.data.weight}
                            onChangeText={(val) => this.onChange('weight',val)}
                            customStyle={styles.input}
                            keyboardType="numeric"
                            errors={this.state.errors}
                          />
                          {/* <TextInput
                            keyboardType="numeric"
                            placeholder="Enter Your Weight"
                            style={styles.input}
                            placeholderTextColor={Color.LIGHT_GREY}
                            value={this.state.data.weight}
                            onChangeText={(event) => this.onChange('weight', event)}/> */}
                          <Text style={styles.metric}>kg</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Height</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Field
                          required
                          placeholder="Enter Your Height"
                          component={InputField}
                          validations={[ required, height, isNumber ]}
                          name="height"
                          value={this.state.data.height}
                          onChangeText={(val) => this.onChange('height',val)}
                          customStyle={styles.input}
                          keyboardType="numeric"
                          errors={this.state.errors} // explicitly pass down errors as props if your <Field /> is inside an element
                        />
                        {/* <TextInput
                          keyboardType="numeric"
                          placeholder="Enter Your Height"
                          style={styles.input}
                          placeholderTextColor={Color.LIGHT_GREY}
                          value={this.state.data.height}
                          onChangeText={(event) => this.onChange('height', event)}/> */}
                        <Text style={styles.metric}>cm</Text>
                      </View>
                    </View>
                  </Form>
              </View>
              <Button text="NEXT" size="short" onPress={this.submitForm} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}
