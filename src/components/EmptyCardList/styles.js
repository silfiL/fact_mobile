import { StyleSheet } from 'react-native';
import Color from '../../config/Color';
import Size from '../../config/Size';

export const styles = StyleSheet.create({
    text: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    list: {
      backgroundColor: Color.APP_WHITE,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Size.HEIGHT1*0.2,
    }
})