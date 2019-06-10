import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles'

const GridButton = ({text,onPress,bgColor,iconName,iconColor}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button,{backgroundColor:bgColor}]} activeOpacity={.5}>
            <Icon name={iconName} size={50} color={iconColor} />
            <Text style={[styles.buttonText,{color:iconColor}]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default GridButton;