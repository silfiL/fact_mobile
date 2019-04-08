import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

import { smallWidth, smallHeight } from '../../config/sizes';

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: smallWidth*0.05,
        paddingVertical: smallWidth*0.3,
        marginVertical: smallHeight*0.2
    },
    long: {
        width: width*0.8,
    },
    buttonText: {
        fontSize: height*0.08*0.28,
        fontWeight: 'bold'
    }
})