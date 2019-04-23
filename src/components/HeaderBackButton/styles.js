import {StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    header: {
        height: height*0.08,
        alignItems : 'center',
        flexDirection: 'row',
        paddingLeft: (width*0.1)*0.5,
    },
    left: {
        flex: 1,
        height: (height*0.08)*0.45,
        justifyContent: 'center',
    },
    right: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    screenTitle: {
        fontSize: (height*0.08)*0.35,
        color: 'white',
        fontWeight: 'bold'
    }
})