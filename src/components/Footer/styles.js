import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

import Color from '../../config/Color'

export const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        alignSelf: 'center',
        color: Color.APP_WHITE,
        fontFamily: 'CrimsonText-Regular'
    }
})