import { StyleSheet, Dimensions } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        color: Color.GREEN,
        fontFamily: 'SourceSansPro-Bold',
    },
    form: {
      marginVertical: Size.HEIGHT*0.05,
      width: Size.WIDTH6
    },
    row: {
      marginTop: Size.HEIGHT1*0.1,
      marginBottom: Size.HEIGHT1*0.4
    },
    label: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.FONT_GREY,
      fontSize: 18
    },
    input: {
      borderBottomColor: Color.GREEN,
      borderBottomWidth: 1,
      fontFamily: 'SourceSansPro-Regular',
      fontSize: 16
    },
    metric: {
      fontFamily: 'SourceSansPro-Regular',
      fontSize: 16,
      color: Color.FONT_GREY,
      marginLeft: Size.WIDTH1*0.2
    },
    inline: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    radioLabel: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
      fontSize: 14,
    }
})