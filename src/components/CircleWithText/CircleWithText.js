import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

const CircleWithText = ({type,number}) => {
  let color;
  let display;
  if (type == 'carb'){
    color = styles.red;
    display = 'Carb';
  }
  else if (type == 'pro'){
    color = styles.yellow;
    display = 'Protein';
  }
  else if (type == 'fat'){
    color = styles.green;
    display = 'Fat';
  }
  return(
    <View>
      <View style={[styles.circle,color]}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.text}>g</Text>
      </View>
      <Text style={styles.display}>{display}</Text>
    </View>
  )
}

export default CircleWithText