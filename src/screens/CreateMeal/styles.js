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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontWeight: 'bold',
        marginRight: width*0.1
    },
    rowGroup: {
        marginBottom: height*0.02
    },
    infoContainer: {
        padding: width*0.1,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: 'yellow',
        opacity: 0.8
    }
})