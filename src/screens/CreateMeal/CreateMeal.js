import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'

export default class CreateMeal extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  addFood = () => {
    this.props.navigation.navigate('SearchFoodMeal')
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.BLUE} barStyle="dark-content" />
        <HeaderBackButton onPressBack={this.back} title="CREATE MEAL" bgColor={Color.BLUE} iconColor={Color.APP_WHITE} />
        <View style={styles.form}>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Meal Name</FloatingLabel>
            <View style={styles.rowGroup}>
              <Text style={styles.label}>Contains :</Text>
              <Button text="ADD FOOD" size="short" bgColor={Color.TRANSPARENT} txtColor={Color.BLUE} border={Color.BLUE} onPress={this.addFood}/>  
            </View>
            <Text style={styles.label}>Nutritions Info :</Text>
            <View style={styles.infoContainer}>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Calories</Text>
                <Text style={styles.text}>- kcal</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Carbs</Text>
                <Text style={styles.text}>- g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Protein</Text>
                <Text style={styles.text}>- g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Fat</Text>
                <Text style={styles.text}>- g</Text>
              </View>
            </View>
            <Button text="SAVE" size="long" onPress={this.doNothing} bgColor={Color.LIGHT_BLUE} txtColor={Color.APP_WHITE} /> 
        </View>
        <Footer />
      </View>
    )
  }
}