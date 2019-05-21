import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

import Size from '../../config/Size';

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width*0.35,
        height: width*0.35,
        padding: 10,
        margin: 5,
        borderRadius: 20
    },
    buttonText: {
        fontSize: height*0.08*0.28,
        fontWeight: 'bold',
        color: 'white'
    }
})