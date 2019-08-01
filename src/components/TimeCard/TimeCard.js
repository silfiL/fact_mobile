import React from 'react'
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Color from '../../config/Color'

import { styles } from './styles'

const TimeCard = ({time,children,showButton,onPress,total,less,exact,consume,more,walk,run,stair}) => {
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
            <View style={styles.bottomCard}>
                <View style={styles.totalRow}>
                    <Text style={styles.text}>Total in KCAL</Text>
                    <Text style={styles.total}>{total}</Text>
                </View>
                {less && <Text style={styles.advice}>You can consume {consume} more</Text>}
                {exact && <Text style={styles.advice}>Good Job! You've reached the recommended kcal</Text>}
                {(walk !==0 || run !== 0 || stair !== 0) && <Text style={styles.advice}>You've consumed {more} kcal than recommended. You can burn by doing {walk} minutes of walk, {run} minutes of run, {stair} minutes of stairs.</Text>}
            </View>}
        </View>
    )
}

export default TimeCard
