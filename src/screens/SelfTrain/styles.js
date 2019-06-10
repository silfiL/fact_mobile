import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-around'
    },
    rowButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      bottom: 0,
      marginHorizontal: Size.WIDTH1*0.3,
      marginVertical: Size.HEIGHT1*0.2
    },
    button: {
      color: Color.APP_WHITE,
      fontSize: 17,
      fontFamily: 'SourceSansPro-Regular',
    },
    h1: {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 26,
      color: Color.APP_WHITE
    },
    text: {
      fontFamily: 'SourceSansPro-Regular',
      fontSize: 20,
      color: Color.APP_WHITE,
      alignSelf: 'center'
    }, 
    activity: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.APP_WHITE,
      fontSize: 24
    },
    timer: {
      fontSize: Size.HEIGHT1,
    }
})