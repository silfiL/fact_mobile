import { StyleSheet } from 'react-native';

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_WHITE
    },
    text: {
        fontFamily: 'SourceSansPro-Regular',
        fontSize: 18,
        padding: Size.WIDTH1*0.25
    },
    centerCont: {
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center'
    },
})