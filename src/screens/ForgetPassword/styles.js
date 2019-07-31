import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE
    },
    form: {
      padding: Size.WIDTH1*0.5
    },
    roundedContainer: {
      borderRadius: 20,
      borderColor: Color.LIGHT_GREY,
      borderWidth: 2,
      padding: Size.WIDTH1*0.5,
      marginBottom: Size.HEIGHT1*0.4,
      marginTop: Size.HEIGHT1*0.2
    },
    label: {
      fontSize: 20,
      color: Color.FONT_GREY,
      fontFamily: 'SourceSansPro-Bold'
    },
    input: {
      borderBottomWidth: 1.5,
      fontSize: 18,
      borderBottomColor: Color.LIGHT_GREEN,
      color: Color.FONT_GREY,
      fontFamily: 'SourceSansPro-Regular'
    },
    errMessage: {
      backgroundColor: Color.RED,
      alignContent: 'center',
      color: Color.APP_WHITE,
      textTransform: 'uppercase',
      padding: 5,
      fontSize: 14
    }
})