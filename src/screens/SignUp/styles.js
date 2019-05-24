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
        fontFamily: 'CrimsonText-Regular'
    },
    formInput: {    
        borderBottomWidth: 1.5, 
        borderColor: Color.APP_WHITE,
    },
    input: {
        borderWidth: 0,
        color: Color.APP_WHITE,
        fontFamily: 'CrimsonText-Regular',
    },
    below: {
      marginBottom: Size.HEIGHT1
    }
})