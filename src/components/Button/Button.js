import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

const Button = ({text,onPress,bgColor,txtColor}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button,styles.long,{backgroundColor:bgColor}]}>
            <Text style={[styles.buttonText,{color:txtColor}]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;