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
    labelInput: {
        color: Color.FONT_GREY,
        fontFamily: 'SourceSansPro-Bold'
    },
    formInput: {    
        borderBottomWidth: 1.5, 
        borderColor: Color.LIGHT_RED,
    },
    input: {
        borderWidth: 0,
        color: Color.FONT_GREY,
        fontSize: 16,
        fontFamily: 'SourceSansPro-Regular'
    },
    below: {
      marginTop: Size.HEIGHT1*0.5
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