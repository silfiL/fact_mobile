import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE
    },
    centerContainer: {
      justifyContent:'center',
      flex:1,
      alignItems:'center'
    },
    text: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY,
      fontSize: 20
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
    modalButton: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.LIGHT_GREEN,
      fontSize: 17,
      alignSelf: 'flex-end',
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
      marginVertical: Size.HEIGHT1*0.2
    },
    blank: {
      width: Size.WIDTH5
    },
    extraSmallModal : {
      padding: Size.WIDTH*0.05,
      width: Size.WIDTH9,
      height: Size.HEIGHT*0.22
    },
})