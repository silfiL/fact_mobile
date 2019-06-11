import React from 'react'
import { View, FlatList, Text, StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { ListItemWithButton } from '../../components/ListItemWithButton'
import { FloatingButton } from '../../components/FloatingButton'
import { styles } from './styles'

import Color from '../../config/Color'

const mealArr = [{
  id: '1',
  name: 'Meal 1',
  calorie: '520 kcal'
},{
  id: '2',
  name: 'Meal 2',
  calorie: '600 kcal'
}]

export default class Meal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: mealArr
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onLongPress = (id) => {
    this.props.navigation.navigate('ViewMeal',{mealId:id})
  };

  _renderItem = ({item}) => (
    <ListItemWithButton
      id={item.id}
      firstLine={item.name}
      secondLine={item.calorie}
      buttonPress={this._onLongPress}
      iconName="info"
      iconColor={Color.LIGHT_BLUE}
    />
  );

  createMeal = () => {
    this.props.navigation.navigate('CreateMeal')
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BLUE} barStyle="dark-content" />
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