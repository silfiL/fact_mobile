import { StyleSheet, Dimensions } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Size.WIDTH1*0.5
    },
    weight: {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 32,
      color: Color.FONT_GREY,
      marginVertical: Size.HEIGHT1*0.5
    },
    title: {
      fontFamily: 'SourceSansPro-Regular',
      fontSize: 26,
      color: Color.FONT_GREY,
      textAlign: 'center'
    },
    image: {
      width: Size.WIDTH4,
      height: Size.WIDTH4,
      backgroundColor: Color.LIGHT_GREEN
    },
    text: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
      marginVertical: Size.HEIGHT1*0.5
    }
})