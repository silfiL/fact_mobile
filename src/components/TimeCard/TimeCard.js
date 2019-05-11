import React from 'react'
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { styles } from './styles'

const TimeCard = ({time,children,showButton,onPress,total}) => {
    return(
        <View style={{borderWidth:1,borderColor:'grey',marginTop:5,marginBottom:15}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'lightblue',borderBottomWidth:1,borderBottomColor:'grey'}}>
                <Text>{time}</Text>
                {showButton && <Icon name='plus-circle' color="white" onPress={onPress}/>}
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