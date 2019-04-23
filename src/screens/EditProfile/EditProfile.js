import React from 'react';
import { View, Text, TextInput } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import { styles } from './styles';

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

    render(){
        return(
            <View style={styles.container}>
                <FloatingLabel
                  labelStyle={styles.labelInput}
                  inputStyle={styles.input}
                  style={styles.formInput}>Name</FloatingLabel>
                <FloatingLabel
                  labelStyle={styles.labelInput}
                  inputStyle={styles.input}
                  style={styles.formInput}>Email Address</FloatingLabel>
                <Text style={styles.title}>Let us know you more..</Text>
                <Text>Birth Year</Text>
                <TextInput keyboardType="numeric" placeholder="Enter Birth Year"/>
                <Text>Gender</Text>
                <RadioGroup
                    style = {{flexDirection:'row'}}
                    onSelect = {(index, value) => this.onSelect(index, value)}>
                    <RadioButton value={'male'} >
                      <Icon name="male" color="black" size={30} />
                      <Text>Male</Text>
                    </RadioButton>

                    <RadioButton value={'female'}>
                      <Icon name="female" color="black" size={30} />
                      <Text>Female</Text>
                    </RadioButton>
                </RadioGroup>
                 <Button text="SAVE" size="long" onPress={this.next} bgColor="blue" txtColor="white" />
            </View>
        )
    }
}