import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  circle: {
    width: width*0.3,
    height: width*0.3,
    borderRadius: width*0.3/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  date: {
    fontSize: 20,
  },
  month: {
    fontSize: 20,
  },
  hour: {
    fontSize: 12
  }
})