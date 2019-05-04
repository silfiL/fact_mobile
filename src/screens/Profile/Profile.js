import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import AIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modalbox'
import { styles } from './styles'

export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      activityInfo: false
    }
  }

  editProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

  changePass = () => {
    this.props.navigation.navigate('ChangePassword')
  }
  
  logout = () => {
    this.setState({isOpen:!this.state.isOpen})
  }

  myActivity = () => {
    this.props.navigation.navigate('MyActivity')
  }

  toggleActivity = () => [
    this.setState({activityInfo:!this.state.activityInfo})
  ]

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'grey',padding:10}}>
            <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={this.editProfile}>
                <MIcon name="edit" size={24} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor:'white',borderRadius:50,width:100,height:100,alignSelf:'center'}}></View>
            <Text style={{alignSelf:'center'}}>Name</Text>
            <Text style={{alignSelf:'center'}}>Underweight</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderColor:'black',borderWidth:1,flex:1}}>
              <IonIcon name="md-body" size={30} />
              <Text>Body</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderColor:'black',borderWidth:1,flex:1}} onPress={this.toggleActivity}>
              <FaIcon name="line-chart" size={30} />
              <Text>Activity Level</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',borderColor:'black',borderWidth:1,flex:1}} onPress={this.myActivity}>
              <FaIcon name="list-alt" size={30} />
              <Text>My Activities</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:12,borderBottomColor:'black',borderBottomWidth:1,alignItems:'center'}} onPress={this.changePass}>
          <Text>Change Password</Text>
          <AIcon name="right" size={30} />
        </TouchableOpacity>
        <Button text="LOG OUT" txtColor="white" bgColor="blue" size="long" onPress={this.logout} />
        <Modal style={styles.bottomModal} position="bottom" isOpen={this.state.activityInfo} 
          coverScreen={true}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.modalTitle}>ACTIVITY LEVEL</Text>
              <TouchableOpacity onPress={this.toggleActivity}>
                <AIcon name="close" size={24} />
              </TouchableOpacity>
            </View>
            <Text>LOW ACTIVITY (SEDENTARY)</Text>
            <Text>Are you sure you want to log out your account? loren ipsum adkslsadja dsfksldjf dsfkjdlf eiewr. sdfksalfdaslsdkfj sdfksdfjslfjsofsi </Text>
            <View style={{borderRadius:10,borderWidth:1,padding:20}}>
              <Text>sddddddddddddddddddddddddddddddddddddddddddddd</Text>
            </View>
        </Modal>
        <Modal style={styles.smallModal} position="center" isOpen={this.state.isOpen} backdropPressToClose={false}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.modalTitle}>LOG OUT</Text>
              <TouchableOpacity onPress={this.logout}>
                <AIcon name="close" size={24} />
              </TouchableOpacity>
            </View>
            <Text>Are you sure you want to log out your account?</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',paddingHorizontal:20}}>
              <TouchableOpacity>
                <Text>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>YES</Text>
              </TouchableOpacity>
            </View>
        </Modal>
      </View>
    )
  }
}