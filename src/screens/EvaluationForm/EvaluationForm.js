import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';

export default class EvaluationForm extends React.Component{
    constructor(props){
        super(props);
    }

    next = () => {
      console.log("coming soon")
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>It's time to evaluate..</Text>
                <Text>Please update according to your current weight and height</Text>
                <Text>Weight</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput keyboardType="numeric" placeholder="Enter Your Weight"/>
                <Text>kg</Text>
                </View>
                <Text>Height</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput keyboardType="numeric" placeholder="Enter Your Height"/>
                <Text>cm</Text>
                </View>
                 <Button text="EVALUATE" size="short" onPress={this.next} bgColor="blue" txtColor="white" />
            </View>
        )
    }
}