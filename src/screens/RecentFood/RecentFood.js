import React from 'react'
import { View, Text, SectionList, StatusBar } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { FoodItem } from '../../components/FoodItem'
import { styles } from './styles'

import Color from '../../config/Color'

const recents = [
  { date:'26th Feb 2019', data:[{name: 'Fried Noodles',calorie: '300 KCAL',portion: 1,id:'1'},{name: 'Fried Rice',calorie: '500 KCAL',portion: 2,id:'2' }
  ]},
  { date:'25th Feb 2019', data:[{name: 'Fried Noodles',calorie: '600 KCAL',portion: 2,id:'3'}]},
  { date:'24th Feb 2019', data:[{name: 'Fried Chicken',calorie: '420 KCAL',portion: 1,id:'4'},{name: 'Fried Rice',calorie: '500 KCAL',portion: 2,id:'5' }
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
    alert("id"+id)
  };

  _renderItem = ({item}) => (
    <FoodItem
      id={item.id}
      onPressItem={()=>this._onPressItem(item.id)}
      name={item.name}
      calorie={item.calorie}
      portion={item.portion}
    />
  );

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} bgColor={Color.GREEN} iconColor={Color.APP_WHITE} title="RECENT LUNCH" />
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