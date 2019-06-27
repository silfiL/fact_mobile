import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TimeCard } from '../../components/TimeCard';
import { EmptyCardList } from '../../components/EmptyCardList';
import { FoodItemCard } from '../../components/FoodItemCard';
import { WaveProgress } from '../../components/WaveProgress';
import Color from '../../config/Color'
import Size from '../../config/Size'
import { styles } from './styles'
import moment from 'moment'

export default class Diary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      fill1: 50,
      fill2: 82
    };
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(Color.GREEN, true);
    StatusBar.setTranslucent(true);
  }

  componentWillMount() {
      StatusBar.setBarStyle('light-content');

      if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(Color.GREEN, true);
          StatusBar.setTranslucent(true);
      }
  }

  goToAddFood = () => {
    this.props.navigation.navigate('AddFood')
  }

  goToTrack = () => {
    this.props.navigation.navigate('TrackActivity')
  }

  left = () => {
    let temp = moment(this.state.date).subtract(1,"days");
    this.setState({date:temp})
  }

  right = () => {
    let temp = moment(this.state.date).add(1,"days");
    this.setState({date:temp})
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
        <TouchableOpacity onPress={this.left}>
          <Icon name="chevron-circle-left" size={24} color={Color.APP_WHITE}/>
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
          customStyles={{dateInput:styles.dateInput,dateText:styles.dateText}}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <TouchableOpacity onPress={this.right}>
          <Icon name="chevron-circle-right" size={24} color={Color.APP_WHITE} />
        </TouchableOpacity>
      </View>
  )

  renderToolBar = () => (
      <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.toolbarContent}>
          <View style={styles.roundedRect}>
            <Text style={styles.text}>On the way of maintaining body weight</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <Text style={styles.label}>CALORIE INTAKE</Text>
              <AnimatedCircularProgress
                size={150}
                width={3}
                fill={this.state.fill1}
                tintColor={Color.APP_WHITE}
                backgroundColor={Color.GREEN}
                >
                {
                  (fill) => (
                    <Text style={styles.points}>
                      { this.state.fill1 } KCAL
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
              <Text style={styles.text}>GOAL: 1000 KCAL</Text>
            </View>
            <View style={styles.verticalSeperator}/>
            <View style={styles.center}>
              <Text style={styles.label}>CALORIE BURNT</Text>
              <AnimatedCircularProgress
                size={150}
                width={3}
                fill={this.state.fill2}
                tintColor={Color.APP_WHITE}
                backgroundColor={Color.GREEN}>
                {
                  (fill) => (
                    <Text style={styles.points}>
                      { this.state.fill2 } KCAL
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
              <Text style={styles.text}>GOAL: 1000 KCAL</Text>
            </View>
          </View>
          <Text style={styles.label}>Nutritients</Text>
          <View style={styles.nutrientRow}>
            <WaveProgress type="carb" percent={20}/>
            <WaveProgress type="protein" percent={60}/>
            <WaveProgress type="fat" percent={45}/>
          </View>
        </LinearGradient>
  )

  render() {    
    return (
      <CollapsibleToolbar
            renderContent={this.renderContent}
            renderNavBar={this.renderNavBar}
            renderToolBar={this.renderToolBar}
            imageSource="https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg"
            collapsedNavBarBackgroundColor={Color.GREEN}
            translucentStatusBar
            
            showsVerticalScrollIndicator={false}
        />
    );
  }
}