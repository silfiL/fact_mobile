import React from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StatusBar, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AIcon from 'react-native-vector-icons/AntDesign'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import Modal from 'react-native-modalbox'
import { styles } from './styles'
import { Badge } from '../../components/Badge';
import { FoodItem } from '../../components/FoodItem'
import NumericInput from 'react-native-numeric-input'
import { CircleWithText } from '../../components/CircleWithText'

import Color from '../../config/Color'

export default class SearchFood extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      value: 0,
      name: '',
      data: [],
      add: {
        id: -1,
        name: '',
        qty: 0,
        fat: 0,
        protein: 0,
        carbohydrate: 0,
        calorie: 0,
        category_intake: 1
      },
      badges: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onQtyChange = this.onQtyChange.bind(this)
    this.onSubmitIntake = this.onSubmitIntake.bind(this)
  }

  back = () => {
    this.props.navigation.goBack();
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
  

  componentDidMount() {
    this.onRefresh()
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
      category_intake: this.props.navigation.state.params.id
    }})
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
      portion={1}
      categories={item.categories}
    />
  );

  onChange (text) {
    this.setState({ name: text })
  }

  async onSubmit() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/food?name=${this.state.name}&category=0`, {headers})
    const json = await response.json()

    const data = json.results.foods
    this.setState({ data })

    console.log("JSON", json)
  }

  onQtyChange(value) {
    let {add} = this.state
    add.qty = value

    this.setState({add})
  }

  async onSubmitIntake() {
    let date = this.props.navigation.state.params.date
    let data = this.state.add
    console.log("params date",date)
    data.year = date.getFullYear()
    data.month = date.getMonth() + 1
    data.day = date.getDate()

    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify(data)
    const response = await fetch('http://103.252.100.230/fact/member/intake/food', {method: "POST", headers, body})
    const json = await response.json()
    if (json.message === "Success") {
      this.setState({isOpen:!this.state.isOpen})
    }
  }

  render(){
    console.log("state badges",this.state.badges)
    return(
      <View style={styles.container}>
          <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
          <View style={styles.header}>
            <HeaderBackButton title="SEARCH FOOD" onPressBack={this.back} iconColor={Color.APP_WHITE} />
            <TextInput autoFocus placeholder="Search Food Name" style={styles.search} placeholderTextColor={Color.LIGHT_GREY} value={this.state.name} onSubmitEditing={this.onSubmit} onChangeText={(event) => this.onChange(event)}/>
          </View>

          {/*<View style={styles.rowSearch}>
            <TouchableOpacity onPress={this.back}>
              <Icon name="md-arrow-round-back" color={Color.APP_WHITE} size={24} />
            </TouchableOpacity>
            <TextInput placeholder="Search Food Name" placeholderTextColor={Color.LIGHT_GREY} style={styles.search} onSubmitEditing={this.onSubmit} onChangeText={(event) => this.onChange(event)}/>
          </View>*/}
         {this.state.data.length === 0 ?<View style={styles.blankContainer} >
          <Text style={styles.text}>Recents</Text>
          <View style={styles.row}>
            {this.state.badges.map(badge=>(
              <Badge text={badge} onPress={()=>this.fillSearch(badge)} bgColor={Color.LIGHT_GREEN} />
            ))}
          </View>
          <View style={styles.center}>
              <Icon name="md-search" size={50} color={Color.FONT_GREY} />
              <Text style={styles.centerText}>You can search using</Text>
              <Text style={styles.centerText}>any keywords or use</Text>
              <Text style={styles.centerText}>the ones in the recents</Text>
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
                  <Text style={styles.kcal}>{parseInt(this.state.add.calorie) * parseInt(this.state.add.qty)}</Text>
                  <Text style={styles.right}>KCAL</Text>
              </View>
            </View>
            <Text style={styles.underline}>Nutrition Informations</Text>
            <View style={[styles.blankRow,styles.marginVertical]}>
              <CircleWithText number={parseInt(this.state.add.carbohydrate) * parseInt(this.state.add.qty)} type="carb" />
              <CircleWithText number={parseInt(this.state.add.protein) * parseInt(this.state.add.qty)} type="pro" />
              <CircleWithText number={parseInt(this.state.add.fat) * parseInt(this.state.add.qty)} type="fat" />
            </View>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity onPress={this.onSubmitIntake}>
                  <Text style={styles.modalButton}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({isOpen:!this.state.isOpen})}>
                  <Text style={styles.modalButton}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}
