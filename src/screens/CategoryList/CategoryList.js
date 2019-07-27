import React from 'react'
import { View, Text, FlatList, StatusBar, TextInput} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { SimpleListItem } from '../../components/SimpleListItem'
import { styles } from './styles'

import Color from '../../config/Color'

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
      data: [],
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230/fact/food-category?name=all`)
    const json = await response.json()

    const data = json.results.categories
    this.setState({ data })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (category, name) => {
    this.props.navigation.navigate('ViewCategory', {
      category,
      name,
      id: this.props.navigation.state.params.id,
      date:  this.props.navigation.state.params.date
    })
  };

  _renderItem = ({item}) => (
    <SimpleListItem
      id={item.id}
      onPressItem={() => this._onPressItem(item.id, item.name)}
      title={item.name}
    />
  );

  componentDidMount() {
    this.onRefresh()
    console.log("state params id",this.props.navigation.state.params.id)
  }

  onChange (text) {
    this.setState({ name: text })
  }

  async onSubmit() {
    const token = await AsyncStorage.getItem('token');
    const headers = {"Authorization": 'Bearer ' + token}
    const response = await fetch(`http://103.252.100.230/fact/member/food?name=${this.state.name}&category=0`, {headers})
    const json = await response.json()

    const data = json.results.foods
    this.setState({ data })

    console.log("JSON", json)
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.YELLOW} barStyle="light-content" />
        <View style={styles.header}>
            <HeaderBackButton title="CATEGORIES" onPressBack={this.back} iconColor={Color.APP_WHITE} />
            <TextInput placeholder="Search Food Name" style={styles.search} placeholderTextColor={Color.LIGHT_GREY} onSubmitEditing={this.onSubmit} onChangeText={(event) => this.onChange(event)}/>
          </View>
        {/*<HeaderBackButton onPressBack={this.back} bgColor={Color.YELLOW} iconColor={Color.APP_WHITE} title="CATEGORIES"/>*/}
        <FlatList
            data={this.state.data}
            keyExtractor={item=>item.id}
            renderItem={this._renderItem}
          />
      </View>
    )
  }
}
