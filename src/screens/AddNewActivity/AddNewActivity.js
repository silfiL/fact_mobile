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
      data: []
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (id, label) => {
    this.props.navigation.navigate('SelfTrain',{ id, label })
  };

  _renderItem = ({item}) => (
    <SimpleListItem
      id={item.id}
      onPressItem={()=>this._onPressItem(item.id, item.name)}
      title={item.name}
    />
  );

  async onRefresh() {
    const response = await fetch(`http://103.252.100.230/fact/activity?name=all`)
    const json = await response.json()

    this.setState({ data: json.results.activities })
  }

  componentDidMount() {
    this.onRefresh()
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.RED} iconColor={Color.APP_WHITE} title="ADD NEW ACTIVITY"/>
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
