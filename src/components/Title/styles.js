import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: Size.HEIGHT*0.15,
    color: Color.APP_WHITE,
    marginTop: Size.HEIGHT2,
  },
  smallTitle: {
    alignSelf: 'center',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: Size.HEIGHT1,
    color: Color.APP_WHITE,
    marginVertical: Size.HEIGHT1*0.5
  }
})