import { StyleSheet, Dimensions } from 'react-native'

import Color from '../../config/Color'

export const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    progressBar: {
        width: '100%',
        height: '22%',
        backgroundColor: Color.BLUE
    },
    progress: {
        width: '0%',
        height: '100%',
        backgroundColor: Color.LIGHT_BLUE
    },
    text: {
      fontFamily: 'SourceSansPro-Regular',
      color: Color.FONT_GREY
    }
})