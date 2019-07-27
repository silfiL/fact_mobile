import React from 'react';
import { View, Text, StatusBar, AsyncStorage, Alert, Image } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { Button } from '../../components/Button';
import { styles } from './styles';

import Color from '../../config/Color'
import { ScrollView } from 'react-native-gesture-handler';

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
      if (this.state.data.activity_level === '')
        return Alert.alert("Warning","Required Field can't be empty",[{text: 'OK'}])
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
          <ScrollView>
            <View style={styles.container}>
              <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
              <Text style={styles.title}>Which activity level are you in ?</Text>
              <RadioGroup
                  size={18}
                  style={styles.radioGroup}
                  color={Color.LIGHT_GREEN}
                  onSelect = {(index, value) => this.onSelect(index, value)}>
                  <RadioButton value={'Low'}>
                    <Text style={styles.radioLabel}>Sedentary or Lightly Active</Text>
                    <View style={styles.wrapText}>
                      <Image style={styles.image} source={require('../../assets/img/light.png')}/>
                      <Text style={styles.text}>75% of sitting/standing and 25% of standing/moving. Example of jobs : Designer, Office (Desk) Employee, Teacher, Host, and etc. In leisure time, have little or no exercise. Doing housework is included in this level. If doing exercise will be about 1-2 days/week.
                      </Text>
                    </View>
                  </RadioButton>

                  <RadioButton value={'Medium'}>
                    <Text style={styles.radioLabel}>Active or Moderately Active</Text>
                    <View style={styles.wrapText}>
                      <Image style={styles.image} source={require('../../assets/img/medium.png')}/>
                      <Text style={styles.text}>40% of sitting/standing and 60% of working (moving). Example of jobs : Nurse, Chef, Server at restaurants, Trainer, and etc. Example of exercises such as light swimming/cycling, jogging, playing double tennis and etc. Gardening is included in this level of activity. If doing exercise will be about 3-5 days/week.
                      </Text>
                    </View>
                  </RadioButton>

                  <RadioButton value={'High'}>
                    <Text style={styles.radioLabel}>Very Active or Vigorously Active</Text>
                    <View style={styles.wrapText}>
                      <Image style={styles.image} source={require('../../assets/img/very.png')}/>
                      <Text style={styles.text}>25% of sitting/standing and 75% of working (lifting and moving). Jobs that demand physical strength are included in this level such as construction workers, farmer. athlete and etc. Example of exercises such as swimming laps, running, hiking, jumping rope, playing single tennis and etc. If doing exercise will be about 6-7 days/week and 2 times/day for athlete.
                      </Text>
                    </View>
                  </RadioButton>
              </RadioGroup>
              <Button text="NEXT" size="short" onPress={this.next} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
            </View>
          </ScrollView>
        )
    }
}
