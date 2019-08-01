import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    card: {
        marginBottom: Size.HEIGHT1*0.3,
        marginHorizontal: Size.WIDTH1*0.2
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems:'center', 
        justifyContent:'space-between',
        backgroundColor: Color.LIGHT_GREEN,
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHT_GREY,
        paddingHorizontal: Size.WIDTH1*0.2,
        paddingVertical: Size.HEIGHT1*0.1
    },
    time: {
        color: Color.APP_WHITE,
        fontSize: 17,
        fontFamily: 'SourceSansPro-Bold'
    },
    cardChild: {
        borderWidth:1,
        borderColor: Color.LIGHT_GREY,
        borderTopColor: Color.TRANSPARENT,
        backgroundColor: Color.APP_WHITE,
    },
    bottomCard: {
      borderWidth:1,
      borderColor: Color.LIGHT_GREY,
      borderTopColor: Color.TRANSPARENT,
    },
    totalRow: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor: Color.APP_WHITE,
      paddingHorizontal : Size.WIDTH1*0.2,
      paddingVertical: Size.HEIGHT1*0.02
    },
    text: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.FONT_GREY,
    },
    total: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.LIGHT_GREEN,
      fontSize: 17
    },
    advice: {
      borderTopColor: Color.LIGHT_GREEN,
      borderTopWidth: 1,
      marginVertical: Size.WIDTH*0.01,
      marginHorizontal: Size.WIDTH*0.02,
      fontFamily: 'SourceSansPro-Bold',
      color: Color.LIGHT_GREEN,
      fontSize: 14,
      paddingTop: Size.HEIGHT*0.01
    }
})