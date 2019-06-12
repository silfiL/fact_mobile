import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

const Badge = ({text, onPress, bgColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.badge,{backgroundColor:bgColor}]}>
        <Text style={styles.badgeText}>{text}</Text>
    </TouchableOpacity>
)

export default Badge