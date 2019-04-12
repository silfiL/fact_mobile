import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles'

const Button = ({text,onPress,bgColor,txtColor,size}) => {
    let sizeStyle;
    if (size=='long')
      sizeStyle = styles.long
    else if (size=='short')
      sizeStyle = styles.short
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button,sizeStyle,{backgroundColor:bgColor}]}>
            <Text style={[styles.buttonText,{color:txtColor}]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;