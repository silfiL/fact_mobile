import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
    }
})