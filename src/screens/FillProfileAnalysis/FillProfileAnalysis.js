import React from 'react';
import { View, Text, StatusBar, AsyncStorage } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';

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

    render() {
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={Color.APP_WHITE} barStyle="dark-content" />
                <Text style={styles.title}>From the data analysis,</Text>
                <Text style={styles.title}>we can conclude that</Text>
                <Text style={styles.title}>you are</Text>
                <Text style={styles.weight}>"{this.state.user.status}"</Text>
                <View style={styles.image} />
                <Text style={styles.text}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaderfer
                </Text>
                 <Button text="START" size="short" onPress={this.next} bgColor={Color.LIGHT_GREEN} txtColor={Color.APP_WHITE} />
            </View>
        )
    }
}
