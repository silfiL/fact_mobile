import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.APP_WHITE,
    },
    form: {
        padding: Size.WIDTH1*0.5
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 17,
      fontFamily: 'SourceSansPro-Bold',
      marginRight: Size.WIDTH1,
      color: Color.FONT_GREY,
    },
    text: {
      fontSize: 17,
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY
    },
    rowGroup: {
      marginBottom: Size.HEIGHT*0.02
    },
    infoContainer: {
      justifyContent: 'center',
      marginTop: Size.HEIGHT1*0.2,
      padding: Size.WIDTH1*0.4,
      paddingBottom: 0,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: Color.BLUE,
      backgroundColor: Color.TRANSPARENT,
    },
})