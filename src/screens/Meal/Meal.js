import React from 'react'
import { View, FlatList, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { ListItemWithButton } from '../../components/ListItemWithButton'
import { FloatingButton } from '../../components/FloatingButton'
import { styles } from './styles'

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
    alert("test",id)
  };

  _renderItem = ({item}) => (
    <ListItemWithButton
      id={item.id}
      firstLine={item.name}
      secondLine={item.calorie}
      buttonPress={this._onLongPress}
      iconName="info"
    />
  );

  createMeal = () => {
    this.props.navigation.navigate('CreateMeal')
  }

  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} title="MEAL" bgColor="blue"/>
        {this.state.data.length==0 ?
        <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
            <Icon name="food" size={80} />
            <Text style={{alignSelf:'center'}}>Currently you have no meal data. Try to create a new one.</Text>
        </View>:
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
        }
        <FloatingButton iconName="plus" onPress={this.createMeal}/>
      </View>
    )
  }
}