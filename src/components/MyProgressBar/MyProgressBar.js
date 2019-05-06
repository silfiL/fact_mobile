import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'

const MyProgressBar = () => (
    <View style={styles.wrapper}>
        <View style={styles.progressBar}>
            <View style={styles.progress}></View>
        </View>
        <View style={styles.row}>
            <Text>Low</Text>
            <Text>Medium</Text>
            <Text>High</Text>
        </View>
    </View>
)

export default MyProgressBar