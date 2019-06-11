import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { GridButton } from '../../components/GridButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

import Color from '../../config/Color'

export default class AddFood extends React.Component{
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

  goToSearch = () => {
    this.props.navigation.navigate('SearchFood')
  }

  recent = () => {
    this.props.navigation.navigate('RecentFood')
  }

  meal = () => {
    this.props.navigation.navigate('Meal')
  }

  categories = () => {
    this.props.navigation.navigate('CategoryList')
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.GREEN} barStyle="dark-content" />
        <View style={styles.header}>
          <HeaderBackButton title="LUNCH" onPressBack={this.back} iconColor={Color.APP_WHITE} />
          <TextInput placeholder="Search Food" style={styles.search} placeholderTextColor={Color.LIGHT_GREY} onFocus={this.goToSearch}/>
        </View>
        <View style={styles.center}>
          <View style={styles.row}>
            <GridButton text="Recent" iconName="history" bgColor="#22747c" iconColor={Color.LIGHT_GREEN} onPress={this.recent}/>
            <GridButton text="Categories" iconName="format-list-bulleted" bgColor="#e8aa00" iconColor={Color.LIGHT_YELLOW} onPress={this.categories}/>
          </View>
          <View style={styles.row}>
            <GridButton text="Meal" iconName="food" bgColor={Color.BLUE} iconColor={Color.LIGHT_BLUE} onPress={this.meal}/>
            <GridButton text="Custom" iconName="plus" bgColor="#d65640" iconColor="#f9917f" onPress={this.toggleModal}/>
          </View>
          <Footer color={Color.FONT_GREY}/>
        </View>
        <Modal style={styles.modal} position="center" isOpen={this.state.isOpen}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTitle}>ADD CUSTOM FOOD</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <Icon name="close" size={20} color={Color.FONT_GREY} />
              </TouchableOpacity>
            </View>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Food Name</FloatingLabel>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Calories</FloatingLabel>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Carb</FloatingLabel>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Protein</FloatingLabel>
            <FloatingLabel 
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={styles.formInput}>Fat</FloatingLabel>
            <View style={styles.blankRow} >
              <View style={styles.blank}/>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}