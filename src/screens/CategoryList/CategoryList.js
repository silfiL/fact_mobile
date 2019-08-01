import React from 'react'
import { View, Text, FlatList, StatusBar, TextInput, AsyncStorage, TouchableOpacity } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import AIcon from 'react-native-vector-icons/AntDesign'
import { SimpleListItem } from '../../components/SimpleListItem'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'
import Modal from 'react-native-modalbox'
import NumericInput from 'react-native-numeric-input'
import { CircleWithText } from '../../components/CircleWithText'

import Color from '../../config/Color'

const categoryArr = [{
  id: '1',
  name: 'Category A'
},{
  id: '2',
  name: 'Category B'
},{
  id: '3',
  name: 'Category C'
},{
  id: '4',
  name: 'Category D'
},{
  id: '5',
  name: 'Category E'
},]

export default class CategoryList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      data: [],
      searchView: false,
      name: '',
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
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onQtyChange = this.onQtyChange.bind(this)
    this.onSubmitIntake = this.onSubmitIntake.bind(this)
  }

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230/fact/food-category?name=all`)
    const json = await response.json()

    const data = json.results.categories
    this.setState({ data })
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

  back = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (category, name) => {
    this.props.navigation.navigate('ViewCategory', {
      category,
      name,
      id: this.props.navigation.state.params.id,
      date:  this.props.navigation.state.params.date
    })
  };

  _renderItem = ({item}) => (
    <SimpleListItem
      id={item.id}
      onPressItem={() => this._onPressItem(item.id, item.name)}
      title={item.name}
    />
  );

  render_Item = ({item}) => (
    <FoodItem
      id={item.id}
      onPressItem={() => this.toggleModal(item)}
      name={item.name}
      calorie={item.calorie}
      portion={1}
      categories={item.categories}
    />
  );

  componentDidMount() {
    this.onRefresh()
    console.log("state params id",this.props.navigation.state.params.id)
  }

  onChange (text) {
    this.setState({ name: text })
  }

  async onSubmit() {
    if (this.state.name != ''){
        const token = await AsyncStorage.getItem('token');
        const headers = {"Authorization": 'Bearer ' + token}
        const response = await fetch(`http://103.252.100.230/fact/member/food?name=${this.state.name}&category=0`, {headers})
        const json = await response.json()

        const data = json.results.foods
        this.setState({ data })
        this.setState({searchView:true})
    } else {
        this.onRefresh()
        this.setState({searchView:false})
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.YELLOW} barStyle="light-content" />
        <View style={styles.header}>
            <HeaderBackButton title="CATEGORIES" onPressBack={this.back} iconColor={Color.APP_WHITE} />
            <TextInput placeholder="Search Food Name" style={styles.search} placeholderTextColor={Color.LIGHT_GREY} onSubmitEditing={this.onSubmit} onChangeText={(event) => this.onChange(event)}/>
          </View>
        {/*<HeaderBackButton onPressBack={this.back} bgColor={Color.YELLOW} iconColor={Color.APP_WHITE} title="CATEGORIES"/>*/}
        <FlatList
            extraData={this.state}
            data={this.state.data}
            keyExtractor={item=>item.id}
            renderItem={this.state.searchView?this.render_Item:this._renderItem}
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
