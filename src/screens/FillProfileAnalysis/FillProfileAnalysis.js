import React from 'react';
import { View, Text, StatusBar, AsyncStorage } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Color from '../../config/Color'

export default class FillProfileAnalysis extends React.Component{
    constructor(props) {
      super(props)

      this.state = {
        user: {
          status: ''
        }
      }
    }

    next = () => {
      this.props.navigation.navigate('FirstTimeSTrain')
    }

    async componentDidMount() {
      const token = await AsyncStorage.getItem('token');
      const headers = {"Authorization": 'Bearer ' + token}
      const response = await fetch(`http://103.252.100.230/fact/member/user`, {headers})
      const json = await response.json()

      const user = {
        status: json.results.status
      }

      this.setState({ user })
    }

    renderText = (status) => {
      status = status.toLowerCase()
      if (status == "underweight")
        return "You are lighter than you should be. Let's gain more weight! Fulfill your calories intake goal and burn not more than the burnt goal."
      else if (status == "normal")
        return "You have normal body weight. Good!! Let's maintain your body weight! Balance your calories intake and burnt."
      else if (status == "overweight")
        return "You are heavier than you should be. Let's lose some weight! Fulfill not more than your calories intake goal and burn according to the burnt goal."
      else
        return "You are in the obese state. Let's work harder to become normal and healthy. You should never fulfill more than your calories intake goal and burn less than the burnt goal. You also need to watch about the food you eat."
    }

    renderIconName = (status) => {
      status = status.toLowerCase()
      if (status == "underweight")
        return "emoticon-cry"
      else if (status == "normal")
        return "emoticon-excited"
      else if (status == "overweight")
        return "emoticon-neutral"
      else
        return "emoticon-dead"
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
                <Text style={styles.title}>From the data analysis,</Text>
                <Text style={styles.title}>we can conclude that</Text>
                <Text style={styles.title}>you are</Text>
                <Text style={styles.weight}>"{this.state.user.status}"</Text>
                <Icon name={this.renderIconName(this.state.user.status)} size={80} color={Color.LIGHT_YELLOW} />
                <Text style={styles.text}>{this.renderText(this.state.user.status)}
                </Text>
                 <Button text="START" size="short" onPress={this.next} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}
