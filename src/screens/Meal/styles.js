import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.APP_WHITE
  },
  centerCont: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.FONT_GREY,
    fontSize: 18
  }
})