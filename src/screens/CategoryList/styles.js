import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE
    },
    header: {
      backgroundColor: Color.YELLOW,
      paddingBottom: Size.HEIGHT1*0.1
    },
    search: {
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: Color.APP_WHITE,
      borderColor: Color.APP_WHITE,
      paddingLeft: Size.WIDTH1*0.4,
      paddingVertical: Size.HEIGHT1*0.1,
      marginHorizontal: Size.WIDTH1*0.5,
      fontFamily: 'SourceSansPro-Regular'
    },
    modal: {
        padding: Size.WIDTH*0.05,
        width: Size.WIDTH9,
        // height: Size.HEIGHT*0.45
        height: null
    },
    modalTitle: {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 17,
      alignSelf: 'flex-start',
      color: Color.FONT_GREY
    },
    row: {
      flexDirection:'row',
      alignItems:'center',
      flexWrap: 'wrap',
      margin: Size.WIDTH1*0.2
    },
    foodName: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.FONT_GREY,
    },
    headerModal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      marginBottom: Size.HEIGHT1*0.2,
    },
    right: {
      marginLeft: Size.WIDTH1*0.2,
      fontSize: 14,
      fontFamily: 'SourceSansPro-Regular'
    },
    kcal: {
      fontSize: 30,
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY
    },
    blankRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    noMargin: {
      margin: 0
    },
    underline: {
      textDecorationLine: 'underline',
      fontFamily: 'SourceSansPro-Bold',
      color: Color.FONT_GREY,
      marginTop: Size.HEIGHT1*0.2
    },
    modalButtonRow: {
      width: Size.WIDTH4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Size.WIDTH1*0.2,
      marginVertical: Size.HEIGHT1*0.2
    },
    modalButton: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.LIGHT_GREEN,
      fontSize: 17
    },
    blank: {
      width: Size.WIDTH4
    },
    marginVertical: {
      marginVertical: Size.HEIGHT1*0.1
    }
})