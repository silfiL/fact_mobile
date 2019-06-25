import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TimeCard } from '../../components/TimeCard';
import { EmptyCardList } from '../../components/EmptyCardList';

const HEADER_MAX_HEIGHT = 450;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class Diary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      date: new Date(),
      fill1: 50,
      fill2: 82
    };
  }

  goToAddFood = () => {
    this.props.navigation.navigate('AddFood')
  }

  goToTrack = () => {
    this.props.navigation.navigate('TrackActivity')
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.25)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <View style={styles.scrollViewContent}>
              <TimeCard time="BREAKFAST" total={120} onPress={this.goToAddFood} showButton>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10,paddingVertical:5}}>
                  <View>
                      <Text>Fried Rice</Text>
                      <Text>1 serving</Text>
                  </View>
                  <Text>120</Text>
                  
                </View>
              </TimeCard>
              <TimeCard time="LUNCH">
                <EmptyCardList recMin={100} recMax={350} onPress={this.goToAddFood} text="Food"/>
              </TimeCard>
              <TimeCard time="DINNER">
                <EmptyCardList recMin={100} recMax={350} onPress={this.goToAddFood} text="Food"/>
              </TimeCard>
              <TimeCard time="SNACK">
                <EmptyCardList recMin={100} recMax={350} onPress={this.goToAddFood} text="Food"/>
              </TimeCard> 
              <TimeCard time="EXERCISE">
                <EmptyCardList recMin={100} recMax={350} onPress={this.goToTrack} text="Exercise"/>
              </TimeCard>     
          </View>
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <View style={{top:HEADER_MIN_HEIGHT,padding:10}}>
            <View style={{padding:10,borderColor:'white',borderRadius:15,borderWidth:1}}>
              <Text>On the way of maintaining body weight</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View style={{alignItems:'center'}}>
                <Text>CALORIE INTAKE</Text>
                <AnimatedCircularProgress
                  size={150}
                  width={3}
                  fill={this.state.fill1}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875">
                  {
                    (fill) => (
                      <Text style={styles.points}>
                        { this.state.fill1 } KCAL
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
                <Text>GOAL: 1000 KCAL</Text>
              </View>
              <View style={{backgroundColor:'black',width:1,height:100}}/>
              <View style={{alignItems:'center'}}>
                <Text>CALORIE BURNT</Text>
                <AnimatedCircularProgress
                  size={150}
                  width={3}
                  fill={this.state.fill2}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875">
                  {
                    (fill) => (
                      <Text style={styles.points}>
                        { this.state.fill2 } KCAL
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
                <Text>GOAL: 1000 KCAL</Text>
              </View>
            </View>
            <Text>Nutritients</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
              <View style={{borderRadius:50,width:80,height:80,backgroundColor:'white'}}></View>
              <View style={{borderRadius:50,width:80,height:80,backgroundColor:'white'}}></View>
              <View style={{borderRadius:50,width:80,height:80,backgroundColor:'white'}}></View>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity>
                <Icon name="chevron-circle-left" size={20} />
              </TouchableOpacity>
              <DatePicker
                style={{width: 120}}
                date={this.state.date}
                mode="date"
                placeholder="Start Date"
                format="DD MMM YYYY"
                confirmBtnText="OK"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{dateInput:{borderColor:'transparent'}}}
                onDateChange={(date) => {this.setState({date: date})}}
              />
              <TouchableOpacity>
                <Icon name="chevron-circle-right" size={20} />
              </TouchableOpacity>
            </View>
            
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});