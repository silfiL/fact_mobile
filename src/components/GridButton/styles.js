import { StyleSheet, Dimensions } from 'react-native';

import Color from '../../config/Color';
import Size from '../../config/Size';

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Size.WIDTH*0.35,
        height: Size.WIDTH*0.35,
        padding: Size.WIDTH1*0.2,
        marginHorizontal: Size.WIDTH1*0.1,
        marginVertical: Size.HEIGHT1*0.2,
        borderRadius: 20
    },
    buttonText: {
        fontSize: Size.HEIGHT*0.08*0.3,
        fontFamily: 'SourceSansPro-Bold',
        color: Color.APP_WHITE
    }
})