import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10
    }
})