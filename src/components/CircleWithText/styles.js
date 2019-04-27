import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  circle: {
    width: width*0.2,
    height: width*0.2,
    borderRadius: width*0.2/2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'  
  },
  number: {
    fontSize: 20,
  },
  red: {
    backgroundColor: 'red',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  green: {
    backgroundColor: 'green'
  }
})