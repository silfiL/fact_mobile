import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  circle: {
    width: Size.WIDTH2,
    height: Size.WIDTH2,
    borderRadius: Size.WIDTH1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.TRANSPARENT,
    borderColor: Color.BLUE,
    borderWidth: 1,
  },
  date: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.LIGHT_BLUE,
  },
  hour: {
    fontSize: 10,
    fontFamily: 'SourceSansPro-Regular',
  }
})