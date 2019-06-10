import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { Button } from '../../components/Button';
import { styles } from './styles';

import Color from '../../config/Color'

export default class FillProfileSecond extends React.Component{
    next = () => {
      this.props.navigation.navigate('FillProfileAnalysis')
    }

    render(){
        return(
            <View style={styles.container}>
              <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
              <Text style={styles.title}>Which activity level are you in ?</Text>
              <RadioGroup
                  size={18}
                  style={styles.radioGroup}
                  color={Color.LIGHT_GREEN}
                  onSelect = {(index, value) => this.onSelect(index, value)}>
                  <RadioButton value={'low'}>
                    <Text style={styles.radioLabel}>Low Activity Level (Sedentary)</Text>
                    <View style={styles.wrapText}>
                      <View style={styles.image}/>
                      <Text style={styles.text}>ssssssssssssssssssssssssssssssss
                      </Text>
                    </View>
                  </RadioButton>

                  <RadioButton value={'mod'}>
                    <Text style={styles.radioLabel}>Moderate Activity Level</Text>
                    <View style={styles.wrapText}>
                      <View style={styles.image}/>
                      <Text style={styles.text}>ssssssssssssssssssssssssssssssss
                      </Text>
                    </View>
                  </RadioButton>

                  <RadioButton value={'high'}>
                    <Text style={styles.radioLabel}>High Activity Level</Text>
                    <View style={styles.wrapText}>
                      <View style={styles.image}/>
                      <Text style={styles.text}>Loren ipsum dslfkjsl dkfjlskjfsljpji wefdkjefjporj ei
                        fsdlkfjsalfjsal dfslsdjflejrepirejeprjwp dflaskfjls skfjiejrpjw kjfdslfjaoisd
                      </Text>
                    </View>
                  </RadioButton>
              </RadioGroup>
              <Button text="NEXT" size="short" onPress={this.next} bgColor={Color.GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}