import React from 'react'
import { View, FlatList} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { SimpleListItem } from '../../components/SimpleListItem'
import { FloatingButton } from '../../components/FloatingButton'
import { styles } from './styles'

const categoryArr = [{
  id: '1',
  name: 'Activity 1'
},{
  id: '2',
  name: 'Activity 2'
},{
  id: '3',
  name: 'Activity 3'
}]

export default class MyActivity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: categoryArr
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
        <HeaderBackButton onPressBack={this.back} title="MY ACTIVITIES" bgColor="blue"/>
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
        <FloatingButton iconName="plus" />
      </View>
    )
  }
}