import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';

import Color from '../../config/Color'

export default class FillProfileAnalysis extends React.Component{
    next = () => {
      this.props.navigation.navigate('Homepage')
    }
    
    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
                <Text style={styles.title}>From the data analysis,</Text>
                <Text style={styles.title}>we can conclude that</Text>
                <Text style={styles.title}>you are</Text>
                <Text style={styles.weight}>"Underweight"</Text>
                <View style={styles.image} />
                <Text style={styles.text}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaderfer
                </Text>
                 <Button text="START" size="short" onPress={this.next} bgColor={Color.GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}