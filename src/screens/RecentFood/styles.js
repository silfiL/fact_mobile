import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
   SectionHeader:{
      fontFamily: 'SourceSansPro-Bold',
      fontSize : 18,
      padding: Size.WIDTH1*0.1,
      backgroundColor: Color.LIGHT_GREEN,
      color: Color.APP_WHITE,
   },
  container: {
      flex: 1,
      backgroundColor: Color.APP_WHITE
  },
    
})