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
                {showButton && <Icon name='plus-circle' color={Color.APP_WHITE} onPress={onPress} size={28}/>}
            </View>
            <View style={styles.cardChild}>
              {children}
            </View>
            {total !== 0 &&
            <View style={styles.totalRow}>
                <Text style={styles.text}>Total in KCAL</Text>
                <Text style={styles.total}>{total}</Text>
            </View>}
        </View>
    )
}

export default TimeCard
