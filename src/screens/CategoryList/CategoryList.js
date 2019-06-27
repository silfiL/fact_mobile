import React from 'react'
import { View, Text, FlatList, StatusBar} from 'react-native'
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
    this.props.navigation.navigate('ViewCategory', { category, name })
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
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.YELLOW} barStyle="light-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.YELLOW} iconColor={Color.APP_WHITE} title="CATEGORIES"/>
        <FlatList
            data={this.state.data}
            keyExtractor={item=>item.id}
            renderItem={this._renderItem}
          />
      </View>
    )
  }
}
