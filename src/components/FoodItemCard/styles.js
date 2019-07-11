import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Size.HEIGHT1*0.1,
    paddingHorizontal: Size.WIDTH1*0.2,
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: 1,
    backgroundColor: Color.APP_WHITE
  },
  firstLine: {
    fontFamily: 'SourceSansPro-Bold',
    color: Color.FONT_GREY,
    fontSize: 17
  },
  secondLine: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    color: Color.FONT_GREY
  },
})