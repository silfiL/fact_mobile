import { StyleSheet } from 'react-native'
import Color from '../../config/Color';
import Size from '../../config/Size';

export const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.APP_WHITE,
    },
    text: {
      color: Color.FONT_GREY,
      fontSize: 24,
      fontFamily: 'SourceSansPro-Regular',
      alignSelf: 'center',
    },
    weightStatus: {
      color: Color.LIGHT_GREEN,
      fontSize: 32,
      fontFamily: 'SourceSansPro-Bold',
      alignSelf: 'center',
      marginVertical: Size.HEIGHT1*0.5
    },
    goodWords: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.LIGHT_GREEN,
      fontSize: 22,
      marginTop: Size.HEIGHT1*0.2
    },
    below: {
      marginBottom: Size.HEIGHT1*0.6
    },
    label: {
      fontSize: 22,
      color: Color.LIGHT_GREEN,
      fontFamily: 'SourceSansPro-Regular',
      marginBottom: Size.HEIGHT1*0.1
    },
    advice: {
      color: Color.FONT_GREY,
      fontFamily: 'SourceSansPro-Regular',
      flex: 1,
      flexWrap: 'wrap',
      marginHorizontal: Size.WIDTH1*0.3,
    },
    group: {
      marginBottom: Size.HEIGHT1*0.3,
    },
    secondLabel: {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 17,
      color: Color.FONT_GREY,
      marginBottom: Size.HEIGHT1*0.02
    },
    info: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.LIGHT_BLUE,
      fontSize: 17,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      top: 0,
      left: 0,
      padding: Size.WIDTH1*0.3,
      position: 'absolute'
    }
})
  
  