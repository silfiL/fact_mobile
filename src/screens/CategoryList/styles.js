import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE
    },
    header: {
      backgroundColor: Color.YELLOW,
      paddingBottom: Size.HEIGHT1*0.1
    },
    search: {
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: Color.APP_WHITE,
      borderColor: Color.APP_WHITE,
      paddingLeft: Size.WIDTH1*0.4,
      paddingVertical: Size.HEIGHT1*0.1,
      marginHorizontal: Size.WIDTH1*0.5,
      fontFamily: 'SourceSansPro-Regular'
    },
    
})