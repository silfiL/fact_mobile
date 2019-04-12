import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import { styles } from './styles';

export default class FillProfileFirst extends React.Component{
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
      this.props.navigation.navigate('FillProfileSecond');
    }

    render(){
        return(
            <View style={styles.container}>
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
                 <Button text="NEXT" size="short" onPress={this.next} bgColor="blue" txtColor="white" />
            </View>
        )
    }
}