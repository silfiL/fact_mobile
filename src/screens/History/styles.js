import {StyleSheet, Dimensions} from 'react-native'

import Size from '../../config/Size'
import Color from '../../config/Color'

export const styles = StyleSheet.create({
    header: {
        height: Size.HEIGHT*0.08,
        alignItems : 'center',
        flexDirection: 'row',
        paddingLeft: Size.WIDTH1*0.5,
        backgroundColor: Color.BLUE
    },
    
})