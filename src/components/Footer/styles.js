import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: Size.HEIGHT1*0.1,
        alignSelf: 'center',
        color: Color.APP_WHITE,
        fontFamily: 'SourceSansPro-Regular'
    }
})