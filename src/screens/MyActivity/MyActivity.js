import React from 'react'
import { View, FlatList, StatusBar, AsyncStorage } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { SimpleListItem } from '../../components/SimpleListItem'
import { FloatingButton } from '../../components/FloatingButton'
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

export default class MyActivity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (id, label) => {
    this.props.navigation.navigate('SelfTrainSessions', { id, label })
  };

  _renderItem = ({item}) => (
    <SimpleListItem
      id={item.id}
      onPressItem={() => this._onPressItem(item.id, item.name)}
      title={item.name}
    />
  );

  addActivity = () => {
    this.props.navigation.navigate('AddNewActivity')
  }

  async onRefresh() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/activity-label?status=old`,{headers})
    const json = await response.json()
    console.log("activity json",json)
    this.setState({ data: json.results.activities })
  }

  componentDidMount() {
    this.onRefresh()
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.RED} iconColor={Color.APP_WHITE} title="MY ACTIVITIES"/>
        <FlatList
            data={this.state.data}
            keyExtractor={item=>item.id}
            renderItem={this._renderItem}
          />
        <FloatingButton iconName="plus" onPress={this.addActivity} bgColor={Color.RED}/>
      </View>
    )
  }
}
