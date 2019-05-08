import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

const Badge = ({text, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.badge}>
        <Text style={styles.badgeText}>{text}</Text>
    </TouchableOpacity>
)

export default Badge