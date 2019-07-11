import React from 'react'
import { View, Text, StatusBar, AsyncStorage, ScrollView } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { FoodItemCard } from '../../components/FoodItemCard';
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'

export default class CreateMeal extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      foods: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.addFoodFromBasket = this.addFoodFromBasket.bind(this)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  addFood = () => {
    this.props.navigation.navigate('SearchFoodMeal', {addFoodFromBasket: this.addFoodFromBasket})
  }

  addFoodFromBasket(foods) {
    this.setState({foods})
  }

  onChangeName(name) {
    this.setState({ name })
  }

  async onSubmit() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      name: this.state.name,
      food: this.state.foods
    })
    let response = await fetch(`http://103.252.100.230/fact/member/meal`, {method: 'POST', body, headers})
    let json = await response.json()

    if (json.message === 'Success') {
      this.props.navigation.state.params.onMealRefresh()
      this.props.navigation.navigate('Meal')
    }
    else alert('Error')
  }

  render(){
    let containFood = []
    let calorie = 0
    let fat = 0
    let protein = 0
    let carbohydrate = 0
    for (let i = 0, l = this.state.foods.length; i < l; i++) {
      calorie += parseInt(parseFloat(this.state.foods[i].calorie) * parseFloat(this.state.foods[i].qty))
      fat += parseInt(parseFloat(this.state.foods[i].fat) * parseFloat(this.state.foods[i].qty))
      protein += parseInt(parseFloat(this.state.foods[i].protein) * parseFloat(this.state.foods[i].qty))
      carbohydrate += parseInt(parseFloat(this.state.foods[i].carbohydrate) * parseFloat(this.state.foods[i].qty))
      containFood.push(
        <View>
          <Text style={styles.text}>{this.state.foods[i].name}</Text>
          <Text style={styles.text}>{parseInt(parseFloat(this.state.foods[i].calorie) * parseFloat(this.state.foods[i].qty))} kcal . {this.state.foods[i].qty} serving</Text>
          <Text style={styles.text}> </Text>
        </View>
      )
    }

    return(
        <View style={styles.container}>
          <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
          <HeaderBackButton onPressBack={this.back} title="CREATE MEAL" bgColor={Color.BLUE} iconColor={Color.APP_WHITE} />

      <ScrollView>
          <View style={styles.form}>
              <FloatingLabel
                  labelStyle={styles.labelInput}
                  inputStyle={styles.input}
                  style={styles.formInput}
                  onChangeText={this.onChangeName}>Meal Name</FloatingLabel>
              <View style={styles.rowGroup}>
                <Text style={styles.label}>Contains :</Text>
                <View>{containFood}</View>
                <Button text="ADD FOOD" size="short" bgColor={Color.TRANSPARENT} txtColor={Color.BLUE} border={Color.BLUE} onPress={this.addFood}/>
              </View>
              <Text style={styles.label}>Nutritions Info :</Text>
              <View style={styles.infoContainer}>
                <View style={[styles.row,styles.rowGroup]}>
                  <Text style={styles.label}>Calories</Text>
                  <Text style={styles.text}>{calorie} kcal</Text>
                </View>
                <View style={[styles.row,styles.rowGroup]}>
                  <Text style={styles.label}>Carbs</Text>
                  <Text style={styles.text}>{carbohydrate} g</Text>
                </View>
                <View style={[styles.row,styles.rowGroup]}>
                  <Text style={styles.label}>Protein</Text>
                  <Text style={styles.text}>{protein} g</Text>
                </View>
                <View style={[styles.row,styles.rowGroup]}>
                  <Text style={styles.label}>Fat</Text>
                  <Text style={styles.text}>{fat} g</Text>
                </View>
              </View>
              <Button text="SAVE" size="long" onPress={this.onSubmit} bgColor={Color.LIGHT_BLUE} txtColor={Color.APP_WHITE} />
          </View>
          </ScrollView>
          <Footer />
        </View>
    )
  }
}
