import { StyleSheet, Dimensions } from 'react-native';

import Size from '../../config/Size';

export const styles = StyleSheet.create({
    floatingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: Size.WIDTH*0.15,
        height: Size.WIDTH*0.15,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: Size.WIDTH1*0.3
    }
})