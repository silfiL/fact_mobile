import React from 'react'
import { View, Text, StatusBar, AsyncStorage } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { styles } from './styles'

import Color from '../../config/Color'

export default class ViewMeal extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      calorie: 0,
      fat: 0,
      protein: 0,
      carbohydrate: 0,
      meal_detail: []
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  async onRefresh() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/meal/${this.props.navigation.state.params.id}`, {headers})
    const json = await response.json()

    let {name, calorie, fat, protein, carbohydrate, meal_detail} = this.state
    name = json.results.meal.name
    calorie = json.results.meal.calorie
    fat = json.results.meal.fat
    protein = json.results.meal.protein
    carbohydrate = json.results.meal.carbohydrate
    meal_detail = json.results.meal.meal_detail
    this.setState({name, calorie, fat, protein, carbohydrate, meal_detail})
  }

  componentDidMount() {
    this.onRefresh()
  }

  render(){
    let contains = []

    for (let i = 0, l = this.state.meal_detail.length; i < l; i++) {
      contains.push(
        <View>
          <Text style={styles.text}>{this.state.meal_detail[i].name}</Text>
          <Text style={styles.text}>{this.state.meal_detail[i].calorie} kcal . {this.state.meal_detail[i].qty} serving</Text>
          <Text style={styles.text}> </Text>
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} title="VIEW MEAL" bgColor={Color.BLUE} iconColor={Color.APP_WHITE}/>
        <View style={styles.form}>
          <View style={[styles.row,styles.rowGroup]}>
            <Text style={styles.label}>Meal Name</Text>
            <Text style={styles.text}>{this.state.name}</Text>
          </View>
          <View style={styles.rowGroup}>
            <Text style={styles.label}>Contains of :</Text>
            {contains}
          </View>
          <View style={styles.rowGroup}>
            <Text style={styles.label}>Nutritions Info</Text>
            <View style={styles.infoContainer}>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Calories</Text>
                <Text style={styles.text}>{this.state.calorie} kcal</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Carbs</Text>
                <Text style={styles.text}>{this.state.carbohydrate} g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Protein</Text>
                <Text style={styles.text}>{this.state.protein} g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Fat</Text>
                <Text style={styles.text}>{this.state.fat} g</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
