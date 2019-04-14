import React from 'react'
import { View, Text, SectionList } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'

const recents = [
  { date:'26th Feb 2019', data:[{name: 'Fried Noodles',calorie: '300 KCAL',portion: 1},{name: 'Fried Rice',calorie: '500 KCAL',portion: 2 }
  ]},
  { date:'25th Feb 2019', data:[{name: 'Fried Noodles',calorie: '600 KCAL',portion: 2}]},
  { date:'24th Feb 2019', data:[{name: 'Fried Chicken',calorie: '420 KCAL',portion: 1},{name: 'Fried Rice',calorie: '500 KCAL',portion: 2 }
  ]}
]

export default class RecentFood extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: recents
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  _onPressItem = (id) => {
    console.log("id",id)
  };

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      onPressItem={this._onPressItem}
      name={item.name}
      calorie={item.calorie}
      portion={item.portion}
    />
  );

  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} title="RECENT LUNCH" bgColor="blue"/>
        {/*<FlatList
          data={this.state.data}
          keyExtractor={item=>item.id}
          renderItem={this._renderItem}
        />*/}
        <SectionList
          sections={this.state.data}
          renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { section.date } </Text> }
          renderItem={this._renderItem}
          keyExtractor={ (item, index) => index }
        />
      </View>
    )
  }
}