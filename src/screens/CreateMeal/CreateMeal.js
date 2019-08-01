import React from 'react'
import { View, Text, StatusBar, AsyncStorage, ScrollView, Alert } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { FoodItemCard } from '../../components/FoodItemCard';
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'
import { Form, Field } from 'react-native-validate-form';
import FloatingInputField  from '../../components/FloatingInputField'

import Color from '../../config/Color'

const required = value => (value ? undefined : 'This is a required field.');
const name = value => value && !/^[a-z].*/i.test(value) ? 'Meal name should start with letter (A-Z)' : undefined;
const nameLength = value => value && value.length > 30 ? "Meal name's maximum is 40 characters" : undefined;

export default class CreateMeal extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      foods: [],
      errMessage: ''
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

  submitForm = () => {
    this.setState({errMessage: ''})
    let submitResults = this.myForm.validate();
 
    let errors = [];
 
    submitResults.forEach(item => {
      errors.push({ field: item.fieldName, error: item.error });
    });

    this.setState({ errors: errors });
  }

  async onSubmit() {
    if (this.state.foods.length == 0)
      return Alert.alert("Warning","Foods need to be added ",[{text:'OK'}])
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      name: this.state.name,
      food: this.state.foods
    })
    let response = await fetch(`http://103.252.100.230/fact/member/meal`, {method: 'POST', body, headers})
    let json = await response.json()
    console.log("create meal json",json)
    if (json.message === 'Success') {
      this.props.navigation.state.params.onMealRefresh()
      this.props.navigation.navigate('Meal')
    }
    else 
      this.setState({errMessage : json.message})
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
                  {this.state.errMessage !== '' && <Text style={styles.errMessage}>{this.state.errMessage}</Text>}
                  <Form
                    ref={(ref) => this.myForm = ref}
                    validate={true}
                    submit={this.onSubmit}
                    errors={this.state.errors}
                  >
                    <Field
                      required
                      component={FloatingInputField}
                      validations={[ required, name, nameLength ]}
                      name="name"
                      value={this.state.name}
                      onChangeText={this.onChangeName}
                      customStyle={styles.formInput}
                      inputStyle={styles.input}
                      labelStyle={styles.labelInput}
                      placeholder="Meal Name"
                    />
                  {/*<FloatingLabel
                      labelStyle={styles.labelInput}
                      inputStyle={styles.input}
                      style={styles.formInput}
                      onChangeText={this.onChangeName}>Meal Name</FloatingLabel>*/}
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
                  </Form>
                  <Button text="SAVE" size="long" onPress={this.submitForm} bgColor={Color.LIGHT_BLUE} txtColor={Color.APP_WHITE} />
                </View>
              </ScrollView>
          <Footer />
        </View>
    )
  }
}
