import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        alignSelf: 'center'
    }
})