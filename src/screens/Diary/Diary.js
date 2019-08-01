import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
  Linking
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
      isSelfTrain: false,
      status: '',
      date: new Date(),
      fill1: 50,
      fill2: 82,
      calorie: {
        intake: 0,
        burnt: 0,
        total_intake: 1,
        total_burnt: 1,
      },
      nutrient: {
        fat: 0,
        protein: 0,
        carbohydrate: 0,
        total_fat: 1,
        total_protein: 1,
        total_carbohydrate: 1
      },
      burnt: [],
      intake: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      },
      recommendation_calorie: {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0,
      },
      recommendation_activity: {
        breakfast: {running: 0, walking: 0, stair:0},
        lunch: {running:0, walking:0, stair: 0},
        dinner: {running:0, walking:0, stair:0},
        snack: {running:0, walking:0, stair:0}
      },
      wave: {
        fat: null,
        protein: null,
        carbohydrate: null,
      },
      activity: []
    };

    this.onRefresh = this.onRefresh.bind(this)
    this.waveRef = this.waveRef.bind(this)
  }

  goToAddFood = (id) => {
    this.props.navigation.navigate('AddFood', {
      id, onDiaryRefresh: this.onRefresh, date: this.state.date
    })
  }

  getStatus = async() => {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/user`, {headers})
    const json = await response.json();
    console.log("status json",json)
    if (typeof json.results !== 'undefined') {
      this.setState({status: json.results.status})
    }
  }

  goToTrack = () => {
    this.props.navigation.navigate('TrackActivity')
  }

  left = async () => {
    let temp = moment(this.state.date).subtract(1,"days");
    await this.setState({date: new Date(temp)})
    await this.onRefresh()
  }

  selectDate = async(date) => {
    this.setState({date: new Date(date)});
    console.log("lala date",this.state.date)
    await this.onRefresh()
  }

  right = async () => {
    let temp = moment(this.state.date).add(1,"days");
    await this.setState({date: new Date(temp)})
    await this.onRefresh()
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = await navigation.addListener("didFocus", async () => {
      console.log("did focus")
      StatusBar.setBackgroundColor(Color.GREEN)
      await this.getStatus()
      await this.onRefresh()
    });
  }

  renderGoal = (status) => {
    status = status.toLowerCase()
    if (status !== ''){
      if (status == "underweight")
        return "On the way to gain proper body weight"
      else if (status == "normal")
        return "On the way to maintain body weight"
      else if (status == "overweight")
        return "On the way to lose some weight"
      else
        return "On the way to lose weight seriously and become healthier"
    } else
      return "--"
  }

  waveRef (ref, type) {
    let {wave} = this.state
    wave[type] = ref
  }

  async onRefresh() {
    console.log("debug")
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    console.log(`year=${this.state.date.getFullYear()}&month=${this.state.date.getMonth() + 1}&day=${this.state.date.getDate()}`)
    const response = await fetch(`http://103.252.100.230/fact/member/diary?year=${this.state.date.getFullYear()}&month=${this.state.date.getMonth() + 1}&day=${this.state.date.getDate()}`, {headers})
    const json = await response.json()

    console.log("JSON #1", json)

    const calorie = json.results.calorie
    const intake = json.results.intake
    const burnt = json.results.burnt
    const nutrient = json.results.nutrient
    const recommendation_calorie = json.results.recommendation_calorie
    const recommendation_activity = json.results.recommendation_activity
    await this.setState({ calorie, intake, burnt, nutrient, recommendation_calorie, recommendation_activity })

    this.state.wave.fat && this.state.wave.fat.setWaterHeight(parseInt(this.state.nutrient.fat * 100 / this.state.nutrient.total_fat))
    this.state.wave.protein && this.state.wave.protein.setWaterHeight(parseInt(this.state.nutrient.protein * 100 / this.state.nutrient.total_protein))
    this.state.wave.carbohydrate && this.state.wave.carbohydrate.setWaterHeight(parseInt(this.state.nutrient.carbohydrate * 100 / this.state.nutrient.total_carbohydrate))

    if (!this.state.isSelfTrain && (json.results.activity[0] === 0 || json.results.activity[1] === 0 || json.results.activity[2] === 0)) {
      this.props.navigation.navigate('FirstTimeSTrain', { activity: json.results.activity })
      this.setState({ isSelfTrain: true })
    }
  }

  confirmDelete = (time, item) => {
    Alert.alert('Remove Food',`Are you sure you want to remove ${item.name} ?`,[
      {text:'NO',style:'cancel'},{text:'YES',onPress:() => this.removeFood(time,item.id)}
    ])
  }

  confirmRemove = (item) => {
    console.log("item",item)
    Alert.alert('Remove Exercise',`Are you sure you want to remove ${item.label} ?`,[
      {text:'NO',style:'cancel'},{text:'YES',onPress:() => this.removeActivity(item.id)}
    ])
  }

  removeActivity = async(idActivity) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const arr = []
    console.log("id activity",idActivity)
    for (id of idActivity)
      arr.push(id)

    const body = JSON.stringify({
      data: arr
    })
    console.log("body",body)
    const response = await fetch(`http://103.252.100.230/fact/member/burnt`,{method:"DELETE",headers,body})
    const json = await response.json()
    if (json.message == 'Success'){
        this.onRefresh()
        Alert.alert('Success',"Deleted successfully",[{text:'OK',style:'cancel'}])
    }
    else
        Alert.alert('Error',json.message,[{text:'OK',style:'cancel'}])
  }

  removeFood = async(time, id) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const arr = []
    arr.push(id)
    const body = JSON.stringify({
      eat_time: time,
      data: arr
    })
    console.log("body",body)
    const response = await fetch(`http://103.252.100.230/fact/member/intake`,{method:"DELETE",headers,body})
    const json = await response.json()
    if (json.message == 'Success'){
        this.onRefresh()
        Alert.alert('Success',"Deleted successfully",[{text:'OK',style:'cancel'}])
    }
    else
        Alert.alert('Error',json.message,[{text:'OK',style:'cancel'}])
  }

  renderContent = () => {
    console.log(this.state.recommendation_calorie)
    let breakfast = (this.state.intake.breakfast.length > 0) ? [] : <EmptyCardList recMin={parseInt(this.state.recommendation_calorie.breakfast) - 50} recMax={parseInt(this.state.recommendation_calorie.breakfast) + 50} onPress={() => this.goToAddFood(1)} text="Food"/>
    let lunch = (this.state.intake.lunch.length > 0) ? [] : <EmptyCardList recMin={parseInt(this.state.recommendation_calorie.lunch) - 50} recMax={parseInt(this.state.recommendation_calorie.lunch) + 50} onPress={() => this.goToAddFood(2)} text="Food"/>
    let dinner = (this.state.intake.dinner.length > 0) ? [] : <EmptyCardList recMin={parseInt(this.state.recommendation_calorie.dinner) - 50} recMax={parseInt(this.state.recommendation_calorie.dinner) + 50} onPress={() => this.goToAddFood(3)} text="Food"/>
    let snack = (this.state.intake.snack.length > 0) ? [] : <EmptyCardList recMin={parseInt(this.state.recommendation_calorie.snack) - 50} recMax={parseInt(this.state.recommendation_calorie.snack) + 50} onPress={() => this.goToAddFood(4)} text="Food"/>
    let exercise = (this.state.burnt.length > 0) ? [] : <EmptyCardList recMin={parseInt(this.state.calorie.total_burnt) - 50} recMax={parseInt(this.state.calorie.total_burnt) + 50} onPress={this.goToTrack} text="Exercise"/>
    let total = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0,
      exercise: 0,
    }
    // let rec_act = {
    //   breakfast: {running: 0, walking: 0, stair:0},
    //   lunch: {running:0, walking:0, stair: 0},
    //   dinner: {running:0, walking:0, stair:0},
    //   snack: {running:0, walking:0, stair:0}
    // }
    for (let i = 0, l = this.state.intake.breakfast.length; i < l; i++) {
      breakfast.push(<FoodItemCard name={this.state.intake.breakfast[i].name} cal={parseFloat(parseFloat(this.state.intake.breakfast[i].calorie) * parseFloat(this.state.intake.breakfast[i].qty)).toFixed(2)} portion={this.state.intake.breakfast[i].qty} onPressItem={()=>this.confirmDelete(1,this.state.intake.breakfast[i])}/>)
      total.breakfast += parseFloat(this.state.intake.breakfast[i].calorie) * parseFloat(this.state.intake.breakfast[i].qty)
    }
    for (let i = 0, l = this.state.intake.lunch.length; i < l; i++) {
      lunch.push(<FoodItemCard name={this.state.intake.lunch[i].name} cal={parseFloat(parseFloat(this.state.intake.lunch[i].calorie) * parseFloat(this.state.intake.lunch[i].qty)).toFixed(2)} portion={this.state.intake.lunch[i].qty} onPressItem={()=>this.confirmDelete(2,this.state.intake.lunch[i])} />)
      total.lunch += parseFloat(this.state.intake.lunch[i].calorie) * parseFloat(this.state.intake.lunch[i].qty)
    }
    for (let i = 0, l = this.state.intake.dinner.length; i < l; i++) {
      dinner.push(<FoodItemCard name={this.state.intake.dinner[i].name} cal={parseFloat(parseFloat(this.state.intake.dinner[i].calorie) * parseFloat(this.state.intake.dinner[i].qty)).toFixed(2)} portion={this.state.intake.dinner[i].qty} onPressItem={()=>this.confirmDelete(3,this.state.intake.dinner[i])} />)
      total.dinner += parseFloat(this.state.intake.dinner[i].calorie) * parseFloat(this.state.intake.dinner[i].qty)
    }
    for (let i = 0, l = this.state.intake.snack.length; i < l; i++) {
      snack.push(<FoodItemCard name={this.state.intake.snack[i].name} cal={parseFloat(parseFloat(this.state.intake.snack[i].calorie) * parseFloat(this.state.intake.snack[i].qty)).toFixed(2)} portion={this.state.intake.snack[i].qty} onPressItem={()=>this.confirmDelete(4,this.state.intake.snack[i])}/>)
      total.snack += parseFloat(this.state.intake.snack[i].calorie) * parseFloat(this.state.intake.snack[i].qty)
    }
    for (let i = 0, l = this.state.burnt.length; i < l; i++) {
      let times = parseInt(this.state.burnt[i].duration)
      let minutes = (times >= 60) ? parseInt(times / 60) : 0
      let seconds = parseInt(times % 60)
      exercise.push(<FoodItemCard name={this.state.burnt[i].label} cal={parseFloat(this.state.burnt[i].calorie).toFixed(2)} portion={`${(minutes > 0) ? minutes + ' min(s) ' : ''}${(seconds > 0) ? seconds + ' sec(s)' : ''}`} noserving onPressItem={()=>this.confirmRemove(this.state.burnt[i])}/>)
      total.exercise += Math.round(parseFloat(this.state.burnt[i].calorie)*100)/100
    }
    return (
      <ScrollView>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content"/>
        <View style={styles.scrollViewContent}>
          <TimeCard time="BREAKFAST" total={total.breakfast} onPress={()=>this.goToAddFood(1)} 
            more={total.breakfast-this.state.recommendation_calorie.breakfast}
            run={parseInt(this.state.recommendation_activity.breakfast.running/60)}
            walk={parseInt(this.state.recommendation_activity.breakfast.walking/60)}
            stair={parseInt(this.state.recommendation_activity.breakfast.stair/60)}
            showButton={this.state.intake.breakfast.length > 0}>
            {breakfast}
          </TimeCard>

          <TimeCard time="LUNCH" total={total.lunch} onPress={()=>this.goToAddFood(2)} 
            more={total.lunch-this.state.recommendation_calorie.lunch}
            run={parseInt(this.state.recommendation_activity.lunch.running/60)}
            walk={parseInt(this.state.recommendation_activity.lunch.walking/60)}
            stair={parseInt(this.state.recommendation_activity.lunch.stair/60)}
            showButton={this.state.intake.lunch.length > 0}>{lunch}</TimeCard>
          <TimeCard time="DINNER" total={total.dinner} onPress={()=>this.goToAddFood(3)} 
            more={total.dinner-this.state.recommendation_calorie.dinner}
            run={parseInt(this.state.recommendation_activity.dinner.running/60)}
            walk={parseInt(this.state.recommendation_activity.dinner.walking/60)}
            stair={parseInt(this.state.recommendation_activity.dinner.stair/60)}
            showButton={this.state.intake.dinner.length > 0}>{dinner}</TimeCard>
          <TimeCard time="SNACK" total={total.snack} onPress={()=>this.goToAddFood(4)} 
            more={total.snack-this.state.recommendation_calorie.snack}
            run={parseInt(this.state.recommendation_activity.snack.running/60)}
            walk={parseInt(this.state.recommendation_activity.snack.walking/60)}
            stair={parseInt(this.state.recommendation_activity.snack.stair/60)}
            showButton={this.state.intake.snack.length > 0}>{snack}</TimeCard>
          <TimeCard time="EXERCISE" total={total.exercise} onPress={this.goToTrack} showButton={this.state.burnt.length > 0}>{exercise}</TimeCard>
        </View>
      </ScrollView>
    )
  }

  renderNavBar = () => (
    <View style={styles.navbarRow}>
      <TouchableOpacity onPress={this.left}>
        <Icon name="chevron-circle-left" size={28} color={Color.APP_WHITE}/>
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
        onDateChange={(date) => this.selectDate(date)}
      />
      <TouchableOpacity onPress={this.right}>
        <Icon name="chevron-circle-right" size={28} color={Color.APP_WHITE} />
      </TouchableOpacity>
    </View>
  )

  renderToolBar = () => (
    <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.GREEN,Color.LIGHT_GREEN]} style={styles.toolbarContent}>
      <View style={styles.roundedRect}>
        <Text style={styles.text}>{this.renderGoal(this.state.status)}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.center}>
          <Text style={styles.label}>CALORIE INTAKE</Text>
          <AnimatedCircularProgress
            size={150}
            width={8}
            rotation={0}
            fill={parseInt(this.state.calorie.intake * 100 / this.state.calorie.total_intake)}
            tintColor={Color.APP_WHITE}
            backgroundColor={Color.GREEN}
            >
            {
              (fill) => (
                <View style={{alignItems:'center'}}>
                    {this.state.calorie.intake > this.state.calorie.total_intake ? <Text style={styles.points}>OVER</Text>:null}
                    <Text style={styles.points}>
                    { this.state.calorie.intake > this.state.calorie.total_intake ? this.state.calorie.intake - this.state.calorie.total_intake : this.state.calorie.intake }
                  </Text>
                  <Text style={[styles.points,styles.kcal]}>KCAL</Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={styles.text}>GOAL: {this.state.calorie.total_intake} KCAL</Text>
        </View>
        <View style={styles.verticalSeperator}/>
        <View style={styles.center}>
          <Text style={styles.label}>CALORIE BURNT</Text>
          <AnimatedCircularProgress
            size={150}
            width={8}
            rotation={0}
            fill={parseInt(this.state.calorie.burnt * 100 / this.state.calorie.total_burnt)}
            tintColor={Color.APP_WHITE}
            backgroundColor={Color.GREEN}>
            {
              (fill) => (
                <View style={{alignItems:'center'}}>
                    {this.state.calorie.burnt > this.state.calorie.total_burnt ? <Text style={styles.points}>OVER</Text>:null}
                    <Text style={styles.points}>
                    { this.state.calorie.burnt > this.state.calorie.total_burnt ? ('OVER ' + this.state.calorie.burnt-this.state.calorie.total_burnt) : Math.round(parseFloat(this.state.calorie.burnt)*100)/100 }
                  </Text>
                  <Text style={[styles.points,styles.kcal]}>KCAL</Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={styles.text}>GOAL: {this.state.calorie.total_burnt} KCAL</Text>
        </View>
      </View>
      <Text style={styles.label}>Nutritients</Text>
      <View style={styles.nutrientRow}>
        <WaveProgress type="carbohydrate" percent={parseInt(this.state.nutrient.carbohydrate * 100 / this.state.nutrient.total_carbohydrate)} waveRef={this.waveRef}/>
        <WaveProgress type="protein" percent={parseInt(this.state.nutrient.protein * 100 / this.state.nutrient.total_protein)} waveRef={this.waveRef}/>
        <WaveProgress type="fat" percent={parseInt(this.state.nutrient.fat * 100 / this.state.nutrient.total_fat)} waveRef={this.waveRef}/>
      </View>
    </LinearGradient>
  )

  componentDidFocus () {
    console.log("")
  }
  render() {
    return (
      <CollapsibleToolbar
        renderContent={this.renderContent}
        renderNavBar={this.renderNavBar}
        renderToolBar={this.renderToolBar}
        imageSource="https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg"
        collapsedNavBarBackgroundColor={Color.GREEN}
        translucentStatusBar={false}
        showsVerticalScrollIndicator={false}>
      </CollapsibleToolbar>
    );
  }
}
