import { StyleSheet, Dimensions } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    modal: {
        padding: Size.WIDTH*0.05,
        width: Size.WIDTH9,
        height: null
    },
    modalTitle: {
      fontFamily: 'SourceSansPro-Bold',
      fontSize: 17,
      alignSelf: 'flex-start',
      color: Color.FONT_GREY
    },
    labelInput: {
        color: Color.FONT_GREY,
        fontFamily: 'SourceSansPro-Bold'
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: Color.LIGHT_GREEN,
    },
    formRow: {
      marginTop: Size.HEIGHT1*0.05,
      marginBottom: Size.HEIGHT1*0.4
    },
    label: {
      fontFamily: 'SourceSansPro-Bold',
      color: Color.FONT_GREY,
      fontSize: 18
    },
    input: {
      borderBottomColor: Color.LIGHT_GREEN,
      borderBottomWidth: 1,
      fontFamily: 'SourceSansPro-Regular',
      fontSize: 16
    },
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE
    },
    header: {
      backgroundColor: Color.GREEN,
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
    center: {
      justifyContent: 'center',
      flex: 1
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    blankRow: {
      flexDirection: 'row',
      width: Size.WIDTH8,
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
    headerModal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      marginBottom: Size.HEIGHT1*0.1,
    },
    errMessage: {
      backgroundColor: Color.RED,
      alignContent: 'center',
      color: Color.APP_WHITE,
      textTransform: 'uppercase',
      padding: 5,
      fontSize: 14
    }
})
