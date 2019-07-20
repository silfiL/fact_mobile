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
      marginBottom: Size.HEIGHT1*0.12
    },
    wrapText: {
      marginLeft: -Size.WIDTH*0.15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Size.WIDTH9
    },
    text: {
      flex: 1,
      fontSize: 12,
      flexWrap: 'wrap',
      paddingHorizontal: Size.WIDTH1*0.4,
      fontFamily: 'SourceSansPro-Regular',
      textAlign: 'justify',
    },
    image: {
      width: Size.WIDTH3,
      height: Size.WIDTH3,
    }
})