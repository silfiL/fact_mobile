import React from 'react'
import { View, FlatList, Text, StatusBar, TouchableOpacity, AsyncStorage, Alert} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { ListItemWithButton } from '../../components/ListItemWithButton'
import { FloatingButton } from '../../components/FloatingButton'
import Modal from 'react-native-modalbox'
import { styles } from './styles'
import moment from 'moment'

import Color from '../../config/Color'

export default class SelfTrainSessions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isOpen: false,
      deleteDate: null
    }

    this.onRefresh = this.onRefresh.bind(this)
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
      buttonPress={()=>this._onLongPress(item.longDate)}
      iconName="trash"
      iconColor={Color.LIGHT_RED}
    />
  );

  addSession = () => {
    this.props.navigation.navigate('SelfTrain', {
      id: this.props.navigation.state.params.id,
      label: this.props.navigation.state.params.label
    })
  }

  async onRefresh() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    //console.log(this.props.navigation.state.params.id, token)
    const response = await fetch(`http://103.252.100.230/fact/member/activity?id=${this.props.navigation.state.params.id}`, {headers})
    const json = await response.json()
    console.log(json)

    let data = []
    for (let i = 0, l = json.results.activity.length; i < l; i++) {
      let date = new Date(json.results.activity[i].requested_at)
      data.push({
        id: date.toString(),
        date: date.datetimeformat('date'),
        time: date.datetimeformat('time'),
        longDate: json.results.activity[i].requested_at
      })
    }

    this.setState({data})
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("did focus")
      this.onRefresh()
    });
    //this.onRefresh()
  }

  deleteSession = async(date) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const body = JSON.stringify({
      label: this.props.navigation.state.params.id,
      requested_at: date
    })
    console.log("headers",headers)
    
    console.log("body",body)
    const response = await fetch(`http://103.252.100.230/fact/member/activity`, {method:"DELETE",headers,body})
    const json = await response.json()
    console.log("delete json",json)
    if (json.message == "Success"){
      this.setState({isOpen:!this.state.isOpen})
      this.onRefresh()
    } else
      Alert.alert('Error',json.message,[{text:'OK',style:'cancel'}])
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
        <Modal style={styles.extraSmallModal} position="center" swipeToClose={false} isOpen={this.state.isOpen} backdropPressToClose={false}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>DELETE SESSION</Text>
            </View>
            <Text style={[styles.text,{fontSize:16}]}>Are you sure you want to delete the training data for {moment(this.state.deleteDate).format('dddd, DD MMM YYYY')} ?</Text>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity onPress={()=>this.setState({isOpen:false})}>
                  <Text style={styles.modalButton}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.deleteSession(this.state.deleteDate)}>
                  <Text style={styles.modalButton}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}
