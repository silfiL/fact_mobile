import React from 'react'
import { View, FlatList, StatusBar} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Button } from '../../components/Button'
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

  toMeal = () => {
    this.props.navigation.navigate('Meal')
  }

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
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} title="ADDED IN MEAL" bgColor={Color.BLUE} iconColor={Color.APP_WHITE}/>
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
        <View style={styles.center}>
          <Button size="long" bgColor={Color.LIGHT_BLUE} text="SAVE AND RETURN TO MEAL" txtColor={Color.APP_WHITE} onPress={this.toMeal} />
        </View>
      </View>
    )
  }
}