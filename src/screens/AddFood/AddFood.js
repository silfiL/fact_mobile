import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { GridButton } from '../../components/GridButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

export default class AddFood extends React.Component{
  back = () => {
    this.props.navigation.goBack();
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'yellow',marginBottom:20}}>
          <HeaderBackButton title="LUNCH" onPressBack={this.back} />
          <TextInput placeholder="Search Food" style={{borderRadius:30,borderWidth:1,backgroundColor:'white'}}/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <GridButton text="Recent" iconName="history" bgColor="grey"/>
          <GridButton text="Categories" iconName="format-list-bulleted" bgColor="grey"/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <GridButton text="Meal" iconName="food" bgColor="grey"/>
          <GridButton text="Add New" iconName="plus" bgColor="grey"/>
        </View>
        <Footer />
      </View>
    )
  }
}