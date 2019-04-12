import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    labelInput: {
        color: '#673AB7',
    },
    formInput: {    
        borderBottomWidth: 1.5, 
        marginLeft: 20,
        borderColor: '#333',       
    },
    input: {
        borderWidth: 0
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10
    }
})