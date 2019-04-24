import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'

const Button = ({onPress,iconName}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
            <Icon name={iconName} size={24} color="white" />
        </TouchableOpacity>
    )
}

export default Button;