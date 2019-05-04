import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { styles } from './styles'

export default class SearchFood extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      value: 0
    }
  }

  back = () => {
    this.props.navigation.goBack();
  }

  toggleModal = () => {
    this.setState({isOpen:!this.state.isOpen})
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'yellow',marginBottom:20}}>
        
        </View>
        
      </View>
    )
  }
}