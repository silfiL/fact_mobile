import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingVertical: Size.HEIGHT1*0.2,
    paddingHorizontal: Size.WIDTH1*0.3,
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: 0.5
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.FONT_GREY,
    fontSize: 17
  }
})