import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
      padding: Size.WIDTH1*0.5
    },
    labelInput: {
        color: Color.APP_WHITE,
        fontFamily: 'SourceSansPro-Bold'
    },
    formInput: {    
        borderBottomWidth: 1.5, 
        borderColor: Color.APP_WHITE,
    },
    input: {
        borderWidth: 0,
        color: Color.APP_WHITE,
        fontSize: 16,
        fontFamily: 'SourceSansPro-Regular'
    },
    below: {
      marginTop: Size.HEIGHT1*0.2
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