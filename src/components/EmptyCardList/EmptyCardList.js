import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity, Text, View } from 'react-native';
import Color from '../../config/Color'
import { styles } from './styles'

const EmptyCardList = ({onPress,recMin,recMax,text}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.list}>
            <View style={styles.row}>
              <Icon name="plus" color={Color.FONT_GREY} />
              <Text style={[styles.text,{marginLeft:8}]}>Add {text}</Text>
            </View>
            <Text style={styles.text}>Recommended {recMin} - {recMax} KCAL</Text>
        </TouchableOpacity>
    )
}

export default EmptyCardList;