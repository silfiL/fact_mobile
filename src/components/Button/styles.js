import { StyleSheet } from 'react-native';

import Size from '../../config/Size';

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: Size.WIDTH1*0.05,
        paddingVertical: Size.WIDTH1*0.3,
        marginVertical: Size.WIDTH1*0.2
    },
    long: {
        width: Size.WIDTH9,
    },
    short: {
        width: Size.WIDTH*0.25,
    },
    buttonText: {
        fontSize: Size.HEIGHT*0.08*0.28,
        fontWeight: 'bold'
    }
})