import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import NumericInput from 'react-native-numeric-input'
import { CircleWithText } from '../../components/CircleWithText'
import { HeaderBackButton } from '../../components/HeaderBackButton'
import { GridButton } from '../../components/GridButton'
import { Footer } from '../../components/Footer'
import { styles } from './styles'

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

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{backgroundColor:'yellow',marginBottom:20}}>
          <HeaderBackButton title="LUNCH" onPressBack={this.back} />
          <TextInput placeholder="Search Food" style={{borderRadius:30,borderWidth:1,backgroundColor:'white'}}/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <GridButton text="Recent" iconName="history" bgColor="grey"/>
          <GridButton text="Categories" iconName="format-list-bulleted" bgColor="grey"/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <GridButton text="Meal" iconName="food" bgColor="grey"/>
          <GridButton text="Custom" iconName="plus" bgColor="grey" onPress={this.toggleModal}/>
        </View>
        <Modal style={styles.modal} position="center" isOpen={this.state.isOpen}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.modalTitle}>ADD CUSTOM FOOD</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <Icon name="close" size={24} />
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
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',paddingHorizontal:20}}>
              <TouchableOpacity>
                <Text>SAVE</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
        </Modal>
        {/*<Modal style={styles.modal} position="center" isOpen={this.state.isOpen}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.modalTitle}>ADD FOOD</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <Icon name="close" size={24} />
              </TouchableOpacity>
            </View>
            <Text>Fried Noodles</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <NumericInput 
                    value={this.state.value} 
                    onChange={value => this.setState({value})} 
                    iconSize={25}
                    type="up-down" />
                  <Text>Serving</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text>200</Text>
                  <Text>KCAL</Text>
              </View>
            </View>
            <Text style={{textDecorationLine:'underline'}}>Nutrition Informations</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <CircleWithText number="70" type="carb" />
              <CircleWithText number="20" type="pro" />
              <CircleWithText number="50" type="fat" />
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',paddingHorizontal:20}}>
              <TouchableOpacity>
                <Text>SAVE</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
        </Modal>*/}
        <Footer />
      </View>
    )
  }
}