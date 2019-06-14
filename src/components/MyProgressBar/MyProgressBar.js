import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'

const MyProgressBar = ({progress}) => (
    <View style={styles.wrapper}>
        <View style={styles.progressBar}>
            <View style={[styles.progress,{width:progress+'%'}]}></View>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>Low</Text>
            <Text style={styles.text}>Medium</Text>
            <Text style={styles.text}>High</Text>
        </View>
    </View>
)

export default MyProgressBar