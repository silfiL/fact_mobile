import React from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StatusBar, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modalbox'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { styles } from './styles'
import { Badge } from '../../components/Badge';
import { FoodItem } from '../../components/FoodItem'
import NumericInput from 'react-native-numeric-input'
import { CircleWithText } from '../../components/CircleWithText'

import Color from '../../config/Color'
import { FloatingButton } from '../../components/FloatingButton';

export default class SearchFoodMeal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      value: 0,
      search: '',
      data: [],
      add: {
        id: -1,
        name: '',
        qty: 0,
        fat: 0,
        protein: 0,
        carbohydrate: 0,
        calorie: 0,
      },
      foods: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSubmitFood = this.onSubmitFood.bind(this)
  }

  back = () => {
    this.props.navigation.goBack();
  }

  toggleModal = (item) => {
    this.setState({isOpen:!this.state.isOpen})
    this.setState({ add: {
      id: item.id,
      name: item.name,
      qty: 1,
      fat: item.fat,
      protein: item.protein,
      carbohydrate: item.carbohydrate,
      calorie: item.calorie,
    }})
  }

  async onRefresh() {
    const token = await AsyncStorage.getItem('token');
    console.log("Token", token)
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/recent`, {headers})
    const json = await response.json()

    console.log("JSON #1", json)
    if (json.results != undefined){
      let foods = json.results.foods
      let badgeArr = []
      for (food in foods) {
        for(data of foods[food]){
          if (badgeArr.length != 10)
            badgeArr.push(data.name)
          }
        }
        this.setState({badges:badgeArr})
      }
  }

  fillSearch = (item) => {
    this.setState({name: item})
    this.onSubmit()
  }

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      name={item.name}
      onPressItem={() => this.toggleModal(item)}
      calorie={`${item.calorie} kcal`}
      portion={item.qty}
      categories={item.categories}/>
  );

  addInMeal = () => {
    this.props.navigation.navigate('AddInMeal', {foods: this.state.foods, addFoodFromBasket: this.props.navigation.state.params.addFoodFromBasket})
  }

  async onSubmit() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/food?name=${this.state.search}&category=0`, {headers})
    const json = await response.json()

    const data = json.results.foods
    this.setState({ data })

    console.log("JSON", json)
  }

  onChange (text) {
    this.setState({ search: text })
  }

  onSubmitFood() {
    let {add, foods} = this.state
    foods.push(add)
    this.setState({isOpen:!this.state.isOpen, foods})
  }

  onQtyChange(value) {
    let {add} = this.state
    add.qty = value

    this.setState({add})
  }

  render(){
    return(
      <View style={styles.container}>
          <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
          <View style={styles.header}>
            <HeaderBackButton title="SEARCH FOOD" onPressBack={this.back} iconColor={Color.APP_WHITE} />
            <TextInput placeholder="Search Food Name" style={styles.search} placeholderTextColor={Color.LIGHT_GREY} onSubmitEditing={this.onSubmit} onChangeText={(event) => this.onChange(event)}/>
          </View>
          {/*<View style={styles.rowSearch}>
            <TouchableOpacity onPress={this.back}>
              <Icon name="md-arrow-round-back" color={Color.APP_WHITE} size={24} />
            </TouchableOpacity>
            <TextInput placeholder="Search Food" placeholderTextColor={Color.LIGHT_GREY} style={styles.search} onSubmitEditing={this.onSubmit} onChangeText={(event) => this.onChange(event)}/>
          </View>*/}
         {this.state.search==''?<View style={styles.blankContainer} >
          {/*<Text style={styles.text}>Recents</Text>
          <View style={styles.row}>
            {this.state.badges.map(badge=>(
              <Badge text={badge} onPress={()=>this.fillSearch(badge)} bgColor={Color.LIGHT_GREEN} />
            ))}
          </View>*/}
          <View style={styles.center}>
              <Icon name="md-search" size={50} color={Color.FONT_GREY} />
              <Text style={styles.centerText}>You can search using</Text>
              <Text style={styles.centerText}>any keywords</Text>
          </View>
        </View>:
        <View style={styles.blankContainer}>
            <Text style={styles.text}>Search Results</Text>
            <FlatList
              data={this.state.data}
              keyExtractor={item=>item.id}
              renderItem={this._renderItem}
            />
        </View>}
        <Modal style={styles.modal} position="center" isOpen={this.state.isOpen} backdropPressToClose={false}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>ADD FOOD</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <Text style={styles.foodName}>{this.state.add.name}</Text>
            <View style={styles.blankRow}>
              <View style={[styles.row,styles.noMargin]}>
                  <NumericInput
                    initValue={this.state.add.qty}
                    onChange={value => this.onQtyChange(value)}
                    iconSize={18}
                    minValue={1}
                    type="up-down" />
                  <Text style={styles.right}>Serving</Text>
              </View>
              <View style={styles.row}>
                  <Text style={styles.kcal}>{this.state.add.calorie}</Text>
                  <Text style={styles.right}>KCAL</Text>
              </View>
            </View>
            <Text style={styles.underline}>Nutrition Informations</Text>
            <View style={[styles.blankRow,styles.marginVertical]}>
              <CircleWithText number={this.state.add.carbohydrate} type="carb" />
              <CircleWithText number={this.state.add.protein} type="pro" />
              <CircleWithText number={this.state.add.fat} type="fat" />
            </View>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity onPress={this.onSubmitFood}>
                  <Text style={styles.modalButton}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleModal}>
                  <Text style={styles.modalButton}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

        <FloatingButton bgColor={Color.BLUE} iconName="shopping-basket" onPress={this.addInMeal}/>
      </View>
    )
  }
}
