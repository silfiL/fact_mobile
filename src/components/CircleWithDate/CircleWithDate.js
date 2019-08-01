import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

const CircleWithDate = ({date,month,min}) => {
  let display;
  if (date == 1)
    display="st"
  else if (date == 2)
    display="nd"
  else if (date == 3)
    display="rd"
  else
    display="th"

  return(
    <View>
      <View style={styles.circle}>
        <Text style={styles.date}>{date}{display}</Text>
        <Text style={styles.date}>{month}</Text>
        <Text style={styles.hour}>{min} mins</Text>
      </View>
    </View>
  )
}

export default CircleWithDate
