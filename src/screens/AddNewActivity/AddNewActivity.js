import React from 'react'
import { View, FlatList, Text, StatusBar} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { SimpleListItem } from '../../components/SimpleListItem'
import { styles } from './styles'

import Color from '../../config/Color'

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

export default class AddNewActivity extends React.Component{
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
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.LIGHT_BLUE} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.LIGHT_BLUE} iconColor={Color.APP_WHITE} title="ADD NEW ACTIVITY"/>
        <Text style={styles.text}>Choose activity you want to add</Text>
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}