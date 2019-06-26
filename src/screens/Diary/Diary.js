import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TimeCard } from '../../components/TimeCard';
import { EmptyCardList } from '../../components/EmptyCardList';
import { FoodItemCard } from '../../components/FoodItemCard';
import Color from '../../config/Color'
import Size from '../../config/Size'
import { styles } from './styles'

export default class Diary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      fill1: 50,
      fill2: 82
    };
  }

  componentWillMount() {
      StatusBar.setBarStyle('light-content');

      if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(Color.GREEN, true);
      }
  }

  goToAddFood = () => {
    this.props.navigation.navigate('AddFood')
  }

  goToTrack = () => {
    this.props.navigation.navigate('TrackActivity')
  }

  renderContent = () => (
    <ScrollView>
      <View style={styles.scrollViewContent}>
            <TimeCard time="BREAKFAST" total={120} onPress={this.goToAddFood} showButton>
              <FoodItemCard name="Fried Rice" cal={120} portion={1}/>
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
    </ScrollView>
  )

  renderNavBar = () => (
      <View style={styles.navbarRow}>
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
  )

  renderToolBar = () => (
      <View style={styles.toolbarContent}>
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
  )

  render() {    
    return (
      <CollapsibleToolbar
            renderContent={this.renderContent}
            renderNavBar={this.renderNavBar}
            renderToolBar={this.renderToolBar}
            imageSource="https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg"
            collapsedNavBarBackgroundColor={Color.LIGHT_GREEN}
            translucentStatusBar
            toolBarHeight={Size.HEIGHT5}
            showsVerticalScrollIndicator={false}
        />
    );
  }
}