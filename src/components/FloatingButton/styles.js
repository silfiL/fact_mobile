import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

import Size from '../../config/Size';

export const styles = StyleSheet.create({
    floatingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: width*0.15,
        height: width*0.15,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: Size.WIDTH1*0.2
    }
})