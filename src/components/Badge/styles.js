import { StyleSheet, Dimensions } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    badge: {
        padding: Size.WIDTH*0.012,
        backgroundColor: Color.LIGHT_GREEN,
        borderRadius: 20,
        width: Size.WIDTH*0.15,
        alignItems:'center',
        justifyContent: 'center',
        marginRight: Size.WIDTH*0.02
    },
    badgeText: {
        fontSize: 12,
        color: Color.APP_WHITE,
        fontFamily: 'SourceSansPro-Regular'
    }
})