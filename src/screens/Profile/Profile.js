import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StatusBar, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../../components/Button';
import { CircleWithText } from '../../components/CircleWithText'
import AIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modalbox'
import { styles } from './styles'

import Color from '../../config/Color'
import Size from '../../config/Size'

export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      activityInfo: false,
      bodyInfo: false,
      isEdit: false
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

  toggleActivity = () => {
    this.setState({activityInfo:!this.state.activityInfo})
  }

  toggleBody = () => {
    this.setState({bodyInfo:!this.state.bodyInfo})
  }

  toggleEdit = () => {
    this.setState({isEdit:!this.state.isEdit})
  }

  goToBase = () => {
    this.props.navigation.navigate('Base')
    this.setState({isOpen:false})
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.RED} barStyle="light-content" />
        <LinearGradient start={{x: 0, y: .1}} end={{x: .1, y: 1}} colors={[Color.RED,Color.LIGHT_RED]} style={styles.coloredCont}>
         <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={this.editProfile}>
                <MIcon name="edit" size={24} color={Color.APP_WHITE} />
            </TouchableOpacity>
            <View style={styles.image}></View>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.status}>Underweight</Text>
        </LinearGradient>
        <View style={styles.row}>
            <TouchableOpacity style={styles.buttonInRow} onPress={this.toggleBody}>
              <IonIcon name="md-body" size={30} color={Color.RED} />
              <Text style={styles.buttonText}>Body</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonInRow} onPress={this.toggleActivity}>
              <FaIcon name="line-chart" size={30} color={Color.RED} />
              <Text style={styles.buttonText}>Activity Level</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonInRow} onPress={this.myActivity}>
              <FaIcon name="list-alt" size={30} color={Color.RED}/>
              <Text style={styles.buttonText}>My Activities</Text>
            </TouchableOpacity>
        </View>
        <TouchableHighlight onPress={this.changePass} underlayColor={Color.LIGHTER_GREY}>
          <View style={styles.longRowButton} >
            <Text style={styles.longRowText}>Change Password</Text>
            <AIcon name="right" size={20} color={Color.FONT_GREY} />
          </View>
        </TouchableHighlight>
        <View style={styles.buttonCont}>
          <Button text="LOG OUT" txtColor={Color.APP_WHITE} bgColor={Color.LIGHT_RED} size="long" onPress={this.logout} />
        </View>
        <Modal style={styles.smallModal} coverScreen={true} position="center" isOpen={this.state.isEdit} backdropPressToClose={false}>
            <View style={[styles.headerModal,{margin: 0}]}>
              <Text style={styles.modalTitle}>EDIT</Text>
              <TouchableOpacity onPress={this.toggleEdit}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Weight</Text>
              <TextInput placeholder="40" keyboardType="numeric" style={styles.numInput}/>
              <Text style={styles.text}>kg</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Height</Text>
              <TextInput placeholder="162" keyboardType="numeric" style={styles.numInput}/>
              <Text style={styles.text}>cm</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
        </Modal>
        <Modal style={styles.bottomModal} position="bottom" isOpen={this.state.bodyInfo} 
          coverScreen={true}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>BODY INFORMATION</Text>
              <TouchableOpacity onPress={this.toggleBody}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <View style={styles.roundedBox}>
              <View style={styles.half}>
                <View style={[styles.row,styles.evenly]}>
                  <Text style={styles.label}>Weight</Text>
                  <Text style={styles.text}>:</Text>
                  <Text style={[styles.text,styles.info]}>42 kg</Text>
                </View>
                <View style={[styles.row,styles.evenly]}>
                  <Text style={styles.label}>Height</Text>
                  <Text style={styles.text}>:</Text>
                  <Text style={[styles.text,styles.info]}>162 cm</Text>
                </View>
                <View style={[styles.row,styles.evenly]}>
                  <Text style={styles.label}>BMI</Text>
                  <Text style={styles.text}>:</Text>
                  <Text style={[styles.text,styles.info]}>19.4</Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.toggleEdit}>
                <MIcon name="edit" size={18} color={Color.RED} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.label,styles.belowMargin]}>Nutritions</Text>
            <View style={[styles.row,styles.evenly]}>
              <CircleWithText number="70" type="carb" />
              <CircleWithText number="20" type="pro" />
              <CircleWithText number="50" type="fat" />
            </View>
        </Modal>
        <Modal style={styles.bottomModal} position="bottom" isOpen={this.state.activityInfo} 
          coverScreen={true}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>ACTIVITY LEVEL</Text>
              <TouchableOpacity onPress={this.toggleActivity}>
                <AIcon name="close" size={20} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.bold,styles.belowMargin]}>LOW ACTIVITY (SEDENTARY)</Text>
            <View style={[styles.row,styles.belowMargin]}>
              <View style={styles.square} />
              <Text style={[styles.text,styles.paragraph]}>Are you sure you want to log out your account? loren ipsum adkslsadja dsfksldjf dsfkjdlf eiewr. sdfksalfdaslsdkfj sdfksdfjslfjsofsi </Text>
            </View>
            <View style={[styles.roundedBox,styles.vertical]}>
              <Text style={styles.bold}>Advices :</Text>
              <Text style={styles.text}>sddddddddddddddddddddddddddddddddddddddddddddd</Text>
            </View>
        </Modal>
        <Modal style={styles.extraSmallModal} position="center" isOpen={this.state.isOpen} backdropPressToClose={false}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>LOG OUT</Text>
              <TouchableOpacity onPress={this.logout}>
                <AIcon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>Are you sure you want to log out your account?</Text>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToBase}>
                  <Text style={styles.modalButton}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}