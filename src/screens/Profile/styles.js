import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    smallModal: {
        padding: width*0.05,
        width: width*0.9,
        height: height*0.2
    },
    bottomModal: {
      padding: width*0.01,
      width: width,
      height: height*0.5
    },
    modalTitle: {
      fontWeight: 'bold',
      fontSize: 17,
      alignSelf: 'flex-start'
    },
})