import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { styles } from './styles'

import Color from '../../config/Color'

export default class ViewMeal extends React.Component{
  constructor(props){
    super(props);
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BLUE} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} title="VIEW MEAL" bgColor={Color.BLUE} iconColor={Color.APP_WHITE}/>
        <View style={styles.form}>
          <View style={[styles.row,styles.rowGroup]}>
            <Text style={styles.label}>Meal Name</Text>
            <Text style={styles.text}>Naskot</Text>
          </View>
          <View style={styles.rowGroup}>
            <Text style={styles.label}>Contains of :</Text>
            <View>
              <Text style={styles.text}>Rice </Text>
              <Text style={styles.text}>300 kcal . 1 serving</Text>
            </View>
          </View>
          <View style={styles.rowGroup}>
            <Text style={styles.label}>Nutritions Info</Text>
            <View style={styles.infoContainer}>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={[styles.label,styles.white]}>Calories</Text>
                <Text style={[styles.text,styles.white]}>520 kcal</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={[styles.label,styles.white]}>Carbs</Text>
                <Text style={[styles.text,styles.white]}>62 g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={[styles.label,styles.white]}>Protein</Text>
                <Text style={[styles.text,styles.white]}>30 g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={[styles.label,styles.white]}>Fat</Text>
                <Text style={[styles.text,styles.white]}>40 g</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}