import React from 'react'
import { View, FlatList, Text, StatusBar, TouchableOpacity, AsyncStorage, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { ListItemWithButton } from '../../components/ListItemWithButton'
import { FloatingButton } from '../../components/FloatingButton'
import { styles } from './styles'

import Color from '../../config/Color'

export default class Meal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }

    this.onAddMeal = this.onAddMeal.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onSelectMeal = this.onSelectMeal.bind(this)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onLongPress = (id) => {
    this.props.navigation.navigate('ViewMeal',{id})
  };

  _renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.onSelectMeal(item)}>
      <ListItemWithButton
        id={item.id}
        firstLine={item.name}
        secondLine={`${item.calorie} kcal`}
        buttonPress={() => this._onLongPress(item.id)}
        iconName="info"
        iconColor={Color.LIGHT_BLUE}/>
    </TouchableOpacity>
  );

  createMeal = () => {
    this.props.navigation.navigate('CreateMeal', {
      onMealRefresh: this.onRefresh
    })
  }

  async onAddMeal (id) {
    let date = this.props.navigation.state.params.date

    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      id,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      category_intake: this.props.navigation.state.params.id
    })

    const response = await fetch(`http://103.252.100.230/fact/member/intake/meal`, {method: 'POST', body, headers})
    const json = await response.json()

    if (json.message === 'Success') {
      this.props.navigation.state.params.onDiaryRefresh()
      this.props.navigation.navigate('Diary')
    }
  }

  onSelectMeal(item) {
    const self = this
    Alert.alert("Add Meal", `Do you want to eat ${item.name}?`, [
      {text: 'NO', style: 'cancel'},
      {text: 'YES', onPress: () => self.onAddMeal(item.id)}
    ])
  }

  async onRefresh() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/meal?name=all`, {headers})
    const json = await response.json()

    let {data} = this.state
    data = json.results.meals

    this.setState({data})
  }

  componentDidMount() {
    this.onRefresh()
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} title="MEAL" bgColor={Color.BLUE} iconColor={Color.APP_WHITE}/>
        {this.state.data.length==0 ?
        <View style={styles.centerCont}>
            <Icon name="food" size={80} color={Color.FONT_GREY} />
            <Text style={styles.text}>Currently you have no meal data.</Text>
            <Text style={styles.text}>Try to create a new one.</Text>
        </View>:
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
        }
        <FloatingButton iconName="plus" onPress={this.createMeal} bgColor={Color.BLUE}/>
      </View>
    )
  }
}
