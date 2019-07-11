import {StyleSheet, Dimensions} from 'react-native'

import Size from '../../config/Size'
import Color from '../../config/Color'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.APP_WHITE,
    },
    header: {
      height: Size.HEIGHT*0.08,
      alignItems : 'center',
      flexDirection: 'row',
      paddingLeft: Size.WIDTH1*0.5,
      backgroundColor: Color.BLUE,
      justifyContent: 'center',
    },
    headerText: {
      color: Color.APP_WHITE,
      fontFamily: 'SourceSansPro-Bold',
      fontSize: (Size.HEIGHT*0.08)*0.35,
    },
    center: {
      marginHorizontal: Size.WIDTH1*0.5,
      flex:1,
      alignItems:'center',
    },
    row: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-evenly',
      marginVertical: Size.HEIGHT1*0.1
    },
    showText: {
      color: Color.FONT_GREY,
      fontSize: 18,
      fontFamily: 'SourceSansPro-Regular'
    },
    datepicker: {
      width: Size.WIDTH3,
    },
    dateInput: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
      borderColor: Color.LIGHT_GREY,
      borderRadius: 10,
      borderWidth: 1,
    },
    sectionTitle: {
      textDecorationLine:'underline',
      fontSize: 20,
      fontFamily: 'SourceSansPro-Bold',
      color: Color.FONT_GREY,
      marginVertical: Size.HEIGHT1*0.1,
    },
    subContainer: {
      width: Size.WIDTH9,
      flex: 1,
    },
    label: {
      color: Color.FONT_GREY,
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 17,
    },
    below: {
      marginBottom: Size.HEIGHT1*0.2
    },
    up: {
      marginTop: -Size.HEIGHT1*0.2
    },
    padBottom: {
      paddingBottom: Size.HEIGHT1
    },
    month: {
      alignSelf: 'center',
      color: Color.LIGHT_BLUE,
      fontFamily: 'SourceSansPro-Regular',
      marginTop: -Size.HEIGHT1*0.1
    },
    dateText: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
    }
})
