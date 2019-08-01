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
        borderColor: Color.LIGHT_BLUE,
    },
    input: {
        borderWidth: 0,
        color: Color.FONT_GREY,
        fontSize: 16,
        fontFamily: 'SourceSansPro-Regular',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 17,
        fontFamily: 'SourceSansPro-Bold',
        marginRight: Size.WIDTH1,
        color: Color.FONT_GREY,
    },
    text: {
        fontSize: 15,
        fontFamily: 'SourceSansPro-Regular',
        color: Color.FONT_GREY
    },
    rowGroup: {
        marginVertical: Size.HEIGHT*0.02
    },
    infoContainer: {
        justifyContent: 'center',
        marginVertical: Size.HEIGHT1*0.2,
        padding: Size.WIDTH1*0.4,
        paddingBottom: 0,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Color.BLUE,
        backgroundColor: Color.TRANSPARENT,
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