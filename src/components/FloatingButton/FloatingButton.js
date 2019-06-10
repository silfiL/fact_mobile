import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'

import Color from '../../config/Color'

const Button = ({onPress,iconName,bgColor}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.floatingButton,{backgroundColor:bgColor}]}>
            <Icon name={iconName} size={24} color={Color.APP_WHITE} />
        </TouchableOpacity>
    )
}

export default Button;