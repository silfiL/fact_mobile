import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { styles } from './styles';

export default class FillProfileFirst extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }
        
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Let us know you more..</Text>
                <Text>Birth Year</Text>
                <TextInput keyboardType="numeric" placeholder="Enter Birth Year"/>
                <Text>Gender</Text>
            </View>
        )
    }
}