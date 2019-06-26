import React from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import { styles } from './styles';

import Color from '../../config/Color'

export default class FillProfileFirst extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gender: 'male',
            data: {
                birth_year: '',
                gender: '',
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

    render(){
        return(
          <View style={styles.container}>
            <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
            <Text style={styles.title}>Let us know you more..</Text>
            <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.label}>Birth Year</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter Birth Year"
                    placeholderTextColor={Color.LIGHT_GREY}
                    value={this.state.data.birth_year}
                    onChangeText={(event) => this.onChange('birth_year', event)}/>
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
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Enter Your Weight"
                      style={styles.input}
                      placeholderTextColor={Color.LIGHT_GREY}
                      value={this.state.data.weight}
                      onChangeText={(event) => this.onChange('weight', event)}/>
                    <Text style={styles.metric}>kg</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Height</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Enter Your Height"
                      style={styles.input}
                      placeholderTextColor={Color.LIGHT_GREY}
                      value={this.state.data.height}
                      onChangeText={(event) => this.onChange('height', event)}/>
                    <Text style={styles.metric}>cm</Text>
                  </View>
                </View>
              </View>
              <Button text="NEXT" size="short" onPress={this.next} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}
