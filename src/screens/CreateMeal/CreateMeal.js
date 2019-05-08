import React from 'react'
import { View, Text } from 'react-native'
import FloatingLabel from 'react-native-floating-labels';
import { Button } from '../../components/Button'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

export default class CreateMeal extends React.Component{
  back = () => {
    this.props.navigation.goBack()
  }

  doNothing = () => {
    console.log("nothing")
  }

  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} title="CREATE MEAL" bgColor="blue" />
        <View style={styles.container}>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Meal Name</FloatingLabel>
            <Text style={styles.label}>Contains :</Text>
            <Button text="ADD FOOD" size="short" bgColor="blue" txtColor="white" />  
            <Text style={styles.label}>Nutritions Info :</Text>
            <View style={styles.infoContainer}>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Calories</Text>
                <Text>- kcal</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Carbs</Text>
                <Text>- g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Protein</Text>
                <Text>- g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Fat</Text>
                <Text>- g</Text>
              </View>
            </View>
            <Button text="SAVE" size="long" onPress={this.doNothing} bgColor="blue" txtColor="white" /> 
        </View>
        <Footer />
      </View>
    )
  }
}