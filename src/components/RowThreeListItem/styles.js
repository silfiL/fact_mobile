import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  label: {
    fontFamily: 'SourceSansPro-Bold',
    color: Color.APP_WHITE,
    fontSize: 18,
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: Color.APP_WHITE,
    fontSize: 17
  },
  row: {
    flexDirection:'row',
    alignItems:'center',
    marginVertical: Size.HEIGHT1*0.2,
  },
  rightBorder: {
    alignItems: 'center',
    width: Size.WIDTH3,
    paddingHorizontal:Size.WIDTH1*0.2, 
    borderRightColor: Color.APP_WHITE,
    borderRightWidth: 1
  },
  noBorder: {
    borderRightWidth: 0,
  }
})