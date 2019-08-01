import React from 'react'
import { View, Text, FlatList, StatusBar, AsyncStorage, TextInput, TouchableOpacity} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'
import AIcon from 'react-native-vector-icons/AntDesign'
import Modal from 'react-native-modalbox'
import NumericInput from 'react-native-numeric-input'
import { CircleWithText } from '../../components/CircleWithText'

import Color from '../../config/Color'

const foodArr = [{
  id: '1',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '2',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '3',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '4',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},{
  id: '5',
  name: 'Fried Noodles',
  calorie: '200 KCAL',
  portion: 1
},]

export default class ViewCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
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
    }

    this.onRefresh = this.onRefresh.bind(this)
    this.onQtyChange = this.onQtyChange.bind(this)
    this.onSubmitIntake = this.onSubmitIntake.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  async onRefresh () {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/food?name=all&category=${this.props.navigation.state.params.category}`, {headers})
    const json = await response.json()

    const data = json.results.foods
    console.log("Data", data)
    this.setState({ data })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      onPressItem={() => this.toggleModal(item)}
      name={item.name}
      calorie={item.calorie}
      portion={1}
      categories={item.categories}
    />
  );

  onQtyChange(value) {
    let {add} = this.state
    add.qty = value

    this.setState({add})
  }

  async onSubmitIntake() {
    let date = this.props.navigation.state.params.date
    let data = this.state.add

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

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("did focus")
      this.onRefresh()
    });
  }

  onChange (text) {
    this.setState({ name: text })
  }

  async onSubmit() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/food?name=${this.state.name}&category=${this.props.navigation.state.params.category}`, {headers})
    const json = await response.json()

    const data = json.results.foods
    this.setState({ data })

    console.log("JSON", json)
    // const { data, name } = this.state;
    // this.onRefresh()
    // let newList
    // if (name != ''){
    //   newList = data.filter(d => {
    //     let filter = name.toLowerCase()
    //     return d.name.toLowerCase().match(filter)
    //   })
    //   this.setState({data:newList})
    // }
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.YELLOW} barStyle="light-content" />
        <View style={styles.header}>
            <HeaderBackButton title={this.props.navigation.state.params.name} onPressBack={this.back} iconColor={Color.APP_WHITE} />
            <TextInput placeholder="Search Food Name" style={styles.search} placeholderTextColor={Color.LIGHT_GREY} onSubmitEditing={this.onSubmit} onChangeText={(event) => this.onChange(event)}/>
          </View>
        {/*<HeaderBackButton onPressBack={this.back} bgColor={Color.YELLOW} iconColor={Color.APP_WHITE} title={this.props.navigation.state.params.name}/>*/}
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
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
