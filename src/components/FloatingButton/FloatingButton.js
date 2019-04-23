import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'

const Button = ({onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
            <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}

export default Button;