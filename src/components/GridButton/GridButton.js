import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles'

const GridButton = ({text,onPress,bgColor,iconName}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button,{backgroundColor:bgColor}]}>
            <Icon name={iconName} size={30} color="white" />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default GridButton;