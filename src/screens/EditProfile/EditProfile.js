import React from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import { HeaderBackButton } from '../../components/HeaderBackButton';
import { styles } from './styles';

import Color from '../../config/Color'

export default class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }

    onSelect = (index, value) => {
      console.log(value)
    }
 
    next = () => {
      console.log("do nothing")
    }

    back = () => {
      this.props.navigation.goBack()
    }

    render(){
        return(
          <View style={styles.container}>
            <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
            <HeaderBackButton onPressBack={this.back} iconColor={Color.APP_WHITE} title="EDIT PROFILE" bgColor={Color.RED}/>
            <View style={styles.form}>
              <View style={styles.row}>
                <FloatingLabel
                  labelStyle={styles.labelInput}
                  inputStyle={styles.input}
                  style={styles.formInput}>Name</FloatingLabel>
              </View>
              <View style={styles.row}>
                <FloatingLabel
                  labelStyle={styles.labelInput}
                  inputStyle={styles.input}
                  style={styles.formInput}>Email Address</FloatingLabel>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Birth Year</Text>
                <TextInput style={styles.textInput} keyboardType="numeric" placeholder="Enter Birth Year" placeholderTextColor={Color.LIGHT_GREY}/>
              </View>
              <Text style={styles.label}>Gender</Text>
              <RadioGroup
                style = {styles.inline}
                selectedIndex={0}
                color={Color.LIGHT_GREEN}
                onSelect = {(index, value) => this.onSelect(index, value)}>
                <RadioButton value={'male'} >
                  <Icon name="male" color={Color.FONT_GREY} size={50} />
                  <Text style={styles.radioLabel}>Male</Text>
                </RadioButton>
                <RadioButton value={'female'}>
                  <Icon name="female" color={Color.FONT_GREY} size={50} />
                  <Text>Female</Text>
                </RadioButton>
              </RadioGroup>
              <Button text="SAVE" size="long" onPress={this.next} bgColor={Color.LIGHT_RED} txtColor={Color.APP_WHITE} />
            </View>
          </View>
        )
    }
}