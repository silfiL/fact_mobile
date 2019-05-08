import {StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    header: {
        height: height*0.08,
        alignItems : 'center',
        flexDirection: 'row',
        paddingLeft: (width*0.1)*0.5,
        backgroundColor: 'grey'
    },
    
})