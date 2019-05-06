import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    wrapper: {
        width: width,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width*0.95
    },
    progressBar: {
        width: width*0.95,
        height: height*0.02,
        backgroundColor: 'white'
    },
    progress: {
        width: width*0.1,
        height: height*0.02,
        backgroundColor: 'blue'
    }
})