import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    modal: {
        padding: width*0.05,
        width: width*0.9,
        height: height*0.6
    },
    modalTitle: {
      fontWeight: 'bold',
      fontSize: 17,
      alignSelf: 'flex-start'
    },
    labelInput: {
        color: '#673AB7',
    },
    formInput: {    
        borderBottomWidth: 1.5, 
        borderColor: '#333',       
    },
    input: {
        borderWidth: 0
    },
    
})