import { StyleSheet } from 'react-native'

import Color from '../../config/Color'
import Size from '../../config/Size'

export const styles = StyleSheet.create({
    card: {
        borderWidth:1,
        borderColor: Color.LIGHT_GREY,
        marginTop: Size.HEIGHT1*0.2,
        marginBottom: Size.HEIGHT1*0.5,
        marginHorizontal: Size.WIDTH1*0.1
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems:'center', 
        justifyContent:'space-between',
        backgroundColor: Color.LIGHT_GREEN,
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHT_GREY,
        paddingHorizontal: Size.WIDTH1*0.3,
        paddingVertical: Size.HEIGHT1*0.2
    },
    time: {
        color: Color.APP_WHITE,
        fontSize: 18,
        fontFamily: 'SourceSansPro-Bold'
    }
})