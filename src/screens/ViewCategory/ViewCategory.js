import React from 'react'
import { View, Text, FlatList, StatusBar, AsyncStorage} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'

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
      data: []
    }

    this.onRefresh = this.onRefresh.bind(this)
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

  _onPressItem = (id) => {
    console.log("id",id)
  };

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      onPressItem={()=>this._onPressItem(item.id)}
      name={item.name}
      calorie={item.calorie}
      portion={1}
    />
  );

  componentDidMount() {
    this.onRefresh()
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.YELLOW} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.YELLOW} iconColor={Color.APP_WHITE} title={this.props.navigation.state.params.name}/>
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
