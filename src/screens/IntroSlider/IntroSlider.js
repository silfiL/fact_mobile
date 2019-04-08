import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import {styles} from './styles';

const slides = [
  {
    key: 'somethun',
    title: 'Quick setup, good defaults',
    text: 'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
    icon: 'md-checkmark',
    colors: ['#006762', '#062d42'],
  },
  {
    key: 'somethun1',
    title: 'Super customizable',
    text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
    icon: 'md-checkmark',
    colors: ['#135998', '#0e2f44'],
  },
  {
    key: 'somethun2',
    title: 'No need to buy me beer',
    text: 'Usage is all free',
    icon: 'md-checkmark',
    //colors: ['#43cd80','#6eddaf']
    colors: ['#91e1f2','#4d9fdd'],
  },
  {
    key: 'somethun3',
    title: 'No need to buy me beer',
    text: 'Usage is all free',
    icon: 'md-checkmark',
    colors: ['#ffd700','#ffa500'],
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
  _renderItem = props => (
    <LinearGradient
      style={[styles.mainContent, {
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
      <Ionicons style={{ backgroundColor: 'transparent' }} name={props.icon} size={200} color="white" />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );
  _goToNext = () => {
    console.log("jalan")
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