import React from 'react'
import { View, FlatList, Text, StatusBar, TouchableOpacity} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { ListItemWithButton } from '../../components/ListItemWithButton'
import { FloatingButton } from '../../components/FloatingButton'
import Modal from 'react-native-modalbox'
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
      data: sessions,
      isOpen: false,
      deleteDate: null
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onLongPress = (date) => {
    this.setState({isOpen:true, deleteDate:date})
  };

  _renderItem = ({item}) => (
    <ListItemWithButton
      id={item.id}
      firstLine={item.date}
      secondLine={item.time}
      buttonPress={()=>this._onLongPress(item.date)}
      iconName="trash"
      iconColor={Color.LIGHT_RED}
    />
  );

  addSession = () => {
    this.props.navigation.navigate('SelfTrain')
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.RED} iconColor={Color.APP_WHITE} title="SELF-TRAIN SESSIONS"/>
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
        <FloatingButton iconName="plus" onPress={this.addSession} bgColor={Color.RED} />
        <Modal style={styles.extraSmallModal} position="center" isOpen={this.state.isOpen} backdropPressToClose={false}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>DELETE SESSION</Text>
            </View>
            <Text style={[styles.text,{fontSize:16}]}>Are you sure you want to delete the training data for {this.state.deleteDate} ?</Text>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity onPress={()=>this.setState({isOpen:false})}>
                  <Text style={styles.modalButton}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}