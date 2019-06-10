import React from 'react'
import { View, FlatList, Text, StatusBar} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { ListItemWithButton } from '../../components/ListItemWithButton'
import { FloatingButton } from '../../components/FloatingButton'
import { styles } from './styles'

import Color from '../../config/Color'

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
    alert("test"+id)
  };

  _renderItem = ({item}) => (
    <ListItemWithButton
      id={item.id}
      firstLine={item.date}
      secondLine={item.time}
      buttonPress={()=>this._onLongPress(item.id)}
      iconName="trash"
    />
  );

  addSession = () => {
    this.props.navigation.navigate('SelfTrain')
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.LIGHT_BLUE} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.LIGHT_BLUE} iconColor={Color.APP_WHITE} title="SELF-TRAIN SESSIONS"/>
        {this.state.data.length==0 ?
        <View style={styles.centerContainer}>
            <Text style={styles.text}>Currently you have no sessions.</Text>
            <Text style={styles.text}>Try to add a new one.</Text>
        </View>:
        <FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />
        }
        <FloatingButton iconName="plus" onPress={this.addSession} />
      </View>
    )
  }
}