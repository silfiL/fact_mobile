import React from 'react'
import { View, Text} from 'react-native'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { styles } from './styles'

export default class ViewMeal extends React.Component{
  constructor(props){
    super(props);
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render(){
    return(
      <View style={{flex:1}}>
        <HeaderBackButton onPressBack={this.back} title="VIEW MEAL" bgColor="blue"/>
        <View style={styles.container}>
          <View style={[styles.row,styles.rowGroup]}>
            <Text style={styles.label}>Meal Name</Text>
            <Text>Naskot</Text>
          </View>
          <View style={styles.rowGroup}>
            <Text style={styles.label}>Contains of :</Text>
            <View>
              <Text>Rice </Text>
              <Text>300 kcal - 1 serving</Text>
            </View>
          </View>
          <View style={styles.rowGroup}>
            <Text style={styles.label}>Nutritions Info</Text>
            <View style={styles.infoContainer}>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Calories</Text>
                <Text>520 kcal</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Carbs</Text>
                <Text>62 g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Protein</Text>
                <Text>30 g</Text>
              </View>
              <View style={[styles.row,styles.rowGroup]}>
                <Text style={styles.label}>Fat</Text>
                <Text>40 g</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}