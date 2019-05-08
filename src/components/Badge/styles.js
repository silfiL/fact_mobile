import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    badge: {
        padding: width*0.012,
        backgroundColor: 'black',
        opacity: 0.5,
        borderRadius: 20,
        width: width*0.15,
        alignItems:'center',
        justifyContent: 'center',
        marginRight: width*0.02
    },
    badgeText: {
        fontSize: height*0.018,
        color: 'white'
    }
})