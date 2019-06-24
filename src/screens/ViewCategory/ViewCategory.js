import React from 'react'
import { View, Text, FlatList, StatusBar} from 'react-native'
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
      data: foodArr
    }
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
      portion={item.portion}
    />
  );

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.YELLOW} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.YELLOW} iconColor={Color.APP_WHITE} title="CATEGORY A"/>
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}