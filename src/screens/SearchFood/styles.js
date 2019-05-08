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
})