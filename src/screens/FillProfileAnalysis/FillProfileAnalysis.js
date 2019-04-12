import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';

export default class FillProfileAnalysis extends React.Component{
    render(){
        return(
            <View>
                <Text>From the data analysis, we can conclude that you are</Text>
                <Text>Underweight</Text>
                <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </Text>
                 <Button text="START" size="short" onPress={this.next} bgColor="blue" txtColor="white" />
            </View>
        )
    }
}