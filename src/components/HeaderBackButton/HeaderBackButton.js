import React from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//styles
import { styles } from './styles';

const HeaderBackButton = ({title,onPressBack,bgColor}) => (
    <View style={[styles.header,{backgroundColor:bgColor}]}>
        <View style={styles.left}>
            <TouchableOpacity onPress={onPressBack}>
                <Icon name="md-arrow-round-back" color="black" size={25} />
            </TouchableOpacity>
        </View>
        <View style={styles.right}>
            <Text style={styles.screenTitle}>{title}</Text>
        </View>
        <View style={styles.left}></View>
    </View>
)

export default HeaderBackButton;
