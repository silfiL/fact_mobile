import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  viewContent: {
    marginHorizontal: Size.WIDTH1*0.3,
    marginVertical: Size.HEIGHT1*0.2,
    backgroundColor: Color.APP_WHITE
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'SourceSansPro-Regular',
    color: Color.FONT_GREY,
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.FONT_GREY,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Bold',
  },
  below: {
    marginBottom: Size.HEIGHT1*0.2,
  },
  left: {
    marginLeft: 12
  },
})
