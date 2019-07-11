import { StyleSheet, Dimensions } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  circle: {
    width: Size.WIDTH2,
    height: Size.WIDTH2,
    borderRadius: Size.WIDTH1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 20,
    color: Color.APP_WHITE  
  },
  red: {
    backgroundColor: Color.LIGHT_RED,
  },
  yellow: {
    backgroundColor: Color.LIGHT_YELLOW,
  },
  green: {
    backgroundColor: Color.LIGHT_BLUE
  },
  display: {
    alignSelf: 'center',
    fontFamily: 'SourceSansPro-Regular'
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: 5,
    color: Color.APP_WHITE  
  }
})