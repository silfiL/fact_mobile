import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { PieChart } from 'react-native-chart-kit'
import Swiper from 'react-native-swiper';
import { MyProgressBar } from '../../components/MyProgressBar';

import {styles} from './styles'
import Color from '../../config/Color'

const data = [
  { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
}

export default class EvaluationAnalysis extends Component {
  render(){    
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false} activeDotColor={Color.LIGHT_GREEN} dotColor={Color.LIGHT_GREY}>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Congratulations!!</Text>
          <Text>You have reached your target</Text>
          <Text style={{fontWeight:'bold'}}>"Ideal Body Weight"</Text>
          <Icon name="trophy" size={100} />
          <Text style={{fontSize:12}}>Hard work pays off</Text>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Here is review of your</Text>
          <Text style={styles.text}>1-month Calorie Intake</Text>
          <PieChart
            data={data}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text>Advice</Text>
          <Text>loren ipsmum blada bks sdfsdl df ddddddddddddddddddddddf dfd</Text>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Here is review of your</Text>
          <Text style={styles.text}>1-month Burnt Calorie</Text>
          <PieChart
            data={data}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text>Advice</Text>
          <Text>loren ipsmum blada bks sdfsdl df ddddddddddddddddddddddf dfd</Text>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Here is review of your</Text>
          <Text style={styles.text}>1-month Activity Level</Text>
          <Text>Activity Level</Text>
          <MyProgressBar />
          <Text style={{fontWeight:'bold'}}>Total Active Hours :</Text>
          <Text>20</Text>
          <Text style={{fontWeight:'bold'}}>Mostly Done Activities :</Text>
          <Text>Walking</Text>
          <Text>Advice</Text>
          <Text>loren ipsmum blada bks sdfsdl df ddddddddddddddddddddddf dfd</Text>
        </View>
      </Swiper>
    );
  }
}