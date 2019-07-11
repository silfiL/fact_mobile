import React from 'react'
import { View, Text, SectionList, StatusBar, AsyncStorage, Alert } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'

import Color from '../../config/Color'

export default class RecentFood extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (id) => {
    alert("id"+id)
  };

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      onPressItem={()=>this.onSelectMeal(item)}
      name={item.name}
      calorie={item.calorie}
      portion={item.portion}
    />
  );

  async onRefresh() {
    const token = await AsyncStorage.getItem('token');
    console.log("Token", token)
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/recent`, {headers})
    const json = await response.json()

    console.log("JSON #1", json)
    let data = []
    for (let i = 0, l = json.results.dates.length; i < l; i++) {
      let date = json.results.dates[i]
      let temp = {
        date: (new Date(date)).datetimeformat('date'),
        data: []
      }
      for (let j = 0, k = json.results.foods[date].length; j < k; j++) {
        temp.data.push({
          name: json.results.foods[date][j].name,
          calorie: json.results.foods[date][j].calorie + ' kcal',
          portion: json.results.foods[date][j].qty,
          id: json.results.foods[date][j].id,
          type: json.results.foods[date][j].type
        })
      }
      data.push(temp)
    }

    this.setState({data})
  }

  onSelectMeal(item) {
    console.log(item)
    const self = this
    Alert.alert("Add Meal", `do you want to eat ${item.name} (${item.portion} serving)?`, [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Submit', onPress: () => self.onAddMeal(item.id, item.type)}
    ])
  }

  async onAddMeal (id, type) {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      id, category_intake: this.props.navigation.state.params.id
    })
    console.log(type, body)
    const response = await fetch(`http://103.252.100.230/fact/member/intake/${type}`, {method: 'POST', body, headers})
    const json = await response.json()

    if (json.message === 'Success') {
      this.props.navigation.state.params.onDiaryRefresh()
      this.props.navigation.navigate('Diary')
    }
  }

  componentDidMount() {
    this.onRefresh()
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.GREEN} iconColor={Color.APP_WHITE} title="RECENT" />
        <SectionList
          sections={this.state.data}
          renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { section.date } </Text> }
          renderItem={this._renderItem}
          keyExtractor={ (item, index) => index }
        />
      </View>
    )
  }
}
