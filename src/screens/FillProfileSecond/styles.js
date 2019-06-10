import { StyleSheet, Dimensions } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE,
        alignItems: 'center'
    },
    title: {
        color: Color.GREEN,
        fontSize: 26,
        fontFamily: 'SourceSansPro-Bold',
        marginVertical: Size.HEIGHT1*0.4
    },
    radioLabel: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
      width: Size.WIDTH,
      marginBottom: Size.HEIGHT1*0.1
    },
    radioGroup: {
      width: Size.WIDTH,
      marginBottom: Size.HEIGHT1
    },
    wrapText: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      flex: 1,
      fontSize: 12,
      flexWrap: 'wrap',
      marginHorizontal: Size.WIDTH1*0.2,
      fontFamily: 'SourceSansPro-Regular'
    },
    image: {
      width: Size.WIDTH2,
      height: Size.WIDTH2,
      backgroundColor: Color.LIGHT_GREEN
    }
})