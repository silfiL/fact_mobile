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
        borderColor: Color.LIGHT_GREEN,
    },
    input: {
        borderWidth: 0,
        color: Color.FONT_GREY,
        fontSize: 16,
        fontFamily: 'SourceSansPro-Regular'
    },
    below: {
      marginBottom: Size.HEIGHT1
    }
})