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
            gender: 'male'
        }
    }

    onSelect = (index, value) => {
      console.log(value)
    }
 
    next = () => {
      this.props.navigation.navigate('FillProfileSecond');
    }

    render(){
        return(
          <View style={styles.container}>
            <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
            <Text style={styles.title}>Let us know you more..</Text>
            <View style={styles.form}>
                <View style={styles.row}>
                  <Text style={styles.label}>Birth Year</Text>
                  <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter Birth Year" placeholderTextColor={Color.LIGHT_GREY}/>
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
                <View style={styles.row}>
                  <Text style={styles.label}>Weight</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput keyboardType="numeric" placeholder="Enter Your Weight" style={styles.input} placeholderTextColor={Color.LIGHT_GREY}/>
                    <Text style={styles.metric}>kg</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Height</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput keyboardType="numeric" placeholder="Enter Your Height" style={styles.input} placeholderTextColor={Color.LIGHT_GREY}/>
                    <Text style={styles.metric}>cm</Text>
                  </View>
                </View>
              </View>
              <Button text="NEXT" size="short" onPress={this.next} bgColor={Color.GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}