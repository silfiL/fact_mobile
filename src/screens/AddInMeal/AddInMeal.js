import React from 'react'
import { View, FlatList, StatusBar, Alert} from 'react-native'
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

  _onPressItem = (item) => {
    let { data } = this.state
    const filteredData = data.filter(x => x.id !== item.id);
    Alert.alert("Remove Food", `Do you want to remove ${item.name} ?`, [
      {text: 'NO', style: 'cancel'},
      {text: 'YES', onPress: () => this.setState({data : filteredData})}
    ])
  };

  toMeal = () => {
    this.props.navigation.state.params.addFoodFromBasket(this.state.data)
    this.props.navigation.navigate('CreateMeal')
  }

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      onLongPress={()=>this._onPressItem(item)}
      name={item.name}
      calorie={`${parseInt(parseFloat(item.calorie) * parseFloat(item.qty))} kcal`}
      portion={item.qty}
      categories={item.categories}
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
