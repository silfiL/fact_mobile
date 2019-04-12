import React from 'react';
import { View, Text } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { Button } from '../../components/Button';
import { styles } from './styles';

export default class FillProfileSecond extends React.Component{
    next = () => {
      this.props.navigation.navigate('FillProfileAnalysis')
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text>Which activity level are you in ?</Text>
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(index, value)}>
                    <RadioButton value={'low'} >
                      <Text>Low Activity Level/Sedentary</Text>
                      <Text>ssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                      </Text>
                    </RadioButton>

                    <RadioButton value={'mod'}>
                      <Text>Moderate Activity Level</Text>
                      <Text>ssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                      </Text>
                    </RadioButton>

                    <RadioButton value={'high'}>
                      <Text>High Activity Level</Text>
                      <Text>ssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                      </Text>
                    </RadioButton>
                </RadioGroup>
                 <Button text="DONE" size="short" onPress={this.next} bgColor="blue" txtColor="white" />
            </View>
        )
    }
}