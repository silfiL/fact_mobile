import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.APP_WHITE
    },
    coloredCont: {
      backgroundColor: Color.LIGHT_RED,
      paddingTop: Size.HEIGHT1*0.2,
      paddingBottom: Size.HEIGHT1*0.6,
      paddingHorizontal: Size.WIDTH1*0.5,
      alignItems: 'center'
    },
    name: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.APP_WHITE,
      fontSize: 18,
    },
    image: {
      backgroundColor: Color.APP_WHITE,
      borderRadius: 50,
      width: 100,
      height: 100,
      marginTop: Size.HEIGHT1*0.8,
      marginBottom: Size.HEIGHT1*0.2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    status: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.APP_WHITE,
      fontSize: 14
    },
    buttonInRow: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: Color.FONT_GREY,
      borderWidth: 1,
      flex: 1,
      paddingVertical: Size.HEIGHT1*0.3
    },
    buttonText: {
      color: Color.RED,
      fontFamily: 'SourceSansPro-Regular'
    },
    longRowButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Size.WIDTH1*0.4,
      paddingVertical: Size.HEIGHT1*0.2,
      borderBottomColor: Color.FONT_GREY,
      borderBottomWidth: 1,
      alignItems: 'center'
    },
    longRowText: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
    },
    buttonCont: {
      alignItems: 'center',
      paddingVertical: Size.HEIGHT1*0.1
    },
    smallModal: {
        padding: Size.WIDTH*0.05,
        width: Size.WIDTH9,
        height: null
    },
    bottomModal: {
      padding: Size.WIDTH*0.05,
      width: Size.WIDTH,
      height: null
    },
    modalTitle: {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 17,
      alignSelf: 'flex-start',
      color: Color.FONT_GREY
    },
    headerModal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      marginBottom: Size.HEIGHT1*0.2,
    },
    roundedBox: {
      borderRadius:10,
      borderWidth:1,
      borderColor: Color.FONT_GREY,
      padding: Size.WIDTH*0.02,
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom: Size.HEIGHT1*0.2
    },
    evenly: {
      justifyContent: 'space-between'
    },
    text: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
    },
    label: {
      fontFamily: 'SourceSansPro-Bold',
      width: Size.WIDTH2,
      color: Color.FONT_GREY,
    },
    belowMargin: {
      marginBottom: Size.HEIGHT1*0.2
    },
    half: {
      width: Size.WIDTH5
    },
    info: {
      width: Size.WIDTH2
    },
    modalButton: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.LIGHT_GREEN,
      fontSize: 17,
      alignSelf: 'flex-end',
    },
    numInput: {
      borderBottomColor: Color.LIGHT_GREEN,
      borderBottomWidth: 1,
      marginRight: Size.WIDTH1*0.1,
      width: Size.WIDTH2,
      paddingHorizontal: Size.WIDTH1*0.2,
      paddingVertical: 5
    },
    bold: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.FONT_GREY,
    },
    square: {
      width: 120,
      height: 120,
      marginRight: Size.WIDTH1*0.2
    },
    paragraph: {
      flex: 1,
      flexWrap: 'wrap',
      marginHorizontal: Size.WIDTH1*0.2
    },
    vertical: {
      flexDirection: 'column',
      justifyContent: 'center'
    },
    blankRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    modalButtonRow: {
      width: Size.WIDTH3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Size.WIDTH1*0.2,
      marginTop: Size.HEIGHT1*0.2,
    },
    blank: {
      width: Size.WIDTH5
    },
    extraSmallModal : {
      padding: Size.WIDTH*0.05,
      width: Size.WIDTH9,
      height: null
    },
})
