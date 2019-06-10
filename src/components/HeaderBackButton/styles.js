import {StyleSheet, Dimensions} from 'react-native'

import Size from '../../config/Size';

export const styles = StyleSheet.create({
    header: {
        height: Size.HEIGHT*0.08,
        alignItems : 'center',
        flexDirection: 'row',
        paddingLeft: Size.WIDTH1*0.5,
    },
    left: {
        flex: 1,
        height: (Size.HEIGHT*0.08)*0.45,
        justifyContent: 'center',
    },
    right: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    screenTitle: {
        fontSize: (Size.HEIGHT*0.08)*0.35,
        color: 'white',
        fontFamily: 'SourceSansPro-Bold'
    }
})