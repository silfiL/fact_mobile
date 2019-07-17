import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, AsyncStorage, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import { styles } from './styles';
import Color from '../../config/Color';

const slides = [
  {
    key: '1',
    title: 'For all your goals',
    text: 'A personalized app to help you lose, maintain or gain weight with monthly evaluation.',
    image: require('../../assets/img/3.png'),
    colors: [Color.GREEN,Color.LIGHT_GREEN],
  },
  {
    key: '2',
    title: 'Knowing is half the battle',
    text: 'Help to calculate your daily calories needed and provide with weekly & monthly statistics.',
    image: require('../../assets/img/2.png'),
    colors: [Color.BLUE,Color.LIGHT_BLUE],
  },
  {
    key: '3',
    title: 'Know what you eat',
    text: 'Easily track your calorie and nutrient intake based on our provided food database.',
    image: require('../../assets/img/1.png'),
    colors: [Color.YELLOW,Color.LIGHT_YELLOW],
  },
  {
    key: '4',
    title: 'Also know what you do',
    text: 'Lastly, help to track your activity and the calories burnt based on Human Activity Recognition.',
    image: require('../../assets/img/4.png'),
    colors: [Color.RED,Color.LIGHT_RED],
  }
];

export default class IntroSlider extends React.Component {
  _renderNextButton = () => {
    return (
      <View style={styles.btnContainer}>
        <Icon
          name="right"
          color="white"
          size={24}
          style={{ backgroundColor: 'transparent', fontWeight:'bold' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>DONE</Text>
      </View>
    );
  }
   _renderSkipButton = () => {
    return (
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>SKIP</Text>
      </View>
    );
  }
  _renderItem = (props) => (
    <LinearGradient
      style={[styles.mainContent, {
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}>
      <Image source={props.image} style={styles.image} resizeMode="contain"/>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  _goToNext = async () => {
    console.log("jalan")
    await AsyncStorage.setItem('first_time', "true");
    this.props.navigation.navigate('Base')
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderSkipButton={this._renderSkipButton}
        showSkipButton={true}
        onDone={this._goToNext}
      />
    );
  }
}
