import React from 'react'
import { View, Text, FlatList} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { SimpleListItem } from '../../components/SimpleListItem'
import { styles } from './styles'

const categoryArr = [{
  id: '1',
  name: 'Category A'
},{
  id: '2',
  name: 'Category B'
},{
  id: '3',
  name: 'Category C'
},{
  id: '4',
  name: 'Category D'
},{
  id: '5',
  name: 'Category E'
},]

export default class CategoryList extends React.Component{
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
    this.props.navigation.navigate('ViewCategory')
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
        <HeaderBackButton onPressBack={this.back} title="CATEGORIES" bgColor="blue"/>
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}