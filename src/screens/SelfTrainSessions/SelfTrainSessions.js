import React from 'react'
import { View, FlatList, Text} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { ListItemWithButton } from '../../components/ListItemWithButton'
import { FloatingButton } from '../../components/FloatingButton'
import { styles } from './styles'

const sessions = [{
  id: '1',
  date: '22nd March 2019',
  time: '12.30 PM'
},{
  id: '2',
  date: '5th March 2019',
  time: '05.00 PM'
}]

export default class SelfTrainSessions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: sessions
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
      firstLine={item.date}
      secondLine={item.time}
      buttonPress={this._onLongPress}
      iconName="trash"
    />
  );

  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} title="SELF-TRAIN SESSIONS" bgColor="blue"/>
        {this.state.data.length==0 ?
        <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
            <Text style={{alignSelf:'center'}}>Currently you have no sessions. Try to add a new one.</Text>
        </View>:
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
        }
        <FloatingButton iconName="plus" />
      </View>
    )
  }
}