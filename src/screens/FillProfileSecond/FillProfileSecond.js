import React from 'react';
import { View, Text, StatusBar, AsyncStorage } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { Button } from '../../components/Button';
import { styles } from './styles';

import Color from '../../config/Color'

export default class FillProfileSecond extends React.Component{
    constructor(props) {
      super(props)

      this.state = {
        data: {
          activity_level: ''
        }
      }
    }

    onSelect = (index, value) => {
      console.log(value)
      const data = this.state.data
      data.activity_level = value
      this.setState({ data })
    }

    next = async () => {
      const token = await AsyncStorage.getItem('token');
      const body = JSON.stringify(this.state.data)
      const headers = {"Authorization": 'Bearer ' + token}
      let response = await fetch(`http://103.252.100.230/fact/member/activity-level`, {method: 'POST', body, headers})
      let json = await response.json()
      console.log("JSON #1", json)
      if (json.message === "Success") {
        this.props.navigation.navigate('FillProfileAnalysis');
      }
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

                  <RadioButton value={'medium'}>
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
              <Button text="NEXT" size="short" onPress={this.next} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}
