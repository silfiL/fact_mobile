import React from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';

import Color from '../../config/Color'

export default class EvaluationForm extends React.Component{
    constructor(props){
        super(props);
    }

    next = () => {
        this.props.navigation.navigate('EvaluationAnalysis')
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content"/>
                <Text style={styles.title}>It's time to evaluate..</Text>
                <Text style={styles.text}>Please update according to your</Text>
                <Text style={styles.text}>current weight and height</Text>
                <View style={styles.form}>
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
              <Button text="EVALUATE" size="short" onPress={this.next} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}