import React from 'react'
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Color from '../../config/Color'

import { styles } from './styles'

const TimeCard = ({time,children,showButton,onPress,total}) => {
    return(
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.time}>{time}</Text>
                {showButton && <Icon name='plus-circle' color={Color.APP_WHITE} onPress={onPress} size={24}/>}
            </View>
            {children}
            {total && 
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'lightblue',borderTopWidth:1,borderTopColor:'grey',paddingHorizontal:10}}>
                <Text>Total in KCAL</Text>
                <Text>{total}</Text>
            </View>}
        </View>
    )
}

export default TimeCard