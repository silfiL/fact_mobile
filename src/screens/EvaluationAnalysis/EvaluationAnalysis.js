import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AIcon from 'react-native-vector-icons/AntDesign'
import { PieChart } from 'react-native-chart-kit'
import Swiper from 'react-native-swiper';
import { MyProgressBar } from '../../components/MyProgressBar';

import {styles} from './styles'
import Color from '../../config/Color'
import Size from '../../config/Size'

const data = [
  { name: 'Below', calorie: 2150000, color: Color.LIGHT_BLUE, legendFontColor: Color.BLUE, legendFontSize: 15 },
  { name: 'Ideal', calorie: 280000, color: Color.LIGHT_GREEN, legendFontColor: Color.GREEN, legendFontSize: 15 },
  { name: 'Over', calorie: 527610, color: Color.LIGHT_RED, legendFontColor: Color.RED, legendFontSize: 15 },
]

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
}

export default class EvaluationAnalysis extends Component {
  goToDiary = () => {
    this.props.navigation.navigate('Homepage')
  }
  
  render(){    
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false} activeDotColor={Color.LIGHT_GREEN} dotColor={Color.LIGHT_GREY}>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Congratulations!!</Text>
          <Text style={styles.text}>You have reached your target</Text>
          <Text style={styles.weightStatus}>"Ideal Body Weight"</Text>
          <Icon name="trophy" size={180} color={Color.LIGHT_YELLOW} />
          <Text style={styles.goodWords}>Hard work pays off</Text>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Here is the review of your</Text>
          <Text style={[styles.text,styles.below]}>1-month Calorie Intake</Text>
          <PieChart
            data={data}
            width={Size.WIDTH}
            height={220}
            chartConfig={chartConfig}
            accessor="calorie"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text style={styles.label}>ADVICE</Text>
          <View style={styles.row}>
            <Text style={styles.advice}>loren ipsmum blada bks sdfsdl df dddd dddddd dddddddd ddddf dfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</Text>
          </View>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <Text style={styles.text}>Here is the review of your</Text>
          <Text style={[styles.text,styles.below]}>1-month Burnt Calorie</Text>
          <PieChart
            data={data}
            width={Size.WIDTH}
            height={220}
            chartConfig={chartConfig}
            accessor="calorie"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text style={styles.label}>ADVICE</Text>
          <View style={styles.row}>
            <Text style={styles.advice}>loren ipsmum blada bks sdfsdl df dddd dddddd dddddddd ddddf dfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</Text>
          </View>
        </View>
        <View style={styles.slide}>
          <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
          <TouchableOpacity style={styles.button} onPress={this.goToDiary}>
            <AIcon name="close" color={Color.FONT_GREY} size={24} />
          </TouchableOpacity>
          <Text style={styles.text}>Here is the review of your</Text>
          <Text style={[styles.text,styles.below]}>1-month Activity Level</Text>
          <View style={{width:Size.WIDTH8}}>
            <Text style={styles.secondLabel}>Activity Level</Text>
            <MyProgressBar progress={22} />
            <View style={styles.group}>
              <Text style={[styles.secondLabel,{marginTop:-Size.HEIGHT*0.05}]}>Total Active Hours :</Text>
              <Text style={styles.info}>20</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.secondLabel}>Mostly Done Activities :</Text>
              <Text style={styles.info}>Walking</Text>
            </View>
          </View>
          <Text style={[styles.label,{marginTop:-Size.HEIGHT*0.12}]}>ADVICE</Text>
          <View style={styles.row}>
            <Text style={styles.advice}>loren ipsmum blada bks sdfsdl df dddd dddddd dddddddd ddddf dfdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</Text>
          </View>
        </View>
      </Swiper>
    );
  }
}