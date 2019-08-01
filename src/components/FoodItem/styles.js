import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    paddingVertical: Size.HEIGHT1*0.2,
    marginHorizontal: Size.WIDTH1*0.3,
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: 1
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
  categoriesRow: {
    flexDirection: 'row',
  },
  category: {
    borderWidth: 1,
    borderColor: Color.LIGHT_GREEN,
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
    color: Color.LIGHT_GREEN,
    marginRight: 5,
    paddingHorizontal: 2
  }
})