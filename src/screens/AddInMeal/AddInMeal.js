import React from 'react'
import { View, FlatList, StatusBar} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Button } from '../../components/Button'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'

import Color from '../../config/Color'

export default class AddInMeal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (id) => {
    console.log("id",id)
  };

  toMeal = () => {
    this.props.navigation.state.params.addFoodFromBasket(this.state.data)
    this.props.navigation.navigate('CreateMeal')
  }

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      onPressItem={this._onPressItem}
      name={item.name}
      calorie={`${parseInt(parseFloat(item.calorie) * parseFloat(item.qty))} kcal`}
      portion={item.qty}
    />
  );

  componentDidMount() {
    let {data} = this.state
    data = this.props.navigation.state.params.foods
    this.setState({data})
  }

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
          <Button size="long" bgColor={Color.LIGHT_BLUE} text="SAVE AND RETURN TO CREATE MEAL" txtColor={Color.APP_WHITE} onPress={this.toMeal} />
        </View>
      </View>
    )
  }
}
