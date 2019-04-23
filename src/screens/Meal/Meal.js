import React from 'react'
import { View, FlatList, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { SimpleListItem } from '../../components/SimpleListItem'
import { FloatingButton } from '../../components/FloatingButton'
import { styles } from './styles'

const mealArr = [{
  id: '1',
  name: 'Meal 1'
}]

export default class Meal extends React.Component{
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
    console.log("test",id)
  };

  _renderItem = ({item}) => (
    <SimpleListItem
      id={item.id}
      onPressItem={this._onPressItem}
      title={item.name}
    />
  );

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
        <FloatingButton />
      </View>
    )
  }
}