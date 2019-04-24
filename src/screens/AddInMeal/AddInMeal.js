import React from 'react'
import { View, Text, FlatList} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Button } from '../../components/Button'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'

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

export default class AddInMeal extends React.Component{
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
      onPressItem={this._onPressItem}
      name={item.name}
      calorie={item.calorie}
      portion={item.portion}
    />
  );

  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} title="Added in Meal" bgColor="blue"/>
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
        <Button size="long" bgColor="blue" text="SAVE AND RETURN TO MEAL" txtColor="white" />
      </View>
    )
  }
}